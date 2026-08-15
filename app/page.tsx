"use client";

import { useEffect, useState } from "react";
import type { Direction, Tariff } from "../lib/site-content";
import { useSiteContent } from "../lib/use-site-content";

const mapUrl = "https://yandex.ru/maps/org/vvys/156108342252?si=h9gh1zbyxezk9ynxwa45vchxzm";

function DirectionCard({ item }: { item: Direction }) {
  return <article className="direction-card">
    <div className="card-photo" style={{ backgroundImage: `url(${item.image})` }} />
    <div className="card-body">
      <div className="card-meta"><span className="pill">{item.duration}</span><span className="pill">{item.audience}</span><span className="pill">{item.format}</span></div>
      <h3>{item.title}</h3><p>{item.text}</p>
      <div className="card-price"><span>Пробное занятие</span><strong>{item.trialPrice}</strong></div>
    </div>
  </article>;
}

function TariffCard({ tariff }: { tariff: Tariff }) {
  return <article className="tariff-card"><div className="tariff-title"><span>{tariff.label}</span><h3>{tariff.title}</h3><p>{tariff.note}</p></div><div className="tariff-list">{tariff.prices.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const content = useSiteContent();
  const { copy, tariffs } = content;
  const adultDirections = content.directions.filter((item) => item.visible && item.audience === "Взрослые");
  const kidsDirections = content.directions.filter((item) => item.visible && item.audience === "Дети");
  const phone = copy.phone.replace(/[^+\d]/g, "");

  useEffect(() => {
    const faviconUrl = "/favicon-vvys-safari-v5.svg?v=5";
    document.querySelectorAll<HTMLLinkElement>('link[rel*="icon"]').forEach((link) => link.remove());
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.type = "image/svg+xml";
    favicon.href = faviconUrl;
    document.head.appendChild(favicon);
  }, []);
  const closeMenu = () => setMenuOpen(false);

  return <main>
    <header className="nav-wrap">
      <a className="brand" href="#top" aria-label="Ввысь — наверх"><span className="brand-mark">В</span><span>студия<br />Ввысь</span></a>
      <nav aria-label="Основная навигация"><a href="#adults">Взрослым</a><a href="#kids">Детям</a><a href="#about">О студии</a><a href="#booking">Записаться</a></nav>
      <div className="nav-actions"><a className="nav-button" href={`tel:${phone}`}>Позвонить <span className="link-arrow" aria-hidden="true">→</span></a><button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="quick-menu" onClick={() => setMenuOpen((current) => !current)}><span /><span /></button></div>
    </header>

    <div className={`quick-menu ${menuOpen ? "is-open" : ""}`} id="quick-menu" aria-hidden={!menuOpen}>
      <div className="quick-menu-links"><a href="#adults" onClick={closeMenu}>Направления для взрослых</a><a href="#adult-prices" onClick={closeMenu}>Цены для взрослых</a><a href="#kids" onClick={closeMenu}>Направления для детей</a><a href="#kids-prices" onClick={closeMenu}>Цены для детей</a><a href="#formats" onClick={closeMenu}>Как проходят занятия</a><a href="#about" onClick={closeMenu}>О студии</a><a href="#booking" onClick={closeMenu}>Контакты и запись</a></div>
      <a className="quick-menu-cta" href={`https://wa.me/${phone.slice(1)}`} target="_blank" rel="noreferrer" onClick={closeMenu}>Написать в WhatsApp <span className="link-arrow" aria-hidden="true">→</span></a>
    </div>

    <section className="hero" id="top"><div className="hero-photo" role="img" aria-label="Фитнес-тренировка в светлой студии" /><div className="hero-shade" /><div className="hero-copy"><p className="eyebrow"><span /> {copy.heroEyebrow}</p><h1>{copy.heroTitle}<br /><em>{copy.heroAccent}</em></h1><div className="hero-bottom"><p>{copy.heroDescription}</p><nav className="hero-quick-links" aria-label="Быстрые переходы"><a href="#adults">Взрослым</a><a href="#kids">Детям</a><a href="#about">О студии</a><a href="#booking">Записаться</a></nav></div></div><div className="hero-info"><span>{copy.address.replace("Московская область, ", "").replace("\n", " · ")}</span><span>{copy.hours}</span></div></section>

    <section className="directions section" id="adults"><div className="section-heading"><h2>Занятия<br /><em>для взрослых</em></h2><p>{copy.adultIntro}</p></div><div className="rail-controls"><span>{adultDirections.length} направлений · листайте карточки в сторону</span></div><div className="direction-grid">{adultDirections.map((item) => <DirectionCard item={item} key={item.id} />)}</div><div className="tariff-intro"><span>Два формата занятий</span><h3>Выберите, где проходит тренировка</h3><p>Базовый тариф действует для занятий на коврике и с обычным инвентарём. Воздушный — только для полотен и гамаков.</p></div><div className="price-panels" id="adult-prices"><TariffCard tariff={tariffs.basic} /><TariffCard tariff={tariffs.air} /></div></section>

    <section className="kids-section section" id="kids"><div className="section-heading"><h2>Занятия<br /><em>для детей</em></h2><p>{copy.kidsIntro}</p></div><div className="kids-layout"><div className="direction-grid kids-direction-grid">{kidsDirections.map((item) => <DirectionCard item={item} key={item.id} />)}</div><div id="kids-prices"><TariffCard tariff={tariffs.kids} /></div></div></section>

    <section className="formats section" id="formats"><div className="format-heading"><div><h2>Комфорт, который помогает остаться</h2><p>Понятный старт, внимание тренера и нагрузка, соответствующая вашей подготовке — и для взрослых, и для детей.</p></div></div><div className="format-grid"><article><h3>Групповые занятия</h3><span>До 8 человек</span><p>В зале достаточно пространства, а тренер видит технику каждого участника и помогает её скорректировать.</p></article><article><h3>Понятный старт</h3><span>Диагностика · 490 ₽</span><p>Определим ваши цели и предложим 2–3 направления. При покупке абонемента в тот же день стоимость диагностики вычитается.</p></article><article><h3>Тренер рядом</h3><span>5 специалистов</span><p>С вами работают инструкторы по фитнесу, пилатесу, йоге и воздушным направлениям с профильной подготовкой.</p></article></div></section>

    <section className="studio-story" id="about"><div className="story-photo" role="img" aria-label="Светлый зал студии фитнеса" /><div className="story-copy"><h2>{copy.aboutTitle}</h2><p className="story-lead">{copy.aboutLead}</p><p>{copy.aboutText}</p><p><strong>Рейтинг 5,0 на Яндекс Картах</strong></p></div></section>

    <section className="pause-section"><div className="pause-copy"><p className="eyebrow"><span /> Сильнее с каждым занятием</p><h2>Ваше тело<br />может <em>больше</em></h2></div><blockquote>«Тренировки остаются и эффективными, и комфортными — хочется продолжать»</blockquote></section>

    <section className="booking section" id="booking"><div className="booking-copy"><h2>Первый шаг —<br /><em>просто попробовать</em></h2><p>Позвоните или напишите администратору. Вам помогут выбрать направление, уточнят расписание и запишут на пробное занятие.</p></div><div className="booking-phone-card"><span>Студия «Ввысь»</span><a href={`tel:${phone}`}>{copy.phone}</a><p>{copy.hours}</p><a className="call-button" href={`https://wa.me/${phone.replace("+", "")}`} target="_blank" rel="noreferrer">Написать в WhatsApp <span className="link-arrow" aria-hidden="true">→</span></a></div></section>

    <footer id="contacts"><div className="footer-top"><a className="brand footer-brand" href="#top"><span className="brand-mark">В</span><span>студия<br />Ввысь</span></a><h2>До встречи<br /><em>на тренировке</em></h2><div className="footer-contacts"><p>{copy.address.split("\n").map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}</p><a className="footer-phone" href={`tel:${phone}`}>{copy.phone}</a><div className="footer-links"><a href="https://t.me/upfitstudiokorolev" target="_blank" rel="noreferrer"><span>Telegram</span><span aria-hidden="true">↗︎</span></a><a href="https://vk.com/upfitstudio" target="_blank" rel="noreferrer"><span>ВКонтакте</span><span aria-hidden="true">↗︎</span></a><a href={mapUrl} target="_blank" rel="noreferrer"><span>Открыть на карте</span><span aria-hidden="true">→</span></a></div></div></div><div className="footer-bottom"><span>© 2026 Студия «Ввысь»</span><span>Демонстрационная версия сайта</span><a href="#top">Наверх ↑</a></div></footer>
  </main>;
}
