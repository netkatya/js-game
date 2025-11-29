"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DotGrid from "@/components/Dots/Dots";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import { saveProgress } from "@/utils/save";

type Question = {
  question: string;
  solution: string;
};

const MonacoEditor = dynamic(() => import("@/components/Monaco/MonacoEditor"), {
  ssr: false,
});

export default function Level3Page() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);

  const [isSwitching, setIsSwitching] = useState(false);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  // ---------------------------
  // LANGUAGE + LOADING
  // ---------------------------
  const getLang = () =>
    (typeof window !== "undefined" && localStorage.getItem("quizLang")) || "en";

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const lang = getLang();
      const res = await fetch(`/data/${lang}/level3.json`);
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error("Error loading Level 3:", err);
    }
    setLoadingQuestions(false);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    const handler = () => loadQuestions();
    window.addEventListener("quiz-lang-change", handler);
    return () => window.removeEventListener("quiz-lang-change", handler);
  }, []);

  // ---------------------------
  // RESTORE PROGRESS
  // ---------------------------
  useEffect(() => {
    if (!questions.length) return;

    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      const levelProgress = progressData?.progress?.levelThree;

      if (levelProgress) {
        const savedIndex = levelProgress.question || 0;
        const savedRight = levelProgress.rightAnswers || 0;
        const savedWrong = levelProgress.wrongAnswers || 0;

        const totalAnswers = savedRight + savedWrong;
        const nextIndex = totalAnswers > 0 ? savedIndex + 1 : 0;

        if (nextIndex >= questions.length) {
          setIsLevelComplete(true);
        } else {
          setCurrentIndex(nextIndex);
        }

        setRightAnswers(savedRight);
        setWrongAnswers(savedWrong);
      }
    }
  }, [questions]);

  // TOAST
  const showToast = (message: string, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  // NEXT QUESTION
  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCode("");
    setToast(null);
    setAttempts(3);
    setIsSwitching(false);
  };

  // NORMALIZATION FOR CHECK
  const normalize = (str: string) =>
    str.trim().replace(/\s+/g, " ").toLowerCase();

  // ---------------------------
  // VALIDATION
  // ---------------------------
  const handleValidate = async () => {
    if (loading || isSwitching) return;
    setLoading(true);
    setToast(null);

    const question = questions[currentIndex];

    const originalSolution = question.solution; // ← ОРИГИНАЛ ДЛЯ ПОКАЗА
    const isLast = currentIndex === questions.length - 1;

    // Сравнение через нормализацию
    if (normalize(code) === normalize(originalSolution)) {
      const updatedRight = rightAnswers + 1;
      setRightAnswers(updatedRight);
      saveProgress(currentIndex, updatedRight, wrongAnswers, "Three");

      if (isLast) {
        showToast("✅ Excellent! Level Complete!");
        setTimeout(() => setIsLevelComplete(true), 1500);

        const raw = localStorage.getItem("quizProgress") || "{}";
        const data = JSON.parse(raw);
        data.lastActiveLevel = "levelFour";
        if (!data.progress.levelFour) {
          data.progress.levelFour = {
            question: 0,
            rightAnswers: 0,
            wrongAnswers: 0,
          };
        }
        localStorage.setItem("quizProgress", JSON.stringify(data));
      } else {
        showToast("✅ Correct! Moving to the next question...");
        setIsSwitching(true);
        setTimeout(handleNext, 1500);
      }

      setLoading(false);
      return;
    }

    // INCORRECT
    const remaining = attempts - 1;
    setAttempts(remaining);

    if (remaining > 0) {
      showToast(`❌ Incorrect. You have ${remaining} attempt(s) left.`);
    } else {
      const updatedWrong = wrongAnswers + 1;
      setWrongAnswers(updatedWrong);

      saveProgress(currentIndex, rightAnswers, updatedWrong, "Three");

      // Показываем оригинальный правильный ответ (с большой буквы!)
      setCode(originalSolution);

      if (isLast) {
        showToast("❌ No attempts left. Level Complete.");
        setTimeout(() => setIsLevelComplete(true), 2000);
      } else {
        showToast("❌ No attempts left. Moving to next question...");
        setIsSwitching(true);
        setTimeout(handleNext, 2000);
      }
    }

    setLoading(false);
  };

  // ---------------------------
  // RENDER
  // ---------------------------
  if (loadingQuestions)
    return <p className="text-white text-xl text-center mt-10">Loading…</p>;

  if (!questions.length)
    return (
      <p className="text-red-400 text-xl text-center mt-10">
        No questions loaded
      </p>
    );

  if (isLevelComplete) return <LevelComplete level="3" route="levelFour" />;

  const question = questions[currentIndex];

  if (!question)
    return <p className="text-white text-center mt-10">Loading question…</p>;

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
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
          className={`absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white text-lg font-medium shadow-lg ${
            toast.startsWith("✅") ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
        <div className="p-4 bg-gray-800 rounded-lg text-white w-full text-xl font-semibold text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-left">
            Level 3: Code
          </h1>
          <strong>Task:</strong> {question.question}
          <div className="w-full mt-4">
            <MonacoEditor value={code} onChange={setCode} />
          </div>
          <div className="mt-4 flex flex-row-reverse font-semibold text-xl">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        <button
          onClick={handleValidate}
          disabled={loading || isSwitching}
          className={`bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl ${
            loading || isSwitching ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {loading ? "Checking..." : "Check Solution"}
        </button>
      </div>
    </main>
  );
}
