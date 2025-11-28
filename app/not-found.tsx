"use client";

export const dynamic = "force-dynamic";

import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <div className="max-w-[900px] max-h-[600px] m-auto">
        <Image
          src="/img/crying-404.png"
          width={1100}
          height={600}
          alt="Page not found"
        />
      </div>
    </>
  );
}
