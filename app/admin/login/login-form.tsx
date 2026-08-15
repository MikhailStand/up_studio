"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Не удалось войти");
      window.location.replace("/admin");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось войти");
      setLoading(false);
    }
  };

  return <main className="admin-login"><form className="admin-login-card" onSubmit={submit}>
    <span className="admin-kicker">Студия «Ввысь»</span>
    <h1>Вход в панель</h1>
    <p>{searchParams.get("password") === "changed" ? "Пароль изменён. Войдите с новым паролем." : "Введите логин и пароль администратора."}</p>
    <label>Логин<input autoComplete="username" required value={login} onChange={(event) => setLogin(event.target.value)}/></label>
    <label>Пароль<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)}/></label>
    {error && <p className="admin-error" role="alert">{error}</p>}
    <button className="admin-primary" type="submit" disabled={loading}>{loading ? "Проверяем…" : "Войти"}</button>
    <Link href="/">Вернуться на сайт</Link>
  </form></main>;
}
