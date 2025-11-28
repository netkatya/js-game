"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Levels() {
  const { t } = useTranslation();
  return (
    <section
      className="scroll-mt-[70px] md:scroll-mt-[50px] pt-[20px] md:pt-[60px] pb-[40px] flex justify-center"
      id="levels"
    >
      <div className="pl-[20px] pr-[20px] max-w-[1200px]">
        <h2 className="text-4xl md:text-8xl text-center mb-[16px] font-semibold">
          {t("levels_title")}
        </h2>
        <ul className="flex flex-col gap-[40px] md:gap-[80px]">
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level1.png"
              width={312}
              height={485}
              alt="level-one"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_type")} {t("level1_type")}
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_desc")}{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  {t("level1_desc")}
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                {t("label_goal")} {t("level1_goal")}
              </p>
            </div>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_type")} {t("level2_type")}
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_desc")}{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  {t("level2_desc")}
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                {t("label_goal")} {t("level2_goal")}
              </p>
            </div>
            <Image
              src="/img/level2.png"
              width={312}
              height={485}
              alt="level-two"
            ></Image>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level3.webp"
              width={312}
              height={485}
              alt="level-three"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_type")} {t("level3_type")}
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_desc")}{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  {t("level3_desc")}
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                {t("label_goal")} {t("level3_goal")}
              </p>
            </div>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_type")} {t("level4_type")}
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_desc")}{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  {t("level4_desc")}
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                {t("label_goal")} {t("level4_goal")}
              </p>
            </div>

            <Image
              src="/img/level4.webp"
              width={312}
              height={485}
              alt="level-four"
            ></Image>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level5.webp"
              width={312}
              height={485}
              alt="level-five"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_type")} {t("level5_type")}
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                {t("label_desc")}{" "}
                <span className="text-[16px] md:text-2xl font-normal text-center">
                  {t("level5_desc")}
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                {t("label_goal")} {t("level5_goal")}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
