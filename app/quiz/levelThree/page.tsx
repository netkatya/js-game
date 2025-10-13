"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import questions from "../../../app/data/level3.json";

const MonacoEditor = dynamic(
  () => import("../../../components/Monaco/MonacoEditor"),
  { ssr: false }
);

export default function MonacoWrapper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % questions.length;
    setCurrentIndex(nextIndex);
    setCode("");
    setStatus(null);
    setAttempts(3);
  };

  const handleValidate = async () => {
    if (loading) return;

    setLoading(true);
    setStatus(null);

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
      setStatus(data.message);

      if (data.message.startsWith("✅")) {
        setTimeout(() => handleNext(), 1200);
        return;
      }

      if (data.message.startsWith("❌")) {
        const remaining = attempts - 1;
        setAttempts(remaining);

        if (remaining > 0) {
          setStatus(`❌ Incorrect. You have ${remaining} attempt(s) left.`);
        } else {
          setStatus("❌ No attempts left. Moving to next question...");
          setTimeout(() => handleNext(), 2000);
        }
      }
    } catch (err) {
      setStatus("❌ Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 items-center w-full max-w-2xl mx-auto">
        <div className="p-4 bg-gray-800 rounded-lg text-white w-full text-xl font-semibold text-center">
          <h1 className="text-2xl font-bold mb-4 text-left">Level 3: Code</h1>
          <strong>Task:</strong> {questions[currentIndex].question}
          <div className="w-full mt-4">
            <MonacoEditor value={code} onChange={setCode} />
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentIndex + 1}/{questions.length}
          </div>
        </div>
        <button
          onClick={handleValidate}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
        >
          {loading ? "Checking..." : "Check Solution"}
        </button>

        {status && (
          <div
            className={`p-3 rounded-lg w-full text-center ${
              status.startsWith("✅")
                ? "bg-green-800 text-green-100"
                : status.startsWith("⚠️")
                  ? "bg-yellow-800 text-yellow-100"
                  : "bg-red-800 text-red-100"
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </main>
  );
}
