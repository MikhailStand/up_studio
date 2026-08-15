import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAdminRequest, SESSION_COOKIE } from "../../../../lib/server/auth";
import { changePassword } from "../../../../lib/server/store";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  const { currentPassword, newPassword } = await request.json().catch(() => ({}));
  if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 12) {
    return NextResponse.json({ error: "Новый пароль должен содержать не меньше 12 символов" }, { status: 400 });
  }
  if (!(await changePassword(currentPassword, newPassword))) return NextResponse.json({ error: "Текущий пароль указан неверно" }, { status: 400 });
  const response = NextResponse.json({ ok: true });
  const cookieStore = await cookies();
  response.cookies.set(SESSION_COOKIE, cookieStore.get(SESSION_COOKIE)?.value || "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
  return response;
}
