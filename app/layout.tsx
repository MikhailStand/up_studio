import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mikhailstand.github.io/vvis_studio/"),
  title: "Ввысь — студия фитнеса и воздушной гимнастики в Королёве",
  description: "Фитнес, йога, пилатес, стретчинг и воздушная гимнастика для детей и взрослых в мини-группах.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ввысь — фитнес для всей семьи",
    description: "Современная студия фитнеса и воздушной гимнастики в Королёве",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "https://mikhailstand.github.io/vvis_studio/og-v21.png", width: 1536, height: 910, alt: "Студия Ввысь — фитнес для детей и взрослых" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ввысь — фитнес для всей семьи",
    description: "Фитнес и воздушная гимнастика в Королёве",
    images: ["https://mikhailstand.github.io/vvis_studio/og-v21.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
