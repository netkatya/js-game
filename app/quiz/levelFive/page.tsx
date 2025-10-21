"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import questions from "../../data/level5.json";
import DotGrid from "@/components/Dots/Dots";
import { saveProgress } from "@/utils/save";
import { useRouter } from "next/navigation";

const MonacoEditor = dynamic(
  () => import("../../../components/Monaco/MonacoEditor"),
  { ssr: false }
);

export default function Level5Page() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState(questions[currentIndex].default);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelFive"]) {
        const levelProgress = progressData.progress["levelFive"];
        const savedIndex = levelProgress.question || 0;
        const savedRight = levelProgress.rightAnswers || 0;
        const savedWrong = levelProgress.wrongAnswers || 0;
        const totalAnswers = savedRight + savedWrong;

        let nextQuestionIndex = 0;
        if (totalAnswers > 0) {
          nextQuestionIndex = savedIndex + 1;
        }
        if (nextQuestionIndex >= questions.length) {
          setIsLevelComplete(true);
        } else {
          setCurrentIndex(nextQuestionIndex);
          setCode(questions[nextQuestionIndex].default || "");
          setRightAnswers(savedRight);
          setWrongAnswers(savedWrong);
        }
      }
    }
  }, []);
  useEffect(() => {
    if (isLevelComplete) {
      router.push("/final");
    }
  }, [isLevelComplete, router]);

  const handleNext = () => {
    setIsSwitching(false);
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setCode(questions[nextIndex].default);
    setToast(null);
    setAttempts(3);
  };

  const showToast = (message: string, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };

  const handleValidate = async () => {
    if (loading || isSwitching) return;
    setLoading(true);
    setToast(null);

    const isLastQuestion = currentIndex === questions.length - 1;

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
        const updatedRightAnswers = rightAnswers + 1;
        setRightAnswers(updatedRightAnswers);
        saveProgress(currentIndex, updatedRightAnswers, wrongAnswers, "Five");

        if (isLastQuestion) {
          showToast("✅ Excellent! Final level complete!");
          setTimeout(() => setIsLevelComplete(true), 1500);
        } else {
          setIsSwitching(true);
          showToast("✅ Correct! Moving to next question...");
          setTimeout(handleNext, 1500);
        }
        return;
      }

      if (data.message.startsWith("❌")) {
        const remaining = attempts - 1;
        setAttempts(remaining);

        if (remaining > 0) {
          showToast(`❌ Incorrect. You have ${remaining} attempt(s) left.`);
        } else {
          const updatedWrongAnswers = wrongAnswers + 1;
          setWrongAnswers(updatedWrongAnswers);
          saveProgress(currentIndex, rightAnswers, updatedWrongAnswers, "Five");
          setCode(questions[currentIndex].solution);

          if (isLastQuestion) {
            showToast("❌ No attempts left. Final level complete.");
            setTimeout(() => setIsLevelComplete(true), 2500);
          } else {
            setIsSwitching(true);
            showToast("❌ No attempts left. Moving to next question...");
            setTimeout(handleNext, 2500);
          }
        }
      }
    } catch (err) {
      showToast("❌ Server connection error");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
        <div className="p-2 md:p-4 bg-gray-800 rounded-lg text-white w-full text-xl font-semibold text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-left">
            Level 5: Debugging
          </h1>
          <strong>Task:</strong> {questions[currentIndex].question}
          <div className="w-full mt-2 md:mt-4">
            <MonacoEditor value={code} onChange={setCode} />
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>

        <button
          onClick={handleValidate}
          disabled={loading || isSwitching}
          className={`bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl ${loading || isSwitching ? "pointer-events-none opacity-50" : ""}`}
          aria-label="check button"
        >
          {loading ? "Checking..." : "Check Solution"}
        </button>
      </div>
    </main>
  );
}
