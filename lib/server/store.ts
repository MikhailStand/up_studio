import "server-only";

import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";
import { cloneDefaultContent, type SiteContent } from "../site-content";

type Session = { tokenHash: string; expiresAt: string };
type LocalStore = {
  admin: { login: string; passwordHash: string };
  content: SiteContent;
  sessions: Session[];
};

const dataDirectory = process.env.DATA_DIR || path.join(process.cwd(), ".data");
const dataFile = path.join(dataDirectory, "vvys-admin.json");
const initialLogin = process.env.ADMIN_INITIAL_LOGIN || "vvys-admin";
const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || "change-me-before-production";
let databaseReady: Promise<void> | undefined;

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}

function passwordMatches(password: string, stored: string) {
  const [salt, expectedHex] = stored.split(":");
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function sqlClient() {
  return process.env.DATABASE_URL
    ? postgres(process.env.DATABASE_URL, { ssl: process.env.DATABASE_SSL === "false" ? false : "require", max: 5 })
    : null;
}

const sql = sqlClient();

async function ensureDatabase() {
  if (!sql) return;
  databaseReady ||= (async () => {
    await sql`create table if not exists site_content (id integer primary key, payload jsonb not null, updated_at timestamptz not null default now())`;
    await sql`create table if not exists admin_users (id integer primary key, login text unique not null, password_hash text not null, updated_at timestamptz not null default now())`;
    await sql`create table if not exists admin_sessions (token_hash text primary key, expires_at timestamptz not null)`;
    await sql`insert into site_content (id, payload) values (1, ${sql.json(cloneDefaultContent())}) on conflict (id) do nothing`;
    await sql`insert into admin_users (id, login, password_hash) values (1, ${initialLogin}, ${hashPassword(initialPassword)}) on conflict (id) do nothing`;
  })();
  await databaseReady;
}

async function readLocalStore(): Promise<LocalStore> {
  await mkdir(dataDirectory, { recursive: true });
  try {
    return JSON.parse(await readFile(dataFile, "utf8")) as LocalStore;
  } catch {
    const initial: LocalStore = {
      admin: { login: initialLogin, passwordHash: hashPassword(initialPassword) },
      content: cloneDefaultContent(),
      sessions: [],
    };
    await writeFile(dataFile, JSON.stringify(initial, null, 2), { mode: 0o600 });
    return initial;
  }
}

async function writeLocalStore(store: LocalStore) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(store, null, 2), { mode: 0o600 });
}

export async function getContent(): Promise<SiteContent> {
  if (sql) {
    await ensureDatabase();
    const rows = await sql<{ payload: SiteContent }[]>`select payload from site_content where id = 1`;
    return rows[0]?.payload || cloneDefaultContent();
  }
  return (await readLocalStore()).content;
}

export async function setContent(content: SiteContent) {
  if (sql) {
    await ensureDatabase();
    await sql`update site_content set payload = ${sql.json(content)}, updated_at = now() where id = 1`;
    return;
  }
  const store = await readLocalStore();
  store.content = content;
  await writeLocalStore(store);
}

export async function authenticate(login: string, password: string) {
  if (sql) {
    await ensureDatabase();
    const rows = await sql<{ login: string; password_hash: string }[]>`select login, password_hash from admin_users where id = 1`;
    return rows[0]?.login === login && passwordMatches(password, rows[0].password_hash);
  }
  const store = await readLocalStore();
  return store.admin.login === login && passwordMatches(password, store.admin.passwordHash);
}

export async function createSession() {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  const hashed = tokenHash(token);
  if (sql) {
    await ensureDatabase();
    await sql`delete from admin_sessions where expires_at < now()`;
    await sql`insert into admin_sessions (token_hash, expires_at) values (${hashed}, ${expiresAt})`;
  } else {
    const store = await readLocalStore();
    store.sessions = store.sessions.filter((session) => new Date(session.expiresAt) > new Date());
    store.sessions.push({ tokenHash: hashed, expiresAt: expiresAt.toISOString() });
    await writeLocalStore(store);
  }
  return { token, expiresAt };
}

export async function sessionIsValid(token?: string) {
  if (!token) return false;
  const hashed = tokenHash(token);
  if (sql) {
    await ensureDatabase();
    const rows = await sql`select token_hash from admin_sessions where token_hash = ${hashed} and expires_at > now()`;
    return rows.length > 0;
  }
  const store = await readLocalStore();
  return store.sessions.some((session) => session.tokenHash === hashed && new Date(session.expiresAt) > new Date());
}

export async function deleteSession(token?: string) {
  if (!token) return;
  const hashed = tokenHash(token);
  if (sql) {
    await ensureDatabase();
    await sql`delete from admin_sessions where token_hash = ${hashed}`;
  } else {
    const store = await readLocalStore();
    store.sessions = store.sessions.filter((session) => session.tokenHash !== hashed);
    await writeLocalStore(store);
  }
}

export async function changePassword(currentPassword: string, newPassword: string) {
  if (newPassword.length < 12) return false;
  if (sql) {
    await ensureDatabase();
    const rows = await sql<{ password_hash: string }[]>`select password_hash from admin_users where id = 1`;
    if (!rows[0] || !passwordMatches(currentPassword, rows[0].password_hash)) return false;
    await sql.begin(async (transaction) => {
      await transaction`update admin_users set password_hash = ${hashPassword(newPassword)}, updated_at = now() where id = 1`;
      await transaction`delete from admin_sessions`;
    });
    return true;
  }
  const store = await readLocalStore();
  if (!passwordMatches(currentPassword, store.admin.passwordHash)) return false;
  store.admin.passwordHash = hashPassword(newPassword);
  store.sessions = [];
  await writeLocalStore(store);
  return true;
}
