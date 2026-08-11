"use client";

import { FormEvent, useRef, useState } from "react";

const directions = [
  {
    number: "01",
    title: "Хатха-йога",
    text: "Спокойная, внимательная практика: укрепляем тело, раскрываем дыхание и возвращаем внутреннюю опору.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "02",
    title: "Йогатерапия",
    text: "Практика для женского здоровья по методу Birthlight Well Woman Yoga — мягко и с вниманием к состоянию.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "03",
    title: "Аэройога",
    text: "Практика в мини-группе до четырёх человек: гамак, баланс, координация и бережное вытяжение позвоночника.",
    duration: "60 минут",
    group: "Мини-группа до 4",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "04",
    title: "Здоровая спина",
    text: "Программа для укрепления мышц спины, оздоровления позвоночника и улучшения осанки.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "05",
    title: "Пилатес",
    text: "Плавная часовая тренировка для развития гибкости, подвижности и укрепления мышц корпуса.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://cdn.pixabay.com/photo/2017/11/18/05/08/pilates-2959235_1280.jpg",
  },
  {
    number: "06",
    title: "Аэростретчинг",
    text: "Мягкая растяжка в гамаках с динамическими, статическими и перевёрнутыми положениями.",
    duration: "60 минут",
    group: "Мини-группа до 4",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "07",
    title: "Кундалини-йога",
    text: "Йога осознания, объединяющая движение, дыхание, внимание и медитативную практику.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "08",
    title: "Фитнес + растяжка",
    text: "Динамическая тренировка в мини-группе: укрепление мышц всего тела и работа над гибкостью.",
    duration: "60 минут",
    group: "Мини-группа 4–5",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "09",
    title: "Стретчинг",
    text: "Мягкая работа над гибкостью и подвижностью суставов без резких движений и перегрузки.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1100&q=85",
  },
  {
    number: "10",
    title: "Гвоздестояние",
    text: "Практика концентрации и знакомства с доской Садху под внимательным сопровождением преподавателя.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.pexels.com/photos/6944817/pexels-photo-6944817.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "11",
    title: "Слушая тело",
    text: "Танцевальная практика, в которой движение помогает лучше почувствовать тело и свободнее выражать себя.",
    duration: "60 минут",
    group: "Группа до 8",
    image: "https://images.pexels.com/photos/36189008/pexels-photo-36189008.jpeg?auto=compress&cs=tinysrgb&w=1100",
  },
  {
    number: "12",
    title: "Растяжка в гамаках",
    text: "Занятие для начинающих: гамак помогает безопасно развивать гибкость и снять напряжение со спины.",
    duration: "60 минут",
    group: "Мини-группа до 4",
    image: "https://images.pexels.com/photos/6582856/pexels-photo-6582856.jpeg?auto=compress&cs=tinysrgb&w=1100",
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
          <h1>Йога и движение<br /><em>для вашего тела</em></h1>
          <div className="hero-bottom">
            <p>Выберите подходящее занятие, узнайте стоимость и запишитесь в студию в Королёве.</p>
            <a className="hero-primary" href="#directions">Выбрать занятие <span>↓</span></a>
          </div>
        </div>
        <div className="hero-info"><span>Дворцовый проезд, 8/14</span><span>Ежедневно · 07:00—22:00</span></div>
      </section>

      <section className="directions section" id="directions">
        <div className="section-heading">
          <p className="section-label">[ 01 — ЗАНЯТИЯ ]</p>
          <h2>Какие занятия<br /><em>есть в студии</em></h2>
          <p>Листайте карточки, сравнивайте направления и выбирайте подходящую нагрузку.</p>
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
                <div className="card-meta">
                  <span className="pill">{item.duration}</span>
                  <span className="pill">{item.group}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="formats section" id="formats">
        <div className="format-heading"><p className="section-label">[ 02 — ФОРМАТЫ ]</p><div><h2>Как можно заниматься</h2><p>Выберите не только направление, но и удобный способ занятий.</p></div></div>
        <div className="format-grid">
          <article><span>01 · до 8 человек</span><h3>В группе</h3><p>Регулярные занятия по йоге, пилатесу, фитнесу и растяжке — до восьми участников.</p><strong>от 550 ₽</strong></article>
          <article><span>02 · до 5 человек</span><h3>В мини-группе</h3><p>Аэройога и растяжка в гамаках — до четырёх участников, фитнес-группа — до пяти.</p><strong>от 550 ₽</strong></article>
          <article><span>03 · один на один</span><h3>Персонально</h3><p>Индивидуальное занятие с преподавателем под ваши задачи и уровень подготовки.</p><strong>до 1 100 ₽</strong></article>
        </div>
      </section>

      <section className="studio-story" id="about">
        <div className="story-photo" role="img" aria-label="Светлое спокойное пространство для занятий йогой" />
        <div className="story-copy">
          <p className="section-label">[ 03 — О СТУДИИ ]</p>
          <h2>Студия для начинающих<br />и опытных учеников</h2>
          <p className="story-lead">В «Вдохновении в пути» можно заниматься йогой, пилатесом, фитнесом и растяжкой, попробовать практики в гамаках или записаться на массаж.</p>
          <p>Если вы не знаете, что выбрать, администратор поможет подобрать занятие по цели, уровню подготовки и удобному формату.</p>
        </div>
      </section>

      <section className="prices section" id="prices">
        <div className="price-heading">
          <div><p className="section-label">[ 04 — ЦЕНЫ ]</p><h2>Сколько стоят<br /><em>занятия</em></h2></div>
          <div className="price-source"><span>Единая цена групповых занятий</span><p>Йога, пилатес, фитнес, растяжка и занятия в гамаках стоят 550 ₽ за одно посещение.</p></div>
        </div>
        <div className="price-strip">
          <article className="price-main"><div><span className="price-kicker">Любое групповое занятие</span><h3>Разовое посещение</h3><p>Хатха-йога, аэройога, пилатес, стретчинг, здоровая спина и другие групповые направления.</p></div><strong>550 <small>₽</small></strong></article>
          <article><span className="price-kicker">Персонально</span><h3>Индивидуальное занятие</h3><strong>до 1 100 <small>₽</small></strong><p>Точная стоимость зависит от выбранного направления.</p></article>
          <article><span className="price-kicker">60 минут</span><h3>Йога-массаж</h3><strong>2 000 <small>₽</small></strong><p>Растяжка, мягкое снятие зажимов и глубокое расслабление.</p></article>
        </div>

        <div className="membership-head" id="offers"><div><span>Специальные предложения</span><h3>Абонементы со скидкой</h3></div><p>Эти варианты подготовлены для демонстрации сайта и требуют подтверждения студией перед реальным запуском.</p></div>
        <div className="membership-grid">
          <article><div className="discount">−5%</div><span>Лёгкий старт</span><h3>4 занятия</h3><strong>2 090 ₽</strong><s>2 200 ₽</s><p>Для одной практики в неделю</p></article>
          <article className="popular"><div className="discount">−10%</div><span>В ритме</span><h3>8 занятий</h3><strong>3 960 ₽</strong><s>4 400 ₽</s><p>Самый комфортный темп</p></article>
          <article><div className="discount">−15%</div><span>Погружение</span><h3>12 занятий</h3><strong>5 610 ₽</strong><s>6 600 ₽</s><p>Для регулярной практики</p></article>
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
