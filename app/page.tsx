"use client";

import { FormEvent, useState } from "react";

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
    title: "Женская практика",
    text: "Мягкое занятие с заботой о женском здоровье, подвижности и бережном восстановлении ресурса.",
    meta: "Мягкая нагрузка",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    title: "Йога для беременных",
    text: "Осознанное движение, дыхание и расслабление в комфортном темпе с вниманием к каждому состоянию.",
    meta: "По согласованию",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85",
  },
];

const schedule = [
  { day: "ПН", date: "12", time: "09:00", title: "Хатха-йога", level: "Мягкая практика" },
  { day: "СР", date: "14", time: "19:00", title: "Здоровая спина", level: "Все уровни" },
  { day: "ПТ", date: "16", time: "18:30", title: "Женская практика", level: "Мягкая практика" },
  { day: "СБ", date: "17", time: "11:00", title: "Хатха-йога", level: "Все уровни" },
];

export default function Home() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
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
          <a href="#schedule">Расписание</a>
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

      <section className="intro section" id="about">
        <p className="section-label">[ 01 — О СТУДИИ ]</p>
        <div className="intro-main">
          <h2>Не стремиться стать лучше.<br />А стать <em>ближе к себе.</em></h2>
          <div className="intro-text">
            <p>«Вдохновение в пути» — камерная студия для тех, кто ищет не спортивные рекорды, а устойчивость, здоровье и ясность.</p>
            <p>Мы бережно знакомим с практикой начинающих и помогаем опытным ученикам двигаться глубже.</p>
          </div>
        </div>
        <div className="stats">
          <div><strong>4,8</strong><span>рейтинг студии</span></div>
          <div><strong>22</strong><span>оценки гостей</span></div>
          <div><strong>7/7</strong><span>дней в неделю</span></div>
          <div className="quote"><span>“</span><p>Практика начинается там, где заканчивается спешка.</p></div>
        </div>
      </section>

      <section className="directions section" id="directions">
        <div className="section-heading">
          <p className="section-label">[ 02 — НАПРАВЛЕНИЯ ]</p>
          <h2>Выберите свою<br /><em>практику</em></h2>
          <p>У каждого свой ритм и свой путь. Начните с того, что откликается именно вам.</p>
        </div>
        <div className="direction-grid">
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
          <div><span>Персональные занятия</span><span>Здоровая спина</span><span>Массаж</span><span>Релакс-практики</span></div>
        </div>
      </section>

      <section className="pause-section">
        <div className="pause-copy"><p className="eyebrow"><span /> Время для себя</p><h2>Иногда нужно<br />просто <em>остановиться</em></h2></div>
        <blockquote>«После практики мир остаётся прежним. Но вы смотрите на него уже иначе»</blockquote>
      </section>

      <section className="schedule section" id="schedule">
        <div className="schedule-title">
          <div><p className="section-label">[ 03 — РАСПИСАНИЕ ]</p><h2>Ближайшие<br /><em>занятия</em></h2></div>
          <p className="demo-note">Пример расписания для демонстрации сайта.<br />Актуальное время уточняйте в студии.</p>
        </div>
        <div className="schedule-list">
          {schedule.map((item) => (
            <a href="#booking" className="schedule-row" key={item.day + item.time}>
              <div className="date"><b>{item.date}</b><span>{item.day}</span></div>
              <time>{item.time}</time>
              <div><h3>{item.title}</h3><p>{item.level}</p></div>
              <span className="row-action">Записаться <i>↗</i></span>
            </a>
          ))}
        </div>
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
              <label>Что вас интересует?<select name="direction" defaultValue=""><option value="" disabled>Выберите направление</option><option>Хатха-йога</option><option>Женская практика</option><option>Йога для беременных</option><option>Персональное занятие</option><option>Массаж</option></select></label>
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
