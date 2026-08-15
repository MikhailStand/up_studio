import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isAdminRequest } from "../../../lib/server/auth";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdminRequest()) redirect("/admin");
  return <Suspense fallback={<main className="admin-login"><div className="admin-login-card"><span className="admin-kicker">Студия «Ввысь»</span><h1>Вход в панель</h1></div></main>}><LoginForm /></Suspense>;
}
