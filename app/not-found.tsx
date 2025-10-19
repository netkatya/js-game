import { Metadata } from "next";
import css from "./not-found.module.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "This page doesn'n exist",
  openGraph: {
    title: "404 | Page Not Found",
    description: "This page doesn'n exist",
    url: "https://js-game-seven-indol.vercel.app/not-found",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub Logo",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <div className="w-[900px] h-[600px] m-auto">
        <Image
          src="/img/crying-404.png"
          width={1100}
          height={600}
          alt="page not found"
        ></Image>
      </div>
    </>
  );
}
