"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TextType from "../TextType/TextType";

// Додамо тип для даних, що зберігаються, для кращої читабельності
interface ProgressData {
  lastActiveLevel: string;
  progress: {
    [key: string]: number | string;
  };
}

export default function Hero() {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  // Новий стан для зберігання динамічного посилання на останню гру
  const [continueLink, setContinueLink] = useState<string>("#");

  useEffect(() => {
    const savedProgress = localStorage.getItem("quizProgress");
    if (savedProgress) {
      const progressData: ProgressData = JSON.parse(savedProgress);
      setProgress(progressData);
      if (progressData.lastActiveLevel) {
        setContinueLink(`quiz/${progressData.lastActiveLevel}`);
      }
    }
  }, []);

  const startNewGameClick = () => {
    localStorage.removeItem("quizProgress");
  };

  return (
    <section className="pt-[40px] md:pt-[80px] pb-[20px] md:pb-[60px]">
      <div className="flex items-center justify-center gap-[24px] md:gap-[40px] pl-[10px] pr-[10px] md:pl-[20px] md:pr-[20px]">
        <div className="relative w-1/3 min-w-[180px] h-[278px] md:w-[540px] md:h-[540px] overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <video
            src="/gif/robot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          >
            Can &apos;t open with your browser
          </video>
        </div>

        <div className="font-semibold text-center w-[561px] h-[446px] mb-0 md:mb-[40px] md:w-[561px] md:h-[446px] w-auto h-auto">
          <div className="w-[140px] h-[190px] md:w-[513px] md:h-[200px]">
            <TextType
              text={[
                `Hello, human...\nMy name is A.R.I. — Artificial Robotic Instructor.\nI know JavaScript, but I cannot think like a programmer.\nWill you teach me?`,
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-[15px] md:text-3xl text-white whitespace-pre-wrap font-semibold"
            />
          </div>
          <ul className="flex flex-col items-center gap-[8px] md:gap-6 font-semibold text-[40px] text-center mt-0 md:mt-10">
            <li className="w-[140px] md:w-[543px]">
              <Link
                href="quiz/levelOne"
                onClick={startNewGameClick}
                className="block w-full p-2 md:p-3 text-center border-2 md:border-3 border-solid border-[#079cde] rounded-xl md:rounded-[6px] 
       text-[15px] md:text-[40px] transition-shadow duration-300 hover:shadow-[0_0_20px_#079CDE]"
              >
                Start training
              </Link>
            </li>

            <li
              className={`w-[140px] md:w-[543px] ${
                !progress || progress?.lastActiveLevel === "Completed"
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
            >
              <Link
                href={continueLink}
                className="block w-full p-2 md:p-3 text-center border-2 md:border-3 border-solid border-[#079cde] rounded-xl md:rounded-[6px] 
       text-[15px] md:text-[40px] transition-shadow duration-300 hover:shadow-[0_0_20px_#079CDE]"
              >
                Continue
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
