export type PriceKind = "basic" | "air" | "kids";

export type Direction = {
  id: string;
  title: string;
  text: string;
  audience: "Взрослые" | "Дети";
  priceKind: PriceKind;
  image: string;
  duration: string;
  format: string;
  trialPrice: string;
  visible: boolean;
};

export type Tariff = {
  label: string;
  title: string;
  note: string;
  prices: Array<[string, string]>;
};

export type SiteContent = {
  copy: {
    heroEyebrow: string;
    heroTitle: string;
    heroAccent: string;
    heroDescription: string;
    adultIntro: string;
    kidsIntro: string;
    aboutTitle: string;
    aboutLead: string;
    aboutText: string;
    phone: string;
    address: string;
    hours: string;
  };
  directions: Direction[];
  tariffs: Record<PriceKind, Tariff>;
};

export const CONTENT_STORAGE_KEY = "vvys-admin-content-v1";
export const CONTENT_UPDATED_EVENT = "vvys-content-updated";

export const defaultSiteContent: SiteContent = {
  copy: {
    heroEyebrow: "Фитнес для всей семьи в Королёве",
    heroTitle: "Двигайтесь",
    heroAccent: "ввысь",
    heroDescription: "Современная студия фитнеса и воздушной гимнастики. Групповые занятия, профессиональные тренеры и бережный подход к каждому телу.",
    adultIntro: "От спокойной йоги и пилатеса до функциональных и воздушных тренировок. На карточке указана цена знакомства, а полный прайс расположен сразу после направлений.",
    kidsIntro: "Воздушная гимнастика — отдельная детская программа, где сила, гибкость и координация развиваются через интерес к движению.",
    aboutTitle: "Пространство, где хочется заниматься",
    aboutLead: "Большой светлый зал, новый инвентарь и профессиональные инструкторы с подтверждённой квалификацией.",
    aboutText: "Без переполненного зала и постороннего шума. Здесь замечают ваш прогресс, поддерживают, когда трудно, и помогают тренироваться безопасно.",
    phone: "+7 980 421-90-92",
    address: "Московская область, Королёв\nул. Академика Легостаева, 8, секция 9",
    hours: "Ежедневно · 15:00—21:00",
  },
  directions: [
    ["functional", "Функциональный тренинг + TRX", "Силовая тренировка на всё тело: развиваем выносливость, улучшаем осанку и укрепляем основные группы мышц.", "basic", "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1100&q=85"],
    ["silks", "Фитнес на полотнах", "Полотна поддерживают тело, снимают часть нагрузки и помогают двигаться свободнее и увереннее.", "air", "https://images.pexels.com/photos/868483/pexels-photo-868483.jpeg?auto=compress&cs=tinysrgb&w=1100"],
    ["yoga", "Йога", "Практика для начинающих и опытных: движение, дыхание, мягкая растяжка и возвращение к внутреннему равновесию.", "basic", "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1100&q=85"],
    ["pilates-gold", "Пилатес GOLD", "Бережная программа «Золотой возраст»: аккуратно разрабатываем суставы, возвращаем силу и лёгкость движения.", "basic", "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg?auto=compress&cs=tinysrgb&w=1100"],
    ["pilates-mfr", "Пилатес + МФР", "Работаем над подвижностью позвоночника и суставов, укрепляем глубокие мышцы и улучшаем гибкость.", "basic", "https://images.pexels.com/photos/8614454/pexels-photo-8614454.jpeg?auto=compress&cs=tinysrgb&w=1100"],
    ["healthy-back", "Здоровая спина", "Безопасные движения для мышечного корсета, гибкости и силы спины — в медленном комфортном темпе.", "basic", "https://images.unsplash.com/photo-1562088287-bde35a1ea917?auto=format&fit=crop&w=1100&q=85"],
    ["postpartum", "Восстановление после родов", "Бережная работа с диастазом, тазовым дном, дыханием, осанкой и возвращением тела к активности.", "basic", "https://images.pexels.com/photos/7055641/pexels-photo-7055641.jpeg?auto=compress&cs=tinysrgb&w=1100"],
    ["stretching", "Стретчинг", "Развиваем эластичность мышц и мобильность суставов с упражнениями для любого уровня подготовки.", "basic", "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1100&q=85"],
    ["aero-stretching", "Аэростретчинг в гамаке", "Растяжка без лишней нагрузки на суставы и позвоночник — для лёгкости, гибкости и красивой осанки.", "air", "https://images.pexels.com/photos/4999398/pexels-photo-4999398.jpeg?auto=compress&cs=tinysrgb&w=1100"],
    ["body-sculpt", "Скульптор тела", "Динамичная смесь силового фитнеса, растяжки и кардио для тонуса мышц и работы над фигурой.", "basic", "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1100&q=85"],
    ["power-yoga", "Силовая йога", "Более динамичная практика: плавные связки, силовая нагрузка и внимание к технике движения.", "basic", "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1100&q=85"],
  ].map(([id, title, text, priceKind, image]) => ({ id, title, text, priceKind: priceKind as PriceKind, image, audience: "Взрослые" as const, duration: "60 минут", format: "Группа", trialPrice: "600 ₽", visible: true })),
  tariffs: {
    basic: { label: "Взрослый базовый", title: "Занятия на коврике", note: "Для функционального тренинга, йоги, пилатеса, здоровой спины, восстановления после родов, стретчинга и скульптора тела.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 200 ₽"], ["4 занятия", "4 000 ₽"], ["6 занятий", "5 700 ₽"], ["8 занятий", "6 900 ₽"], ["12 занятий", "9 900 ₽"], ["Индивидуальное", "3 000 ₽"], ["Парное", "4 000 ₽"]] },
    air: { label: "Взрослый воздушный", title: "Занятия в воздухе", note: "Только для фитнеса на полотнах и аэростретчинга в гамаках. Группы до 5 человек.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 400 ₽"], ["4 занятия", "4 400 ₽"], ["6 занятий", "6 500 ₽"], ["8 занятий", "8 000 ₽"], ["12 занятий", "10 800 ₽"], ["Индивидуальное", "3 000 ₽"], ["Парное", "4 000 ₽"]] },
    kids: { label: "Детский тариф", title: "Воздушная гимнастика", note: "Для детских групп, парных и индивидуальных занятий на воздушных снарядах.", prices: [["Пробное", "600 ₽"], ["Разовое", "1 000 ₽"], ["4 занятия", "3 500 ₽"], ["6 занятий", "5 100 ₽"], ["8 занятий", "6 500 ₽"], ["12 занятий", "9 500 ₽"], ["Индивидуальное", "2 800 ₽"], ["Парное", "3 500 ₽"]] },
  },
};

defaultSiteContent.directions.push({ id: "kids-aerial", title: "Воздушная гимнастика", text: "Нескучные занятия на воздушных снарядах развивают силу, гибкость, координацию и создают хорошую физическую базу для любого спорта.", audience: "Дети", priceKind: "kids", image: "https://images.squarespace-cdn.com/content/v1/62c63e966ea22529c1e3c084/83117d5e-4a20-4d3d-b764-9035819609b2/IMG_0070.jpeg", duration: "60 минут", format: "Группа", trialPrice: "600 ₽", visible: true });

export function cloneDefaultContent(): SiteContent {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}

export function readLocalContent(): SiteContent {
  if (typeof window === "undefined") return cloneDefaultContent();
  try {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    return saved ? { ...cloneDefaultContent(), ...JSON.parse(saved) } as SiteContent : cloneDefaultContent();
  } catch {
    return cloneDefaultContent();
  }
}

export function saveLocalContent(content: SiteContent) {
  window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT));
}
