"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { cloneDefaultContent, type Direction, type PriceKind, type SiteContent } from "../../lib/site-content";

type AdminTab = "directions" | "prices" | "texts";

const tariffNames: Record<PriceKind, string> = {
  basic: "Взрослый базовый",
  air: "Взрослый воздушный",
  kids: "Детский",
};

const copyFields: Array<[keyof SiteContent["copy"], string, boolean?]> = [
  ["heroEyebrow", "Подпись над главным заголовком"],
  ["heroTitle", "Главный заголовок"],
  ["heroAccent", "Акцентная часть заголовка"],
  ["heroDescription", "Описание на первом экране", true],
  ["adultIntro", "Описание раздела для взрослых", true],
  ["kidsIntro", "Описание детского раздела", true],
  ["aboutTitle", "Заголовок блока о студии"],
  ["aboutLead", "Главный текст о студии", true],
  ["aboutText", "Дополнительный текст о студии", true],
  ["phone", "Телефон"],
  ["address", "Адрес", true],
  ["hours", "Часы работы"],
];

function makeDirection(): Direction {
  return {
    id: `direction-${Date.now()}`,
    title: "Новое направление",
    text: "Коротко опишите занятие и его пользу.",
    audience: "Взрослые",
    priceKind: "basic",
    image: "",
    duration: "60 минут",
    format: "Группа",
    trialPrice: "600 ₽",
    visible: true,
  };
}

export default function AdminClient({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tab, setTab] = useState<AdminTab>("directions");
  const [notice, setNotice] = useState("Изменения ещё не сохранены");
  const [query, setQuery] = useState("");

  const filteredDirections = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ru");
    return content.directions.filter((item) => !normalized || item.title.toLocaleLowerCase("ru").includes(normalized));
  }, [content.directions, query]);

  const updateDirection = (id: string, patch: Partial<Direction>) => {
    setContent((current) => ({ ...current, directions: current.directions.map((item) => item.id === id ? { ...item, ...patch } : item) }));
    setNotice("Есть несохранённые изменения");
  };

  const save = async () => {
    try {
      const response = await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setNotice("Сохранено в базе данных");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Не удалось сохранить изменения");
    }
  };

  const reset = async () => {
    if (!window.confirm("Вернуть исходные тексты, цены и карточки?")) return;
    const defaults = cloneDefaultContent();
    setContent(defaults);
    const response = await fetch("/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(defaults) });
    setNotice(response.ok ? "Исходная версия восстановлена" : "Не удалось восстановить исходную версию");
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>, id: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setNotice("Загружаем фотографию…");
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      updateDirection(id, { image: result.url });
      setNotice("Фотография загружена. Сохраните изменения");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Не удалось загрузить изображение");
    }
    event.target.value = "";
  };

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.replace("/admin/login");
  };

  const submitPassword = async (event: FormEvent) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) return setNotice("Новые пароли не совпадают");
    const response = await fetch("/api/auth/change-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword, newPassword }) });
    const result = await response.json();
    if (!response.ok) return setNotice(result.error || "Не удалось изменить пароль");
    window.location.replace("/admin/login?password=changed");
  };

  return <main className="admin-shell">
    <header className="admin-header">
      <div><span className="admin-kicker">Студия «Ввысь»</span><h1>Управление сайтом</h1><p>Изменения сохраняются в защищённой базе данных.</p></div>
      <div className="admin-header-actions"><Link href="/" target="_blank" rel="noreferrer">Открыть сайт ↗</Link><button type="button" onClick={() => setPasswordOpen((value) => !value)}>Сменить пароль</button><button type="button" onClick={signOut}>Выйти</button><button type="button" className="admin-primary" onClick={save}>Сохранить изменения</button></div>
    </header>

    {passwordOpen && <form className="admin-password-form" onSubmit={submitPassword}><div><h2>Смена пароля</h2><p>После смены пароля потребуется войти заново.</p></div><label>Текущий пароль<input type="password" required autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)}/></label><label>Новый пароль<input type="password" required minLength={12} autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/></label><label>Повторите новый пароль<input type="password" required minLength={12} autoComplete="new-password" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)}/></label><button className="admin-primary" type="submit">Изменить пароль</button></form>}

    <div className="admin-status" role="status"><span>{notice}</span><button type="button" onClick={reset}>Вернуть исходную версию</button></div>

    <nav className="admin-tabs" aria-label="Разделы панели">
      <button type="button" className={tab === "directions" ? "active" : ""} onClick={() => setTab("directions")}>Направления</button>
      <button type="button" className={tab === "prices" ? "active" : ""} onClick={() => setTab("prices")}>Цены</button>
      <button type="button" className={tab === "texts" ? "active" : ""} onClick={() => setTab("texts")}>Тексты и контакты</button>
    </nav>

    {tab === "directions" && <section className="admin-section">
      <div className="admin-section-head"><div><h2>Карточки направлений</h2><p>Можно менять содержание карточек, но их дизайн остаётся фиксированным.</p></div><div className="admin-tools"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти направление"/><button type="button" className="admin-add" onClick={() => { const item = makeDirection(); setContent((current) => ({ ...current, directions: [...current.directions, item] })); setNotice("Добавлена новая карточка"); }}>+ Добавить</button></div></div>
      <div className="admin-cards">{filteredDirections.map((item) => <article className="admin-card" key={item.id}>
        <div className="admin-card-preview" style={{ backgroundImage: item.image ? `url(${item.image})` : undefined }}><span>{item.visible ? "На сайте" : "Скрыто"}</span></div>
        <div className="admin-card-fields">
          <label className="admin-wide">Название<input maxLength={70} value={item.title} onChange={(event) => updateDirection(item.id, { title: event.target.value })}/></label>
          <label>Для кого<select value={item.audience} onChange={(event) => updateDirection(item.id, { audience: event.target.value as Direction["audience"], priceKind: event.target.value === "Дети" ? "kids" : item.priceKind === "kids" ? "basic" : item.priceKind })}><option>Взрослые</option><option>Дети</option></select></label>
          <label>Тип тарифа<select value={item.priceKind} onChange={(event) => updateDirection(item.id, { priceKind: event.target.value as PriceKind })}><option value="basic">Базовый</option><option value="air">Воздушный</option><option value="kids">Детский</option></select></label>
          <label>Продолжительность<input maxLength={20} value={item.duration} onChange={(event) => updateDirection(item.id, { duration: event.target.value })}/></label>
          <label>Формат<input maxLength={20} value={item.format} onChange={(event) => updateDirection(item.id, { format: event.target.value })}/></label>
          <label>Пробное занятие<input maxLength={15} value={item.trialPrice} onChange={(event) => updateDirection(item.id, { trialPrice: event.target.value })}/></label>
          <label className="admin-wide">Описание<textarea maxLength={260} rows={4} value={item.text} onChange={(event) => updateDirection(item.id, { text: event.target.value })}/><small>{item.text.length}/260</small></label>
          <label className="admin-wide">Ссылка на фотографию<input value={item.image.startsWith("data:") ? "Загружена с устройства" : item.image} disabled={item.image.startsWith("data:")} onChange={(event) => updateDirection(item.id, { image: event.target.value })}/></label>
          <div className="admin-card-actions admin-wide"><label className="admin-upload">Загрузить фотографию<input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => uploadImage(event, item.id)}/></label><label className="admin-switch"><input type="checkbox" checked={item.visible} onChange={(event) => updateDirection(item.id, { visible: event.target.checked })}/> Показывать на сайте</label><button type="button" className="admin-delete" onClick={() => { if (window.confirm(`Удалить «${item.title}»?`)) setContent((current) => ({ ...current, directions: current.directions.filter((direction) => direction.id !== item.id) })); }}>Удалить</button></div>
        </div>
      </article>)}</div>
    </section>}

    {tab === "prices" && <section className="admin-section"><div className="admin-section-head"><div><h2>Тарифы и цены</h2><p>Строки остаются аккуратными независимо от количества позиций.</p></div></div><div className="admin-tariffs">{(Object.keys(content.tariffs) as PriceKind[]).map((kind) => { const tariff = content.tariffs[kind]; return <article className="admin-tariff" key={kind}><span>{tariffNames[kind]}</span><label>Заголовок<input maxLength={50} value={tariff.title} onChange={(event) => setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, title: event.target.value } } }))}/></label><label>Описание<textarea maxLength={240} rows={3} value={tariff.note} onChange={(event) => setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, note: event.target.value } } }))}/></label><div className="admin-price-list">{tariff.prices.map(([label, value], index) => <div key={`${kind}-${index}`}><input aria-label="Название позиции" maxLength={35} value={label} onChange={(event) => { const prices = tariff.prices.map((row, rowIndex) => rowIndex === index ? [event.target.value, row[1]] as [string, string] : row); setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, prices } } })); }}/><input aria-label="Цена" maxLength={15} value={value} onChange={(event) => { const prices = tariff.prices.map((row, rowIndex) => rowIndex === index ? [row[0], event.target.value] as [string, string] : row); setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, prices } } })); }}/><button type="button" aria-label="Удалить строку" onClick={() => setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, prices: tariff.prices.filter((_, rowIndex) => rowIndex !== index) } } }))}>×</button></div>)}</div><button type="button" className="admin-add-row" onClick={() => setContent((current) => ({ ...current, tariffs: { ...current.tariffs, [kind]: { ...tariff, prices: [...tariff.prices, ["Новая позиция", "0 ₽"]] } } }))}>+ Добавить строку</button></article>; })}</div></section>}

    {tab === "texts" && <section className="admin-section"><div className="admin-section-head"><div><h2>Тексты и контакты</h2><p>Длина полей ограничена, поэтому содержимое не сломает макет.</p></div></div><div className="admin-copy-grid">{copyFields.map(([field, label, multiline]) => <label key={field}>{label}{multiline ? <textarea rows={4} maxLength={field === "address" ? 140 : 320} value={content.copy[field]} onChange={(event) => setContent((current) => ({ ...current, copy: { ...current.copy, [field]: event.target.value } }))}/> : <input maxLength={90} value={content.copy[field]} onChange={(event) => setContent((current) => ({ ...current, copy: { ...current.copy, [field]: event.target.value } }))}/>}</label>)}</div></section>}

    <footer className="admin-footer"><span>Доступ защищён серверной сессией</span><button type="button" className="admin-primary" onClick={save}>Сохранить изменения</button></footer>
  </main>;
}
