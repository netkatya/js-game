import type { Metadata } from "next";
import { Kelly_Slab, Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Providers from "@/components/Providers/Providers";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${kellySlab.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
