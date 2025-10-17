"use client";
import level2Data from "@/app/data/level2.json";
import { useState, useEffect } from "react";
import { InputTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import DotGrid from "@/components/Dots/Dots";
import { saveProgress } from "@/const/save";

export default function LevelTwo() {
  const questions: InputTask[] = level2Data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [attemptsLeft, setAttemptsLeft] = useState<number>(2);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelTwo"]) {
        const levelProgress = progressData.progress["levelTwo"];
        setCurrentQuestionIndex(levelProgress.question + 1 || 0);
        setRightAnswers(levelProgress.rightAnswers || 0);
        setWrongAnswers(levelProgress.wrongAnswers || 0);
      }
    }
  }, []);
  const showToast = (message: string, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };
  useEffect(() => {
    setUserInput("");
    setValidationStatus("idle");
    setAttemptsLeft(2);
  }, [currentQuestionIndex]);

  const question = questions[currentQuestionIndex];

  // ✅ ВИПРАВЛЕНА ЛОГІКА ПЕРЕВІРКИ ТА ЗБЕРЕЖЕННЯ
  const handleCheckAnswer = () => {
    if (userInput.trim().toLowerCase() === question.answer.toLowerCase()) {
      const updatedRightAnswers = rightAnswers + 1;
      setRightAnswers(updatedRightAnswers);
      setValidationStatus("correct");
      showToast("✅ Correct!");
      // Зберігаємо прогрес одразу після правильної відповіді
      saveProgress(
        currentQuestionIndex,
        updatedRightAnswers,
        wrongAnswers,
        "Two"
      );
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      showToast(`❌ Incorrect. You have ${newAttemptsLeft} attempt(s) left.`);
      setAttemptsLeft(newAttemptsLeft);
      setValidationStatus("incorrect");
      if (newAttemptsLeft === 0) {
        const updatedWrongAnswers = wrongAnswers + 1;
        setWrongAnswers(updatedWrongAnswers);
        showToast("❌ No attempts left. Look at the right answers");
        // Зберігаємо прогрес, коли закінчились спроби
        saveProgress(
          currentQuestionIndex,
          rightAnswers,
          updatedWrongAnswers,
          "Two"
        );
      }
    }
  };

  // ✅ СПРОЩЕНА ЛОГІКА ПЕРЕХОДУ
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setToast(null);
    } else {
      setIsLevelComplete(true);
      const rawProgress = localStorage.getItem("quizProgress") || "{}";
      const progressData = JSON.parse(rawProgress);
      progressData.lastActiveLevel = "levelThree";
      if (!progressData.progress.levelThree) {
        progressData.progress.levelThree = {
          question: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
        };
      }
      localStorage.setItem("quizProgress", JSON.stringify(progressData));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
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
    if (validationStatus === "incorrect") {
      if (attemptsLeft === 0) {
        return `${baseClasses} border-red-500 cursor-not-allowed`;
      }
      return `${baseClasses} border-red-500 `;
    }
    return `${baseClasses} border-slate-600`;
  };

  if (isLevelComplete) {
    return <LevelComplete level="2" route="levelThree" />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <DotGrid
          dotSize={9}
          gap={15}
          baseColor="#120953"
          activeColor="#1481F5"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      {toast && (
        <div
          className={`absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white text-lg font-medium shadow-lg transition-opacity duration-300 ${
            toast.startsWith("✅")
              ? "bg-green-600"
              : toast.startsWith("⚠️")
                ? "bg-yellow-600"
                : "bg-red-600"
          }`}
        >
          {toast}
        </div>
      )}
      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Level 2: Inputs</h1>
            <p className="text-lg font-semibold text-yellow-400 mb-4">
              Attempts left: {attemptsLeft}
            </p>
          </div>
          <h3 className="text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>
          <div className="space-y-4">
            <input
              value={userInput}
              onChange={handleChange}
              disabled={validationStatus === "correct" || attemptsLeft === 0}
              id="userInput"
              type="text"
              name="userInput"
              className={getInputClasses()}
            />
            <div
              className="mt-[10px] font-semibold text-xl"
              style={{ minHeight: "32px" }}
            >
              {attemptsLeft === 0 && validationStatus === "incorrect" ? (
                <p className="text-center text-green-400">
                  Correct answer: <strong>{question.answer}</strong>
                </p>
              ) : (
                <span>&nbsp;</span>
              )}
            </div>
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentQuestionIndex + 1}/{level2Data.length}
          </div>
          <div className="mt-8 text-center h-14">
            {validationStatus === "correct" || attemptsLeft === 0 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
              >
                Next question
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={!userInput}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
