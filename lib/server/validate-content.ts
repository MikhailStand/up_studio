import type { SiteContent } from "../site-content";

const allowedKinds = new Set(["basic", "air", "kids"]);
const allowedAudiences = new Set(["Взрослые", "Дети"]);

function clean(value: unknown, max: number) {
  if (typeof value !== "string") throw new Error("Некорректное текстовое поле");
  return value.trim().slice(0, max);
}

function imageUrl(value: unknown) {
  const url = clean(value, 1600);
  if (!url) return "";
  const parsed = new URL(url, "http://localhost");
  if (!(["http:", "https:"].includes(parsed.protocol) || url.startsWith("/uploads/"))) throw new Error("Некорректная ссылка на фотографию");
  return url;
}

export function validateContent(input: unknown): SiteContent {
  if (!input || typeof input !== "object") throw new Error("Некорректные данные");
  const candidate = input as SiteContent;
  if (!candidate.copy || !Array.isArray(candidate.directions) || !candidate.tariffs) throw new Error("Не хватает обязательных разделов");
  if (candidate.directions.length > 40) throw new Error("Слишком много направлений");

  const copy = Object.fromEntries(Object.entries(candidate.copy).map(([key, value]) => [key, clean(value, key === "address" ? 140 : 320)])) as SiteContent["copy"];
  const directions = candidate.directions.map((item) => {
    if (!item || !allowedKinds.has(item.priceKind) || !allowedAudiences.has(item.audience)) throw new Error("Некорректная карточка направления");
    return {
      id: clean(item.id, 80), title: clean(item.title, 70), text: clean(item.text, 260), audience: item.audience,
      priceKind: item.priceKind, image: imageUrl(item.image), duration: clean(item.duration, 20), format: clean(item.format, 20),
      trialPrice: clean(item.trialPrice, 15), visible: Boolean(item.visible),
    };
  });
  const tariffs = Object.fromEntries((["basic", "air", "kids"] as const).map((kind) => {
    const item = candidate.tariffs[kind];
    if (!item || !Array.isArray(item.prices) || item.prices.length > 20) throw new Error("Некорректный тариф");
    return [kind, { label: clean(item.label, 50), title: clean(item.title, 50), note: clean(item.note, 240), prices: item.prices.map(([label, price]) => [clean(label, 35), clean(price, 15)] as [string, string]) }];
  })) as SiteContent["tariffs"];
  return { copy, directions, tariffs };
}
