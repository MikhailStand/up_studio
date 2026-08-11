"use client";

import { FormEvent, useRef, useState } from "react";

const directions = [
  {
    number: "01",
    title: "Хатха-йога",
    text: "Спокойная, внимательная практика: укрепляем тело, раскрываем дыхание и возвращаем внутреннюю опору.",
    meta: "Для любого уровня",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    title: "Йогатерапия",
    text: "Практика для женского здоровья по методу Birthlight Well Woman Yoga — мягко и с вниманием к состоянию.",
    meta: "Мягкая нагрузка",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    title: "Аэройога",
    text: "Практика в мини-группе до четырёх человек: гамак, баланс, координация и бережное вытяжение позвоночника.",
    meta: "Мини-группа до 4",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "04",
    title: "Здоровая спина",
    text: "Программа для укрепления мышц спины, оздоровления позвоночника и улучшения осанки.",
    meta: "Спина и осанка",
    image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "05",
    title: "Пилатес",
    text: "Плавная часовая тренировка для развития гибкости, подвижности и укрепления мышц корпуса.",
    meta: "60 минут",
    image: "https://images.unsplash.com/photo-1510894347712-4b347293e6d2?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "06",
    title: "Аэростретчинг",
    text: "Мягкая растяжка в гамаках с динамическими, статическими и перевёрнутыми положениями.",
    meta: "Воздушная практика",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "07",
    title: "Кундалини-йога",
    text: "Йога осознания, объединяющая движение, дыхание, внимание и медитативную практику.",
    meta: "Йога осознания",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "08",
    title: "Фитнес + растяжка",
    text: "Динамическая тренировка в мини-группе: укрепление мышц всего тела и работа над гибкостью.",
    meta: "Мини-группа 4–5",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85",
  },
];

export default function Home() {
  const [sent, setSent] = useState(false);
  const directionRail = useRef<HTMLDivElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function moveDirections(direction: number) {
    directionRail.current?.scrollBy({ left: direction * 390, behavior: "smooth" });
  }

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Вдохновение в пути — наверх">
          <span className="brand-mark">В</span>
          <span>вдохновение<br />в пути</span>
        </a>
        <nav aria-label="Основная навигация">
          <a href="#directions">Направления</a>
          <a href="#prices">Цены</a>
          <a href="#about">О студии</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <a className="nav-button" href="#booking">Записаться <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-photo" role="img" aria-label="Спокойная практика йоги в светлом зале" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Студия йоги в Королёве</p>
          <h1>Дышите.<br /><em>Чувствуйте.</em><br />Будьте собой.</h1>
          <div className="hero-bottom">
            <p>Пространство бережной практики, где можно замедлиться, услышать себя и вернуть телу лёгкость.</p>
            <a className="circle-link" href="#booking" aria-label="Записаться на первое занятие">↘</a>
          </div>
        </div>
        <div className="hero-info"><span>Дворцовый проезд, 8/14</span><span>Ежедневно · 07:00—22:00</span></div>
      </section>

      <section className="directions section" id="directions">
        <div className="section-heading">
          <p className="section-label">[ 02 — НАПРАВЛЕНИЯ ]</p>
          <h2>Выберите свою<br /><em>практику</em></h2>
          <p>У каждого свой ритм и свой путь. Начните с того, что откликается именно вам.</p>
        </div>
        <div className="rail-controls" aria-label="Управление каруселью">
          <span>Листайте, чтобы увидеть все направления</span>
          <div><button onClick={() => moveDirections(-1)} aria-label="Предыдущие направления">←</button><button onClick={() => moveDirections(1)} aria-label="Следующие направления">→</button></div>
        </div>
        <div className="direction-grid" ref={directionRail}>
          {directions.map((item) => (
            <article className="direction-card" key={item.title}>
              <div className="card-photo" style={{ backgroundImage: `url(${item.image})` }}>
                <span>{item.number}</span><span className="card-arrow">↗</span>
              </div>
              <div className="card-body">
                <span className="pill">{item.meta}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#booking">Узнать подробнее <span>→</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="more-practices">
          <p>Также в студии</p>
          <div><span>Гвоздестояние</span><span>Стретчинг</span><span>Танцевальная практика</span><span>Йога-массаж</span></div>
        </div>
      </section>

      <section className="studio-story" id="about">
        <div className="story-photo" role="img" aria-label="Светлое спокойное пространство для занятий йогой">
          <div className="story-rating"><strong>4,8</strong><span>рейтинг на Яндекс Картах<br />по 22 оценкам</span></div>
        </div>
        <div className="story-copy">
          <p className="section-label">[ О ПРОСТРАНСТВЕ ]</p>
          <h2>Здесь можно быть<br /><em>в своём ритме</em></h2>
          <p className="story-lead">«Вдохновение в пути» — уютная студия в Королёве, где в одном месте собраны йога, фитнес, практики в гамаках и массаж.</p>
          <p>Можно прийти совсем без опыта: преподаватель поможет выбрать направление и спокойно познакомит с практикой. Группы камерные, поэтому внимания хватает каждому.</p>
          <div className="story-features"><span>Мини-группы</span><span>Личный тренер</span><span>Йога для беременных</span><span>Массаж</span><span>Парковка</span><span>Wi-Fi</span></div>
          <blockquote><span>“</span><p>Очень уютная студия с доброжелательной атмосферой. В одном месте можно заниматься йогой, фитнесом, тянуться в гамаке и прийти на массаж.</p></blockquote>
          <a href="#booking">Познакомиться со студией <span>↗</span></a>
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="price-heading">
          <div><p className="section-label">[ 03 — СТОИМОСТЬ ]</p><h2>Практика,<br /><em>доступная каждому</em></h2></div>
          <div className="price-source"><span>Актуально по карточке студии</span><p>Все групповые направления в опубликованном прайсе имеют единую стоимость. Перед визитом рекомендуем уточнить наличие места.</p></div>
        </div>
        <div className="price-strip">
          <article className="price-main"><div><span className="price-kicker">Любое групповое занятие</span><h3>Разовое посещение</h3><p>Хатха-йога, аэройога, пилатес, стретчинг, здоровая спина и другие групповые направления.</p></div><strong>550 <small>₽</small></strong><a href="#booking">Выбрать практику ↗</a></article>
          <article><span className="price-kicker">Персонально</span><h3>Индивидуальное занятие</h3><strong>до 1 100 <small>₽</small></strong><p>Точная стоимость зависит от выбранного направления.</p></article>
          <article><span className="price-kicker">60 минут</span><h3>Йога-массаж</h3><strong>2 000 <small>₽</small></strong><p>Растяжка, мягкое снятие зажимов и глубокое расслабление.</p></article>
        </div>

        <div className="membership-head"><div><span>Новая концепция</span><h3>Абонементы с выгодой</h3></div><p>Эти варианты подготовлены для демонстрации сайта и требуют подтверждения студией перед реальным запуском.</p></div>
        <div className="membership-grid">
          <article><div className="discount">−5%</div><span>Лёгкий старт</span><h3>4 занятия</h3><strong>2 090 ₽</strong><s>2 200 ₽</s><p>Для одной практики в неделю</p><a href="#booking">Выбрать</a></article>
          <article className="popular"><div className="discount">−10%</div><span>В ритме</span><h3>8 занятий</h3><strong>3 960 ₽</strong><s>4 400 ₽</s><p>Самый комфортный темп</p><a href="#booking">Выбрать</a></article>
          <article><div className="discount">−15%</div><span>Погружение</span><h3>12 занятий</h3><strong>5 610 ₽</strong><s>6 600 ₽</s><p>Для регулярной практики</p><a href="#booking">Выбрать</a></article>
        </div>
        <div className="gift-banner"><div><span>Подарок с заботой</span><h3>Подарочный сертификат</h3><p>На занятие, абонемент или массаж — сумма и оформление по согласованию со студией.</p></div><a href="#booking">Хочу подарить <span>↗</span></a></div>
      </section>

      <section className="pause-section">
        <div className="pause-copy"><p className="eyebrow"><span /> Время для себя</p><h2>Иногда нужно<br />просто <em>остановиться</em></h2></div>
        <blockquote>«После практики мир остаётся прежним. Но вы смотрите на него уже иначе»</blockquote>
      </section>

      <section className="booking section" id="booking">
        <div className="booking-copy">
          <p className="section-label light">[ ПЕРВОЕ ЗАНЯТИЕ ]</p>
          <h2>Ваш путь может<br />начаться <em>сегодня</em></h2>
          <p>Оставьте номер — администратор поможет выбрать подходящую практику и ответит на вопросы.</p>
          <div className="booking-contact"><span>Или позвоните нам</span><a href="tel:+79309098882">+7 930 909-88-82</a></div>
        </div>
        <form onSubmit={submit} className="booking-form">
          {sent ? (
            <div className="success"><span>✓</span><h3>Заявка принята</h3><p>Это демонстрация формы. На готовом сайте заявка будет приходить администратору студии.</p><button type="button" onClick={() => setSent(false)}>Заполнить ещё раз</button></div>
          ) : (
            <>
              <label>Ваше имя<input required name="name" placeholder="Как к вам обращаться?" /></label>
              <label>Телефон<input required name="phone" type="tel" placeholder="+7 999 000-00-00" /></label>
              <label>Что вас интересует?<select name="direction" defaultValue=""><option value="" disabled>Выберите направление</option><option>Хатха-йога</option><option>Аэройога</option><option>Здоровая спина</option><option>Йогатерапия для женского здоровья</option><option>Кундалини-йога</option><option>Пилатес</option><option>Стретчинг</option><option>Гвоздестояние</option><option>Персональное занятие</option><option>Йога-массаж</option></select></label>
              <button type="submit">Записаться на занятие <span>↗</span></button>
              <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных</small>
            </>
          )}
        </form>
      </section>

      <footer id="contacts">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top"><span className="brand-mark">В</span><span>вдохновение<br />в пути</span></a>
          <h2>До встречи<br />на <em>коврике</em></h2>
          <div className="footer-contacts">
            <p>Королёв<br />Дворцовый проезд, 8/14</p>
            <a href="tel:+79309098882">+7 930 909-88-82</a>
            <a target="_blank" rel="noreferrer" href="https://yandex.ru/maps/org/vdokhnoveniye_v_puti/13801819850?si=h9gh1zbyxezk9ynxwa45vchxzm">Открыть на карте ↗</a>
          </div>
        </div>
        <div className="footer-bottom"><span>© 2026 Вдохновение в пути</span><span>Демонстрационная версия сайта</span><a href="#top">Наверх ↑</a></div>
      </footer>
    </main>
  );
}
