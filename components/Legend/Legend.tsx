"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Legend() {
  const { t } = useTranslation();
  return (
    <section
      className="scroll-mt-[100px] md:scroll-mt-[50px] p-[20px] md:p-[40px] flex justify-center"
      id="legend"
    >
      <div className="bg-[#079cde] max-w-[1127px] p-[20px] flex jystify-center items-center gap-[40px] rounded-[40px]">
        <div className="max-w-[540px] flex flex-col gap-[8px] md:gap-[4px] justify-center items-center">
          <h2 className="third-font font-semibold text-xl md:text-3xl text-center text-black max-w-[350px]">
            {t("title")}
          </h2>
          <div className="p-[16px] border border-black">
            <p className="third-font font-semibold text-[16px] md:text-2xl text-center text-black">
              {t("p1_start")}
              <br /> {t("p1_end")}
            </p>
          </div>
          <p className="third-font font-semibold text-[16px] md:text-2xl text-center text-black">
            {t("p2")}
          </p>
          <p className="third-font font-semibold text-[16px] md:text-2xl text-center text-black italic">
            {t("quote")}
          </p>
        </div>
        <div className="hidden md:flex md:w-[360px] md:h-[560px] bg-[#000017] justify-center items-center rounded-[16px]">
          <Image
            src="/img/robot-legend.webp"
            width={300}
            height={450}
            alt={t("alt")}
            className="hidden md:block w-[320px] h-auto object-contain"
          ></Image>
        </div>
      </div>
    </section>
  );
}
