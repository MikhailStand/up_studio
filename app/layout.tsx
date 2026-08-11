import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Вдохновение в пути — студия йоги в Королёве",
  description: "Бережная йога, женские практики, занятия для беременных и массаж в Королёве.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Вдохновение в пути",
    description: "Студия йоги в Королёве",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-v17.png", width: 1536, height: 910, alt: "Вдохновение в пути — занятия, массаж и абонементы" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Вдохновение в пути",
    description: "Студия йоги в Королёве",
    images: ["/og-v17.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
