"use client";

import { useEffect, useState } from "react";
import { GiftSection, LocationSection, MorningSection, OffersSection, ReviewsSection, SocialLinks, scheduleUrl } from "./studio-updates";

const phone = "+79804219092";

type PriceKind = "basic" | "air" | "kids";

type Direction = {
  title: string;
  text: string;
  audience: "Взрослые" | "Дети";
  priceKind: PriceKind;
  image: string;
};

const adultDirections: Direction[] = [
  { title: "Функциональный тренинг + TRX", text: "Силовая тренировка на всё тело: развиваем выносливость, улучшаем осанку и укрепляем основные группы мышц.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1100&q=85" },
  { title: "Фитнес на полотнах", text: "Полотна поддерживают тело, снимают часть нагрузки и помогают двигаться свободнее и увереннее.", audience: "Взрослые", priceKind: "air", image: "https://images.pexels.com/photos/868483/pexels-photo-868483.jpeg?auto=compress&cs=tinysrgb&w=1100" },
  { title: "Йога", text: "Практика для начинающих и опытных: движение, дыхание, мягкая растяжка и возвращение к внутреннему равновесию.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85" },
  { title: "Пилатес GOLD", text: "Бережная программа «Золотой возраст»: аккуратно разрабатываем суставы, возвращаем силу и лёгкость движения.", audience: "Взрослые", priceKind: "basic", image: "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1100" },
  { title: "Пилатес + МФР", text: "Работаем над подвижностью позвоночника и суставов, укрепляем глубокие мышцы и улучшаем гибкость.", audience: "Взрослые", priceKind: "basic", image: "https://images.pexels.com/photos/8614454/pexels-photo-8614454.jpeg?auto=compress&cs=tinysrgb&w=1100" },
  { title: "Здоровая спина", text: "Безопасные движения для мышечного корсета, гибкости и силы спины — в медленном комфортном темпе.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85" },
  { title: "Восстановление после родов", text: "Бережная работа с диастазом, тазовым дном, дыханием, осанкой и возвращением тела к активности.", audience: "Взрослые", priceKind: "basic", image: "https://images.pexels.com/photos/7055641/pexels-photo-7055641.jpeg?auto=compress&cs=tinysrgb&w=1100" },
  { title: "Стретчинг", text: "Развиваем эластичность мышц и мобильность суставов с упражнениями для любого уровня подготовки.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1100&q=85" },
  { title: "Аэростретчинг в гамаке", text: "Растяжка без лишней нагрузки на суставы и позвоночник — для лёгкости, гибкости и красивой осанки.", audience: "Взрослые", priceKind: "air", image: "https://images.pexels.com/photos/4999398/pexels-photo-4999398.jpeg?auto=compress&cs=tinysrgb&w=1100" },
  { title: "Скульптор тела", text: "Динамичная смесь силового фитнеса, растяжки и кардио для тонуса мышц и работы над фигурой.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85" },
  { title: "Силовая йога", text: "Более динамичная практика: плавные связки, силовая нагрузка и внимание к технике движения.", audience: "Взрослые", priceKind: "basic", image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85" },
];

const kidsDirections: Direction[] = [
  { title: "Воздушная гимнастика", text: "Нескучные занятия на воздушных снарядах развивают силу, гибкость, координацию и создают хорошую физическую базу для любого спорта.", audience: "Дети", priceKind: "kids", image: "https://images.squarespace-cdn.com/content/v1/62c63e966ea22529c1e3c084/83117d5e-4a20-4d3d-b764-9035819609b2/IMG_0070.jpeg" },
];

const tariffs = {
  basic: { label: "Взрослый базовый", title: "Занятия на коврике", note: "Для функционального тренинга, йоги, пилатеса, здоровой спины, восстановления после родов, стретчинга и скульптора тела.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 200 ₽"], ["4 занятия", "4 000 ₽"], ["6 занятий", "5 700 ₽"], ["8 занятий", "6 900 ₽"], ["12 занятий", "9 900 ₽"], ["Индивидуальное", "3 000 ₽"], ["Парное", "4 000 ₽"]] },
  air: { label: "Взрослый воздушный", title: "Занятия в воздухе", note: "Только для фитнеса на полотнах и аэростретчинга в гамаках. Группы до 5 человек.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 400 ₽"], ["4 занятия", "4 400 ₽"], ["6 занятий", "6 500 ₽"], ["8 занятий", "8 000 ₽"], ["12 занятий", "10 800 ₽"], ["Индивидуальное", "3 000 ₽"], ["Парное", "4 000 ₽"]] },
  kids: { label: "Детский тариф", title: "Воздушная гимнастика", note: "Для детских групп, парных и индивидуальных занятий на воздушных снарядах.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 000 ₽"], ["4 занятия", "3 500 ₽"], ["6 занятий", "5 100 ₽"], ["8 занятий", "6 500 ₽"], ["12 занятий", "9 500 ₽"], ["Индивидуальное", "2 800 ₽"], ["Парное", "3 500 ₽"]] },
};

function DirectionCard({ item }: { item: Direction }) {
  return <article className="direction-card">
    <div className="card-photo" style={{ backgroundImage: `url(${item.image})` }} />
    <div className="card-body">
      <div className="card-meta"><span className="pill">60 минут</span><span className="pill">{item.audience}</span><span className="pill">Группа</span></div>
      <h3>{item.title}</h3><p>{item.text}</p>
      <div className="card-price"><span>Пробное занятие</span><strong>600 ₽</strong></div>
    </div>
  </article>;
}

function TariffCard({ tariff }: { tariff: typeof tariffs.basic }) {
  return <article className="tariff-card"><div className="tariff-title"><span>{tariff.label}</span><h3>{tariff.title}</h3><p>{tariff.note}</p></div><div className="tariff-list">{tariff.prices.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></article>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      <nav aria-label="Основная навигация"><a href="#adults">Взрослым</a><a href="#kids">Детям</a><a href="#gifts">Сертификаты</a><a href="#offers">Акции</a><a href="#reviews">Отзывы</a><a href={scheduleUrl} target="_blank" rel="noreferrer">Расписание ↗</a></nav>
      <div className="nav-actions"><a className="nav-button" href={`tel:${phone}`}>Позвонить <span className="link-arrow" aria-hidden="true">→</span></a><button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} aria-controls="quick-menu" onClick={() => setMenuOpen((current) => !current)}><span /><span /></button></div>
    </header>

    <div className={`quick-menu ${menuOpen ? "is-open" : ""}`} id="quick-menu" aria-hidden={!menuOpen}>
      <div className="quick-menu-links"><a href={scheduleUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Расписание и запись ↗</a><a href="#schedule" onClick={closeMenu}>Занятия утром, днём и вечером</a><a href="#adults" onClick={closeMenu}>Направления для взрослых</a><a href="#adult-prices" onClick={closeMenu}>Цены для взрослых</a><a href="#kids" onClick={closeMenu}>Направления для детей</a><a href="#kids-prices" onClick={closeMenu}>Цены для детей</a><a href="#family" onClick={closeMenu}>Семейный тариф · акция</a><a href="#gifts" onClick={closeMenu}>Подарочные сертификаты</a><a href="#offers" onClick={closeMenu}>Акции</a><a href="#reviews" onClick={closeMenu}>Отзывы</a><a href="#about" onClick={closeMenu}>О студии</a><a href="#location" onClick={closeMenu}>Адрес и карта</a><a href="#booking" onClick={closeMenu}>Контакты и запись</a></div>
      <a className="quick-menu-cta" href={`https://wa.me/${phone.slice(1)}`} target="_blank" rel="noreferrer" onClick={closeMenu}>Написать в WhatsApp <span className="link-arrow" aria-hidden="true">→</span></a>
    </div>

    <section className="hero" id="top"><div className="hero-photo" role="img" aria-label="Фитнес-тренировка в светлой студии" /><div className="hero-shade" /><div className="hero-copy"><p className="eyebrow"><span /> Фитнес для всей семьи в Королёве</p><h1>Двигайтесь<br /><em>ввысь</em></h1><div className="hero-bottom"><p>Современная студия фитнеса и воздушной гимнастики. Групповые занятия, профессиональные тренеры и бережный подход к каждому телу.</p><nav className="hero-quick-links" aria-label="Быстрые переходы"><a href="#adults">Взрослым</a><a href="#kids">Детям</a><a href="#about">О студии</a><a href="#booking">Записаться</a></nav></div></div><div className="hero-social"><SocialLinks intro /></div><div className="hero-info"><span>Королёв · ул. Академика Легостаева, 8 · секция 9</span><span>Утром, днём и вечером · по расписанию</span></div></section>

    <section className="directions section" id="adults"><div className="section-heading"><h2>Занятия<br /><em>для взрослых</em></h2><p>От спокойной йоги и пилатеса до функциональных и воздушных тренировок. На карточке указана цена знакомства, а полный прайс расположен сразу после направлений.</p></div><div className="rail-controls"><span>11 направлений · листайте карточки в сторону</span></div><div className="direction-grid">{adultDirections.map((item) => <DirectionCard item={item} key={item.title} />)}</div><div className="tariff-zone"><div className="tariff-intro"><span>Два формата занятий</span><h3>Выберите, где проходит тренировка</h3><p>Базовый тариф действует для занятий на коврике и с обычным инвентарём. Воздушный — только для полотен и гамаков.</p></div><div className="price-panels" id="adult-prices"><TariffCard tariff={tariffs.basic} /><TariffCard tariff={tariffs.air} /></div></div></section>

    <section className="kids-section section" id="kids"><div className="section-heading"><h2>Занятия<br /><em>для детей</em></h2><p>Воздушная гимнастика — отдельная детская программа, где сила, гибкость и координация развиваются через интерес к движению.</p></div><div className="kids-layout"><DirectionCard item={kidsDirections[0]} /><div id="kids-prices"><TariffCard tariff={tariffs.kids} /></div></div></section>

    <MorningSection />
    <OffersSection />
    <GiftSection />
    <section className="formats section" id="formats"><div className="format-heading"><div><h2><span>Комфорт, который</span><em>помогает остаться</em></h2><p>Понятный старт, внимание тренера и нагрузка, соответствующая вашей подготовке — и для взрослых, и для детей.</p></div></div><div className="format-grid"><article><h3>Групповые занятия</h3><span>До 8 человек</span><p>В зале достаточно пространства, а тренер видит технику каждого участника и помогает её скорректировать.</p></article><article><h3>Понятный старт</h3><span>Диагностика · 490 ₽</span><p>Определим ваши цели и предложим 2–3 направления. При покупке абонемента в тот же день стоимость диагностики вычитается.</p></article><article><h3>Тренер рядом</h3><span>5 специалистов</span><p>С вами работают инструкторы по фитнесу, пилатесу, йоге и воздушным направлениям с профильной подготовкой.</p></article></div></section>

    <section className="studio-story" id="about"><div className="story-photo" role="img" aria-label="Светлый зал студии фитнеса" /><div className="story-copy"><h2><span>Пространство, где</span><em>хочется заниматься</em></h2><p className="story-lead">Большой светлый зал, новый инвентарь и профессиональные инструкторы с подтверждённой квалификацией.</p><p>Без переполненного зала и постороннего шума. Здесь замечают ваш прогресс, поддерживают, когда трудно, и помогают тренироваться безопасно.</p></div></section>

    <ReviewsSection />
    <section className="pause-section"><div className="pause-copy"><p className="eyebrow"><span /> Сильнее с каждым занятием</p><h2>Ваше тело<br />может <em>больше</em></h2></div><a className="action-link pause-action" href={scheduleUrl} target="_blank" rel="noreferrer">Найти своё занятие <span aria-hidden="true">↗</span></a></section>

    <LocationSection />

    <footer className="compact-footer" id="contacts"><a className="brand footer-brand" href="#top"><span className="brand-mark">В</span><span>студия<br />Ввысь</span></a><span>© 2026 Студия «Ввысь» · Фитнес для всей семьи</span><a href="#top">Наверх ↑</a></footer>
  </main>;
}
