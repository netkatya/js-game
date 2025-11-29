"use client";

import { useState, useEffect } from "react";
import { InputTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import DotGrid from "@/components/Dots/Dots";
import { saveProgress } from "@/utils/save";
import { useTranslation } from "react-i18next";

export default function LevelTwo() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<InputTask[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // --- LANGUAGE DETECTOR ---
  const getLang = () =>
    (typeof window !== "undefined" && localStorage.getItem("quizLang")) || "en";

  // --- LOAD QUESTIONS BY LANGUAGE ---
  const loadQuestions = async () => {
    setLoading(true);
    const lang = getLang();
    try {
      const res = await fetch(`/data/${lang}/level2.json`);
      const data = await res.json();
      setQuestions(data);
    } catch (e) {
      console.error("Error loading questions:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  // Listen for language change
  useEffect(() => {
    const handler = () => loadQuestions();
    window.addEventListener("quiz-lang-change", handler);
    return () => window.removeEventListener("quiz-lang-change", handler);
  }, []);

  // Reset input on question change
  useEffect(() => {
    setUserInput("");
    setValidationStatus("idle");
    setAttemptsLeft(2);
  }, [currentQuestionIndex]);

  // Restore progress after questions loaded
  useEffect(() => {
    if (!questions.length) return;

    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      const levelProgress = progressData?.progress?.levelTwo;
      if (levelProgress) {
        const savedIndex = levelProgress.question || 0;
        const savedRight = levelProgress.rightAnswers || 0;
        const savedWrong = levelProgress.wrongAnswers || 0;
        const totalAnswers = savedRight + savedWrong;

        if (totalAnswers === 0) {
          setCurrentQuestionIndex(0);
        } else {
          const nextIndex = savedIndex + 1;
          if (nextIndex >= questions.length) {
            setIsLevelComplete(true);
          } else {
            setCurrentQuestionIndex(nextIndex);
          }
        }

        setRightAnswers(savedRight);
        setWrongAnswers(savedWrong);
      }
    }
  }, [questions]);

  const showToast = (message: string, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  if (loading)
    return (
      <p className="text-white text-xl text-center mt-10">{t("loading")}</p>
    );
  if (!questions.length)
    return (
      <p className="text-red-400 text-xl text-center mt-10">
        {t("no_questions")}
      </p>
    );
  if (isLevelComplete) return <LevelComplete level="2" route="levelThree" />;

  const question = questions[currentQuestionIndex];

  const handleCheckAnswer = () => {
    if (
      question.answer &&
      userInput.trim().toLowerCase() === question.answer.toLowerCase()
    ) {
      const updatedRight = rightAnswers + 1;
      setRightAnswers(updatedRight);
      setValidationStatus("correct");
      showToast(`✅ ${t("toastCorrect")}!`);
      saveProgress(currentQuestionIndex, updatedRight, wrongAnswers, "Two");
    } else {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      setValidationStatus("incorrect");
      showToast(
        `❌ ${t("incorrect")}. ${newAttempts} ${t("toastLeftAttempts")}`
      );
      if (newAttempts === 0) {
        const updatedWrong = wrongAnswers + 1;
        setWrongAnswers(updatedWrong);
        showToast(`❌ ${t("toastNoAttempts")}`);
        saveProgress(currentQuestionIndex, rightAnswers, updatedWrong, "Two");
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    if (validationStatus === "incorrect") setValidationStatus("idle");
  };

  const getInputClasses = () => {
    const base =
      "w-full p-3 bg-slate-700 text-white rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
    if (validationStatus === "correct") return base + " border-green-500";
    if (validationStatus === "incorrect")
      return (
        base +
        (attemptsLeft === 0
          ? " border-red-500 cursor-not-allowed"
          : " border-red-500")
      );
    return base + " border-slate-600";
  };

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
          className={`absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white text-lg font-medium shadow-lg ${toast.startsWith("✅") ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast}
        </div>
      )}

      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">{t("levelTwo")}</h1>
            <p className="text-lg font-semibold text-yellow-400 mb-4">
              {t("attempts")} {attemptsLeft}
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
              type="text"
              className={getInputClasses()}
            />
            {attemptsLeft === 0 && validationStatus === "incorrect" && (
              <p className="text-center text-green-400 mt-2">
                {t("correct")} <strong>{question.answer}</strong>
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-row-reverse font-semibold text-xl">
            {currentQuestionIndex + 1}/{questions.length}
          </div>

          <div className="mt-8 text-center h-14">
            {validationStatus === "correct" || attemptsLeft === 0 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
              >
                {t("next")}
              </button>
            ) : (
              <button
                onClick={handleCheckAnswer}
                disabled={!userInput}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t("check")}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
