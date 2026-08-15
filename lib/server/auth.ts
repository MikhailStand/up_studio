import "server-only";

import { cookies } from "next/headers";
import { sessionIsValid } from "./store";

export const SESSION_COOKIE = "vvys_admin_session";

export async function isAdminRequest() {
  const cookieStore = await cookies();
  return sessionIsValid(cookieStore.get(SESSION_COOKIE)?.value);
}
