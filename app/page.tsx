import Hero from "@/components/Hero/Hero";
import I18nProvider from "@/components/I18nProvider/I18nProvider";
import Legend from "@/components/Legend/Legend";
import Levels from "@/components/Levels/Levels";
import ScrollToTopButton from "@/components/ScrollToTopButton/ScrollToTopButton";
import { Metadata } from "next";
import { I18NProvider } from "next/dist/server/lib/i18n-provider";

export const metadata: Metadata = {
  title: "A.R.I. — Learn JavaScript",
  description:
    "Help A.R.I. learn human logic through interactive JavaScript challenges.",
  openGraph: {
    title: "A.R.I. — Learn JavaScript",
    description:
      "Interactive coding game where you teach an AI through JavaScript challenges.",
    url: "https://js-game-seven-indol.vercel.app/",
    siteName: "A.R.I. Game",
    images: [
      {
        url: "https://js-game-seven-indol.vercel.app/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "A.R.I. — JavaScript learning game",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A.R.I. — Learn JavaScript",
    description:
      "Train your coding skills with A.R.I. — the AI that learns from your logic.",
    images: ["https://js-game-seven-indol.vercel.app/img/og-image.png"],
  },
};

export default function App() {
  return (
    <main>
      <ScrollToTopButton />
      <I18nProvider>
        <Hero />
        <Legend />
        <Levels />
      </I18nProvider>
    </main>
  );
}
