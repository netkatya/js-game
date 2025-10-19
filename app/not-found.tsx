import { Metadata } from "next";
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
        url: "https://js-game-seven-indol.vercel.app/img/og-image.png",
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
      <div className="max-w-[900px] max-h-[600px] m-auto">
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
