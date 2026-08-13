import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mikhailstand.github.io/up_studio/"),
  title: "Ввысь — студия фитнеса и воздушной гимнастики в Королёве",
  description: "Фитнес, йога, пилатес, стретчинг и воздушная гимнастика для детей и взрослых в мини-группах.",
  icons: {
    icon: [{ url: "/favicon-vvys-v3.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/favicon-vvys-v3.png",
    apple: [{ url: "/favicon-vvys-v3.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: "Ввысь — фитнес для взрослых и детей",
    description: "Фитнес, йога, пилатес и воздушная гимнастика в Королёве",
    type: "website",
    locale: "ru_RU",
    siteName: "Студия «Ввысь»",
    images: [{ url: "https://mikhailstand.github.io/up_studio/og-vvys-v1.png", width: 1732, height: 908, alt: "Студия Ввысь — фитнес для взрослых и детей в Королёве" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ввысь — фитнес для взрослых и детей",
    description: "Фитнес, йога, пилатес и воздушная гимнастика в Королёве",
    images: ["https://mikhailstand.github.io/up_studio/og-vvys-v1.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
