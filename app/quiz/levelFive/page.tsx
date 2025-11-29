"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DotGrid from "@/components/Dots/Dots";
import { saveProgress } from "@/utils/save";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import { useTranslation } from "react-i18next";

const MonacoEditor = dynamic(
  () => import("../../../components/Monaco/MonacoEditor"),
  { ssr: false }
);

type Question = {
  question: string;
  default: string;
  solution: string;
};

export default function LevelFivePage() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [code, setCode] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  // --- LANGUAGE DETECTOR ---
  const getLang = () =>
    (typeof window !== "undefined" && localStorage.getItem("quizLang")) || "EN";

  // --- LOAD QUESTIONS ---
  const loadQuestions = async () => {
    try {
      const lang = getLang();
      const res = await fetch(`/data/${lang}/level5.json`);
      const data: Question[] = await res.json();

      setQuestions(data);
      setCode(data[0]?.default || "");

      restoreProgress(data);
    } catch (err) {
      console.error("Error loading Level 5:", err);
    }
  };

  // Load once
  useEffect(() => {
    loadQuestions();
  }, []);

  // Re-load on language change
  useEffect(() => {
    const handler = () => loadQuestions();
    window.addEventListener("quiz-lang-change", handler);
    return () => window.removeEventListener("quiz-lang-change", handler);
  }, []);

  // --- RESTORE PROGRESS ---
  const restoreProgress = (data: Question[]) => {
    const raw = localStorage.getItem("quizProgress");
    if (!raw) return;

    const prog = JSON.parse(raw);
    const level = prog?.progress?.levelFive;
    if (!level) return;

    const savedIndex = level.question || 0;
    const savedRight = level.rightAnswers || 0;
    const savedWrong = level.wrongAnswers || 0;

    const next = savedRight + savedWrong > 0 ? savedIndex + 1 : 0;

    if (next >= data.length) {
      setIsLevelComplete(true);
      return;
    }

    setCurrentIndex(next);
    setRightAnswers(savedRight);
    setWrongAnswers(savedWrong);
    setCode(data[next].default || "");
  };

  // --- SHOW TOAST ---
  const showToast = (msg: string, dur = 2000) => {
    setToast(msg);
    setTimeout(() => setToast(null), dur);
  };

  // --- NEXT QUESTION ---
  const handleNext = () => {
    setIsSwitching(false);
    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
      setCode(questions[nextIndex].default || "");
      setAttempts(3);
      setToast(null);
    } else {
      setIsLevelComplete(true);
    }
  };

  // --- VALIDATE ---
  const handleValidate = async () => {
    if (loading || isSwitching) return;

    setLoading(true);
    setToast(null);

    const isLast = currentIndex === questions.length - 1;

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          solution: questions[currentIndex].solution,
        }),
      });

      const data = await res.json();

      if (data.message.startsWith("✅")) {
        const updatedRight = rightAnswers + 1;
        setRightAnswers(updatedRight);

        saveProgress(currentIndex, updatedRight, wrongAnswers, "Five");

        if (isLast) {
          showToast(`✅ ${t("finalLevelComplete")}`);
          setTimeout(() => setIsLevelComplete(true), 1500);

          const raw = localStorage.getItem("quizProgress") || "{}";
          const prog = JSON.parse(raw);
          prog.lastActiveLevel = "final";

          localStorage.setItem("quizProgress", JSON.stringify(prog));
        } else {
          setIsSwitching(true);
          showToast(`✅ ${t("goingNextQuestion")}`);
          setTimeout(handleNext, 1500);
        }

        return;
      }

      // ❌ Incorrect
      const remaining = attempts - 1;
      setAttempts(remaining);

      if (remaining > 0) {
        showToast(
          `❌ ${t("incorrect")}. ${t("you")} ${remaining} ${t("youAttempts")}`
        );
      } else {
        const updatedWrong = wrongAnswers + 1;
        setWrongAnswers(updatedWrong);

        saveProgress(currentIndex, rightAnswers, updatedWrong, "Five");

        setCode(questions[currentIndex].solution);

        if (isLast) {
          showToast(`❌ ${t("noAttemptsComplete")}`);
          setTimeout(() => setIsLevelComplete(true), 2500);
        } else {
          setIsSwitching(true);
          showToast(`❌ ${t("noAttemptsNext")}`);
          setTimeout(handleNext, 2500);
        }
      }
    } catch (e) {
      showToast(`❌ ${t("serverProblem")}`);
    } finally {
      setLoading(false);
    }
  };

  // UI
  if (isLevelComplete) {
    return <LevelComplete level="5" route="final" />;
  }

  if (!questions.length) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white text-xl">
        {t("loading")}
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
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

      {/* Toast */}
      {toast && (
        <div
          className={`absolute top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl text-white text-lg font-medium shadow-lg ${
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

      <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
        <div className="p-4 bg-gray-800 rounded-lg text-white w-full text-xl font-semibold text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-left">
            {t("levelFiveTitle")}
          </h1>
          <strong>{t("task")}</strong> {questions[currentIndex].question}
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
            loading || isSwitching ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {loading ? `${t("checking")}` : `${t("checkSolution")}`}
        </button>
      </div>
    </main>
  );
}
