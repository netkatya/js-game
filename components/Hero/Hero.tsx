"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      <div className="flex items-center justify-center mb-[105px]">
        <video
          src="/gif/robot.mp4"
          autoPlay
          loop
          muted
          playsInline
          className=" w-[600px] h-[600px] mt-[40px]"
        >
          Ваш браузер не підтримує відео тег.
        </video>
        <div className="font-semibold text-center w-[561px] h-[446px]">
          <p className="text-white text-lg md:text-xl font-mono whitespace-pre-wrap">
            Hello, human...
            <br />
            My name is A.R.I. — Artificial Robotic Instructor.
            <br />
            I know JavaScript, but I cannot think like a programmer.
            <br />
            Will you teach me?
          </p>
          {/* <h1 className="text-[128px] ">A.R.I</h1>
          <p className="text-[64px]">Artificial Robotic Instructor</p> */}
        </div>
      </div>
      <ul className="flex flex-col items-center gap-[24px] font-semibold text-[40px] text-center">
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
        <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px] ">
          <Link href="#">Settings</Link>
        </li>
      </ul>
    </div>
  );
}
