"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import questions from "../../data/level5.json";
import { useLevelLogic } from "@/hooks/useLevelLogic";
import { saveProgress, showToast } from "@/utils/functions";
import Toast from "@/components/Toast/Toast";

const MonacoEditor = dynamic(
  () => import("../../../components/Monaco/MonacoEditor"),
  { ssr: false }
);

export default function Level5Page() {
  const router = useRouter();
  const {
    currentIndex,
    rightAnswers,
    wrongAnswers,
    isLevelComplete,
    setRightAnswers,
    setWrongAnswers,
    goToNextQuestionOrComplete,
  } = useLevelLogic({ levelId: "levelFive", questionCount: questions.length });
  const [code, setCode] = useState(questions[currentIndex]?.default || "");
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    if (isLevelComplete) {
      router.push("/final");
    }
  }, [isLevelComplete, router]);

  useEffect(() => {
    if (questions[currentIndex]) {
      setCode(questions[currentIndex].default || "");
    }
    setToast(null);
    setAttempts(3);
    setIsSwitching(false);
  }, [currentIndex]);

  const question = questions[currentIndex];

  const handleValidate = async () => {
    if (loading || isSwitching) return;
    setLoading(true);
    setToast(null);

    try {
      const res = await fetch("/api/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          solution: question.solution,
        }),
      });

      const data = await res.json();

      let finalRight = rightAnswers;
      let finalWrong = wrongAnswers;

      if (data.message.startsWith("✅")) {
        finalRight++;
        setRightAnswers(finalRight);
        showToast("✅ Correct! Moving...", setToast);
        setIsSwitching(true);
        saveProgress(currentIndex, finalRight, finalWrong, "Five");
        setTimeout(() => goToNextQuestionOrComplete(), 1500);
        return;
      }

      if (data.message.startsWith("❌")) {
        const remaining = attempts - 1;
        setAttempts(remaining);

        if (remaining > 0) {
          showToast(
            `❌ Incorrect. You have ${remaining} attempt(s) left.`,
            setToast
          );
        } else {
          finalWrong++;
          setWrongAnswers(finalWrong);
          showToast("❌ No attempts left. Moving...", setToast);
          setCode(question.solution);
          setIsSwitching(true);
          saveProgress(currentIndex, finalRight, finalWrong, "Five");
          setTimeout(() => goToNextQuestionOrComplete(), 2500);
        }
      }
    } catch (err) {
      showToast("❌ Server connection error", setToast);
    } finally {
      setLoading(false);
    }
  };

  // Показуємо "Loading..." поки навігація не відбулась
  if (isLevelComplete) {
    return (
      <main className="relative min-h-screen flex items-center justify-center p-4 text-white">
        Redirecting to results...
      </main>
    );
  }

  return (
    <div>
      <Toast toast={toast} />
      <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
        <div className="p-2 md:p-4 bg-gray-800 rounded-lg text-white w-full text-xl font-semibold text-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2 md:mb-4 text-left">
            Level 5: Debugging
          </h1>
          <strong>Task:</strong> {question.question}
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
          className={`bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl ${
            loading || isSwitching ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Checking..." : "Check Solution"}
        </button>
      </div>
    </div>
  );
}
