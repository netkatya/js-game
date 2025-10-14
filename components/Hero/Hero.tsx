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

      // --- ОСНОВНА ЛОГІКА ---
      // Перевіряємо, чи є запис про останній активний рівень
      if (progressData.lastActiveLevel) {
        // Створюємо посилання, наприклад: "quiz/level1"
        setContinueLink(`quiz/${progressData.lastActiveLevel}`);
      }
    }
  }, []);

  const startNewGameClick = () => {
    localStorage.removeItem("quizProgress");
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-[40px] mb-[105px] mt-[60px]">
        <div className="relative w-[500px] h-[500px] overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <video
            src="/gif/robot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          >
            Ваш браузер не підтримує відео тег.
          </video>
        </div>

        <div className="font-semibold text-center w-[561px] h-[446px] mb-[40px]">
          <div className="h-[200px]">
            <TextType
              text={[
                `Hello, human...\nMy name is A.R.I. — Artificial Robotic Instructor.\nI know JavaScript, but I cannot think like a programmer.\nWill you teach me?`,
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl text-white whitespace-pre-wrap font-semibold"
            />
          </div>
          <ul className="flex flex-col items-center gap-[24px] font-semibold text-[40px] text-center mt-[40px]">
            <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px]">
              <button onClick={startNewGameClick}>
                {/* Посилання на перший рівень для початку нової гри */}
                <Link href="quiz/levelOne">Start training</Link>
              </button>
            </li>
            <li
              className={`border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px] ${
                !progress ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button disabled={!progress}>
                {/* --- ЗМІНА ТУТ --- */}
                {/* Тепер href береться зі стану continueLink */}
                <Link href={continueLink}>Continue</Link>
              </button>
            </li>
            {/* <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px] ">
          <Link href="#">Settings</Link>
        </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
