import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com/"),
  title: "Студия пилатеса — занятия для взрослых и детей",
  description: "Пилатес, фитнес, растяжка и занятия для детей и взрослых в мини-группах.",
  icons: {
    icon: [{ url: "/favicon-studio.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon-studio.svg",
  },
  openGraph: {
    title: "Студия пилатеса — занятия для взрослых и детей",
    description: "Пилатес, фитнес и растяжка в камерной студии",
    type: "website",
    locale: "ru_RU",
    siteName: "Студия пилатеса",
  },
  twitter: {
    card: "summary",
    title: "Студия пилатеса",
    description: "Пилатес, фитнес и растяжка в камерной студии",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><head><link rel="mask-icon" href="/favicon-studio.svg" color="#123f36" /></head><body>{children}</body></html>;
}
