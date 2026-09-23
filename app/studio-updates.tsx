export const scheduleUrl = "https://appevent.ru/w/21373";
const reviewsUrl = "https://yandex.ru/maps/org/vvys/156108342252/reviews/";
const messageUrl = "https://wa.me/79804219092";

export function SocialLinks() {
  return <div className="social-actions" aria-label="Социальные сети и мессенджеры студии">
    <a href="https://t.me/upfitstudiokorolev" target="_blank" rel="noreferrer">Telegram ↗</a>
    <a href="https://vk.com/upfitstudio" target="_blank" rel="noreferrer">ВКонтакте ↗</a>
    <a href={messageUrl} target="_blank" rel="noreferrer">WhatsApp ↗</a>
    <a href="https://max.ru/+7(980)421-90-92" target="_blank" rel="noreferrer">MAX ↗</a>
  </div>;
}

export function MorningSection() {
  return <section className="morning-section section" id="schedule">
    <div><p className="section-kicker">Утренние занятия</p><h2>Утро <em>для себя</em></h2><p>Пока город спешит — найдите время для движения. Пилатес, растяжка и мягкая нагрузка, с которой приятно начать день.</p></div>
    <div className="morning-time"><strong>10:00–13:00</strong><p>Выберите день, направление и свободное место в актуальном расписании.</p><a className="action-link" href={scheduleUrl} target="_blank" rel="noreferrer">Расписание и запись <span aria-hidden="true">↗</span></a><span className="supporting-note">Утренние группы — в отдельные дни по расписанию.</span></div>
  </section>;
}

export function FamilySection() {
  return <section className="family-section section" id="family">
    <div className="family-heading"><p className="section-kicker">Семейный тариф</p><h2>У каждого —<br />своё направление.<br /><em>У семьи — общая привычка.</em></h2></div>
    <div className="family-copy"><p className="large-copy">Занимайтесь всей семьёй в одной студии.</p><p>Для взрослых — фитнес, пилатес и растяжка. Для детей — воздушная гимнастика. Подберём занятия под интересы каждого и ваш семейный ритм.</p><div className="family-details"><span>Взрослым и детям</span><span>Направления на выбор</span></div><a className="action-link" href={`${messageUrl}?text=${encodeURIComponent("Здравствуйте! Расскажите, пожалуйста, об условиях и стоимости семейного тарифа.")}`} target="_blank" rel="noreferrer">Узнать условия семейного тарифа <span aria-hidden="true">↗</span></a><p className="supporting-note">Стоимость и условия уточните у администратора.</p></div>
  </section>;
}

export function OffersSection() {
  return <section className="offers-section section" id="offers"><div className="section-heading"><h2>Начать <em>приятнее</em><br />с предложением</h2><p>Акции и знакомство со студией. Выберите свой первый шаг — мы поможем с остальным.</p></div>
    <div className="offers-grid"><article className="offer-featured"><span className="section-kicker">Акция · первый визит</span><h3>Персональная<br />диагностика тела</h3><strong>490 ₽</strong><p>Познакомьтесь с тренером и подберите подходящее направление с учётом вашей подготовки и целей.</p><a className="action-link" href={`${messageUrl}?text=${encodeURIComponent("Здравствуйте! Хочу записаться на диагностику тела за 490 ₽. Подскажите условия акции и свободное время.")}`} target="_blank" rel="noreferrer">Записаться на диагностику <span aria-hidden="true">↗</span></a></article>
    <article><span className="section-kicker">Знакомство с направлением</span><h3>Пробное<br />занятие</h3><strong>600 ₽</strong><p>Попробуйте выбранное направление, почувствуйте нагрузку и познакомьтесь с атмосферой студии.</p><a className="action-link action-outline" href={scheduleUrl} target="_blank" rel="noreferrer">Выбрать занятие <span aria-hidden="true">↗</span></a></article></div>
    <p className="supporting-note offer-note">Условия диагностики и доступное время уточните при записи. Другие предложения студии — в <a href="https://t.me/upfitstudiokorolev" target="_blank" rel="noreferrer">Telegram</a> и <a href="https://vk.com/upfitstudio" target="_blank" rel="noreferrer">ВКонтакте</a>.</p>
  </section>;
}

export function ReviewsSection() {
  return <section className="reviews-section section" id="reviews"><div className="reviews-copy"><p className="section-kicker">Нам доверяют</p><h2>Лучше всего<br />о нас говорят<br /><em>те, кто занимается</em></h2><a className="rating-summary" href={reviewsUrl} target="_blank" rel="noreferrer"><strong>5,0</strong><div><span className="rating-stars" aria-label="5 из 5 звёзд">★★★★★</span><span>на Яндекс Картах</span></div></a><p>Реальные люди, их опыт и впечатления — отзывы с именами авторов прямо из Яндекс Карт.</p><a className="action-link action-outline" href={reviewsUrl} target="_blank" rel="noreferrer">Все отзывы на Яндекс Картах <span aria-hidden="true">↗</span></a><span className="supporting-note">Рейтинг проверен 23 сентября 2026 года.</span></div><div className="reviews-widget"><iframe title="Отзывы о студии Ввысь на Яндекс Картах" src="https://yandex.ru/maps-reviews-widget/156108342252?comments" loading="lazy" /><a href={reviewsUrl} target="_blank" rel="noreferrer">Открыть отзывы на Яндекс Картах ↗</a></div></section>;
}

export function LocationSection() {
  return <section className="location-section section" id="location"><div className="location-copy"><p className="section-kicker">Рядом с вами</p><h2>Встретимся<br /><em>в студии</em></h2><p className="location-address">Королёв, ул. Академика Легостаева, 8<br />Секция 9</p><p>Есть утренние занятия с 10:00 до 13:00 и вечерние группы. Точное время — в расписании.</p><a className="action-link" href="https://yandex.ru/maps/org/vvys/156108342252/" target="_blank" rel="noreferrer">Открыть карту и маршрут <span aria-hidden="true">↗</span></a><SocialLinks /></div><iframe className="location-map" title="Студия Ввысь — Королёв, улица Академика Легостаева, 8" src="https://yandex.ru/map-widget/v1/?z=16&ol=biz&oid=156108342252" loading="lazy" allowFullScreen /></section>;
}
