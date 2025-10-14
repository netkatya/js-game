"use client";
import level2Data from "@/app/data/level2.json";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";

export default function LevelTwo() {
  const router = useRouter();
  const questions: InputTask[] = level2Data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelTwo"]) {
        setCurrentQuestionIndex(progressData.progress["levelTwo"]);
      }
    }
  }, []);

  const saveProgress = (questionIndex: number) => {
    const rawProgress = localStorage.getItem("quizProgress") || "{}";
    const progressData = JSON.parse(rawProgress);
    if (!progressData.progress) {
      progressData.progress = {};
    }
    progressData.lastActiveLevel = "levelTwo";
    progressData.progress["levelTwo"] = questionIndex;
    localStorage.setItem("quizProgress", JSON.stringify(progressData));
  };

  const question = questions[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (userInput.trim().toLowerCase() === question.answer.toLowerCase()) {
      setValidationStatus("correct");
    } else {
      setValidationStatus("incorrect");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      saveProgress(nextIndex);
      setUserInput("");
      setValidationStatus("idle");
    } else {
      setIsLevelComplete(true);
      const rawProgress = localStorage.getItem("quizProgress");
      if (rawProgress) {
        const progressData = JSON.parse(rawProgress);
        progressData.lastActiveLevel = "levelThree";
        progressData.progress.levelThree = 0;
        localStorage.setItem("quizProgress", JSON.stringify(progressData));
      }
    }
  };

  // --- ЗМІНА ТУТ ---
  // Тепер функція handleChange також скидає статус помилки,
  // як тільки користувач починає вводити новий текст.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    // Якщо статус був "неправильний", повертаємо його в "очікування"
    if (validationStatus === "incorrect") {
      setValidationStatus("idle");
    }
  };

  const getInputClasses = () => {
    const baseClasses =
      "w-full p-3 bg-slate-700 text-white rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
    if (validationStatus === "correct") {
      return `${baseClasses} border-green-500`;
    }
    // Стиль для червоної рамки залишається, але тепер він зникає при введенні нового тексту
    if (validationStatus === "incorrect") {
      return `${baseClasses} border-red-500`;
    }
    return `${baseClasses} border-slate-600`;
  };

  if (isLevelComplete) {
    return <LevelComplete level="2" route="levelThree" />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Level 2: Inputs</h1>
          <h3 className="text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>
          <div className="space-y-4">
            <input
              value={userInput}
              onChange={handleChange}
              disabled={validationStatus === "correct"}
              id="userInput"
              type="text"
              name="userInput"
              className={getInputClasses()}
            />
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentQuestionIndex + 1}/{level2Data.length}
          </div>

          <div className="mt-8 text-center">
            {(validationStatus === "idle" ||
              validationStatus === "incorrect") && (
              <button
                onClick={handleCheckAnswer}
                disabled={!userInput}
                className={`  font-bold py-3 px-6 rounded-lg text-xl disabled:opacity-50 ${
                  !userInput ? "cursor-not-allowed" : ""
                } ${validationStatus === "incorrect" ? "bg-red-500 hover:bg-red-600" : "bg-cyan-500 hover:bg-cyan-600"}
                `}
              >
                {validationStatus === "incorrect" ? "Try again" : "Check"}
              </button>
            )}
            {validationStatus === "correct" && (
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 hover:bg-green-600 font-bold py-3 px-6 rounded-lg text-xl"
              >
                Next question
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
