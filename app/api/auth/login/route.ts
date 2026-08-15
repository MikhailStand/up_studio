import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "../../../../lib/server/auth";
import { authenticate, createSession } from "../../../../lib/server/store";

export async function POST(request: Request) {
  const { login, password } = await request.json().catch(() => ({}));
  if (typeof login !== "string" || typeof password !== "string" || !(await authenticate(login, password))) {
    await new Promise((resolve) => setTimeout(resolve, 350));
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
  }
  const session = await createSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, session.token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", expires: session.expiresAt });
  return response;
}
