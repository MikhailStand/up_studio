export const scheduleUrl = "https://appevent.ru/w/21373";
const reviewsUrl = "https://yandex.ru/maps/org/vvys/156108342252/reviews/";
const messageUrl = "https://wa.me/79804219092";

function SocialIcon({ kind }: { kind: "telegram" | "vk" | "whatsapp" }) {
  return <svg viewBox="0 0 24 24" width="23" height="23" aria-hidden="true" fill="currentColor">{kind === "telegram" ? <path d="M21.7 3.4 18.4 20c-.2 1.2-.9 1.5-1.9.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.1L17.8 6c.4-.4-.1-.6-.6-.3L5.7 13l-4.9-1.5c-1.1-.4-1.1-1.1.2-1.6L20.1 2.5c.9-.3 1.7.2 1.6.9Z"/> : kind === "vk" ? <path d="M13.1 19c-7.4 0-11.6-5.1-11.8-13.5H5c.2 6.1 2.9 8.7 5 9.2V5.5h3.5v5.3c2.1-.2 4.3-2.6 5-5.3H22c-.5 3.3-2.9 5.7-4.5 6.7 1.6.8 4.3 2.9 5.3 6.8h-3.9c-.8-2.6-2.8-4.6-5.4-4.9V19Z"/> : <><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="m8 7 1.5-.2 1.1 2.7-1 1.2c.7 1.5 1.8 2.5 3.3 3.1l1.2-1.3 2.7 1.3c.5 3.8-4.3 2.8-7.1.2C7 11.5 6.1 8.9 8 7Z"/></>}</svg>;
}

export function SocialLinks({ intro = false }: { intro?: boolean }) {
  return <div className="social-actions" aria-label="Социальные сети и мессенджеры студии">
    <a className="social-telegram" href="https://t.me/upfitstudiokorolev" target="_blank" rel="noreferrer"><SocialIcon kind="telegram"/><span>{intro ? "Мы в Telegram" : "Telegram"}</span></a>
    <a className="social-vk" href="https://vk.com/upfitstudio" target="_blank" rel="noreferrer"><SocialIcon kind="vk"/><span>{intro ? "Мы ВКонтакте" : "ВКонтакте"}</span></a>
    {!intro && <a className="social-whatsapp" href={messageUrl} target="_blank" rel="noreferrer"><SocialIcon kind="whatsapp"/><span>WhatsApp</span></a>}
  </div>;
}

export function MorningSection() {
  return <section className="morning-section section" id="schedule">
    <div className="schedule-intro"><p className="section-kicker">Занятия в течение всего дня</p><h2>Тренируйтесь<br />в удобное <em>время</em></h2><p>Можно прийти утром, днём или после работы. Выберите привычный ритм — занятия есть до закрытия студии.</p></div>
    <div className="schedule-panel">
      <article className="schedule-period"><div className="schedule-time"><span>Утро</span><strong><time>10:00</time><i>—</i><time>13:00</time></strong></div><div className="schedule-period-copy"><h3>Утренние занятия</h3><p>Спокойно начните день с тренировки и оставьте вечер свободным.</p></div></article>
      <article className="schedule-period"><div className="schedule-time"><span>День и вечер</span><strong><time>13:00</time><i>—</i><time>20:00</time></strong></div><div className="schedule-period-copy"><h3>Дневные и вечерние группы</h3><p>Занимайтесь в течение дня или после работы — вплоть до закрытия студии.</p></div></article>
      <div className="schedule-panel-footer"><p>Точное время, тренеры и свободные места — в актуальном расписании.</p><a className="action-link" href={scheduleUrl} target="_blank" rel="noreferrer">Смотреть расписание <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>;
}

export function FamilySection() {
  return <section className="family-section family-offer" id="family">
    <div className="family-heading"><p className="section-kicker">Для взрослых и детей</p><h2>Семейный<br /><em>тариф</em></h2><p className="family-caption">Одна студия.<br />Больше времени вместе.</p></div>
    <div className="family-copy"><p className="large-copy">Занимайтесь всей семьёй в одной студии.</p><p>Для взрослых — фитнес, пилатес и растяжка. Для детей — воздушная гимнастика. Подберём занятия под интересы каждого и ваш семейный ритм.</p><div className="family-details"><span>Взрослым и детям</span><span>Направления на выбор</span></div><a className="action-link" href={`${messageUrl}?text=${encodeURIComponent("Здравствуйте! Расскажите, пожалуйста, об условиях и стоимости семейного тарифа.")}`} target="_blank" rel="noreferrer">Узнать условия семейного тарифа <span aria-hidden="true">↗</span></a><p className="supporting-note">Стоимость и условия уточните у администратора.</p></div>
  </section>;
}

export function OffersSection() {
  return <section className="offers-section section" id="offers"><div className="section-heading"><h2>Акции<br /><em>и предложения</em></h2><p>Персональная диагностика по акции или пробная тренировка — два способа познакомиться со студией.</p></div>
    <div className="offers-grid"><article className="offer-featured"><span className="section-kicker">Акция · первый визит</span><h3>Персональная<br />диагностика тела</h3><strong>490 ₽</strong><p>Познакомьтесь с тренером и подберите подходящее направление с учётом вашей подготовки и целей.</p><a className="action-link" href={`${messageUrl}?text=${encodeURIComponent("Здравствуйте! Хочу записаться на диагностику тела за 490 ₽. Подскажите условия акции и свободное время.")}`} target="_blank" rel="noreferrer">Записаться на диагностику <span aria-hidden="true">↗</span></a></article>
    <article><span className="section-kicker">Знакомство с направлением</span><h3>Пробное<br />занятие</h3><strong>600 ₽</strong><p>Попробуйте выбранное направление, почувствуйте нагрузку и познакомьтесь с атмосферой студии.</p><a className="action-link action-outline" href={scheduleUrl} target="_blank" rel="noreferrer">Выбрать занятие <span aria-hidden="true">↗</span></a></article></div>
    <FamilySection />
    <p className="supporting-note offer-note">Условия акций и доступное время уточните при записи. Другие предложения студии — в <a href="https://t.me/upfitstudiokorolev" target="_blank" rel="noreferrer">Telegram</a> и <a href="https://vk.com/upfitstudio" target="_blank" rel="noreferrer">ВКонтакте</a>.</p>
  </section>;
}

export function GiftSection() {
  return <section className="gift-section section" id="gifts"><div className="gift-visual" aria-hidden="true"><div className="gift-card"><span>СТУДИЯ ВВЫСЬ</span><svg viewBox="0 0 100 100" fill="none"><path d="M20 48h60v36H20zM14 35h72v14H14zM50 35v49M50 35C17 37 22 8 36 16c9 5 14 19 14 19Zm0 0c33 2 28-27 14-19-9 5-14 19-14 19Z" stroke="currentColor" strokeWidth="2"/></svg><strong>Время<br /><em>для себя</em></strong><span>ПОДАРОЧНЫЙ СЕРТИФИКАТ</span></div></div><div className="gift-copy"><p className="section-kicker">Подарок с заботой</p><h2>Подарочные<br /><em>сертификаты</em></h2><p>Подарите близкому человеку время для движения, новых впечатлений и заботы о себе.</p><p>Администратор поможет выбрать подходящий вариант и расскажет об оформлении и условиях использования.</p><a className="action-link" href={`${messageUrl}?text=${encodeURIComponent("Здравствуйте! Хочу оформить подарочный сертификат. Расскажите о вариантах, стоимости и условиях использования.")}`} target="_blank" rel="noreferrer">Оформить сертификат <span aria-hidden="true">↗</span></a></div></section>;
}

export function ReviewsSection() {
  return <section className="reviews-section section" id="reviews"><div className="reviews-copy"><p className="section-kicker">Нам доверяют</p><h2>Отзывы<br /><em>о студии</em></h2><a className="rating-summary" href={reviewsUrl} target="_blank" rel="noreferrer"><strong>5,0</strong><div><span className="rating-stars" aria-label="5 из 5 звёзд">★★★★★</span><span>на Яндекс Картах</span></div></a><p>Реальные люди, их опыт и впечатления — отзывы с именами авторов прямо из Яндекс Карт.</p><a className="action-link action-outline" href={reviewsUrl} target="_blank" rel="noreferrer">Все отзывы на Яндекс Картах <span aria-hidden="true">↗</span></a><span className="supporting-note">Рейтинг проверен 23 сентября 2026 года.</span></div><div className="reviews-widget"><iframe title="Отзывы о студии Ввысь на Яндекс Картах" src="https://yandex.ru/maps-reviews-widget/156108342252?comments" loading="lazy" /></div></section>;
}

export function LocationSection() {
  return <section className="contact-hub section" id="booking">
    <div className="contact-hub-copy"><p className="section-kicker">Студия «Ввысь» · Королёв</p><h2>Запись<br /><em>и контакты</em></h2><p>Выберите занятие в расписании или напишите нам — поможем найти направление для вас и вашей семьи.</p><a className="contact-phone" href="tel:+79804219092">+7 980 421-90-92</a><a className="action-link contact-book" href={scheduleUrl} target="_blank" rel="noreferrer">Расписание и запись <span aria-hidden="true">↗</span></a><SocialLinks /></div>
    <div className="contact-hub-location" id="location"><div className="contact-address-row"><div><h3>Как нас найти</h3><p>Королёв, ул. Академика Легостаева, 8<br />Секция 9</p></div><a className="map-directions" href="https://yandex.ru/maps/org/vvys/156108342252/" target="_blank" rel="noreferrer">Маршрут ↗</a></div><iframe className="location-map" title="Студия Ввысь — Королёв, улица Академика Легостаева, 8" src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=156108342252" loading="lazy" allowFullScreen /></div>
  </section>;
}
