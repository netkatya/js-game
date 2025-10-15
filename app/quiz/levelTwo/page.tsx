"use client";
import level2Data from "@/app/data/level2.json";
import { useState, useEffect } from "react";
import { InputTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";

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

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelTwo"]) {
        const levelProgress = progressData.progress["levelTwo"];
        setCurrentQuestionIndex(levelProgress.question || 0);
        setRightAnswers(levelProgress.rightAnswers || 0);
        setWrongAnswers(levelProgress.wrongAnswers || 0);
      }
    }
  }, []);

  useEffect(() => {
    setUserInput("");
    setValidationStatus("idle");
    setAttemptsLeft(2);
  }, [currentQuestionIndex]);

  const saveProgress = (
    questionIndex: number,
    finalRight: number,
    finalWrong: number
  ) => {
    const rawProgress = localStorage.getItem("quizProgress") || "{}";
    const progressData = JSON.parse(rawProgress);
    if (!progressData.progress) {
      progressData.progress = {};
    }
    progressData.lastActiveLevel = "levelTwo";
    progressData.progress["levelTwo"] = {
      question: questionIndex,
      rightAnswers: finalRight,
      wrongAnswers: finalWrong,
    };
    localStorage.setItem("quizProgress", JSON.stringify(progressData));
  };

  const question = questions[currentQuestionIndex];

  // ✅ ВИПРАВЛЕНА ЛОГІКА ПЕРЕВІРКИ ТА ЗБЕРЕЖЕННЯ
  const handleCheckAnswer = () => {
    if (userInput.trim().toLowerCase() === question.answer.toLowerCase()) {
      const updatedRightAnswers = rightAnswers + 1;
      setRightAnswers(updatedRightAnswers);
      setValidationStatus("correct");
      // Зберігаємо прогрес одразу після правильної відповіді
      saveProgress(currentQuestionIndex, updatedRightAnswers, wrongAnswers);
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      setValidationStatus("incorrect");
      if (newAttemptsLeft === 0) {
        const updatedWrongAnswers = wrongAnswers + 1;
        setWrongAnswers(updatedWrongAnswers);
        // Зберігаємо прогрес, коли закінчились спроби
        saveProgress(currentQuestionIndex, rightAnswers, updatedWrongAnswers);
      }
    }
  };

  // ✅ СПРОЩЕНА ЛОГІКА ПЕРЕХОДУ
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
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
            {attemptsLeft === 0 && validationStatus === "incorrect" && (
              <p className="text-center text-green-400">
                Correct answer: <strong>{question.answer}</strong>
              </p>
            )}
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
