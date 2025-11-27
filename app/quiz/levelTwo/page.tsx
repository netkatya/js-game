"use client";
import level2Data from "@/app/data/level2.json";
import { useState, useEffect } from "react";
import { InputTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import { useLevelLogic } from "@/hooks/useLevelLogic";
import { getInputClasses, saveProgress, showToast } from "@/utils/functions";
import Toast from "@/components/Toast/Toast";
export default function LevelTwo() {
  const questions: InputTask[] = level2Data;
  const {
    currentIndex,
    rightAnswers,
    wrongAnswers,
    isLevelComplete,
    setRightAnswers,
    setWrongAnswers,
    // saveProgress, // Використовуємо свою функцію з utils
    goToNextQuestionOrComplete,
  } = useLevelLogic({ levelId: "levelTwo", questionCount: questions.length });
  const [userInput, setUserInput] = useState<string>("");
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [attemptsLeft, setAttemptsLeft] = useState<number>(2);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setUserInput("");
    setValidationStatus("idle");
    setAttemptsLeft(2);
  }, [currentIndex]);

  if (isLevelComplete) {
    return <LevelComplete level="2" route="levelThree" />;
  }

  const question = questions[currentIndex];

  const handleCheckAnswer = () => {
    let finalRight = rightAnswers;
    let finalWrong = wrongAnswers;

    if (userInput.trim().toLowerCase() === question.answer.toLowerCase()) {
      finalRight++;
      setRightAnswers(finalRight);
      setValidationStatus("correct");
      showToast("✅ Correct!", setToast);
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      showToast(
        `❌ Incorrect. You have ${newAttemptsLeft} attempt(s) left.`,
        setToast
      );
      setAttemptsLeft(newAttemptsLeft);
      setValidationStatus("incorrect");
      if (newAttemptsLeft === 0) {
        finalWrong++;
        setWrongAnswers(finalWrong);
        showToast("❌ No attempts left. Look at the right answers", setToast);
      }
    }
    saveProgress(currentIndex, finalRight, finalWrong, "Two");
  };

  const handleNext = () => {
    setToast(null);
    goToNextQuestionOrComplete();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
    if (validationStatus === "incorrect") {
      setValidationStatus("idle");
    }
  };

  return (
    <div>
      <Toast toast={toast} />
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
              className={getInputClasses(validationStatus, attemptsLeft)}
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
            {currentIndex + 1}/{level2Data.length}
          </div>
          <div className="mt-8 text-center h-14">
            {validationStatus === "correct" || attemptsLeft === 0 ? (
              <button
                onClick={handleNext}
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
    </div>
  );
}
