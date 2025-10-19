import type { Metadata } from "next";
import { Kelly_Slab, Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-family",
  weight: ["300", "400", "500", "600", "700"],
});

const kellySlab = Kelly_Slab({
  subsets: ["latin"],
  variable: "--third-family",
  weight: ["400"],
});

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
        url: "/img/og-image.png",
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
    images: ["/img/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${kellySlab.variable} antialiased`}
      >
        {" "}
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
