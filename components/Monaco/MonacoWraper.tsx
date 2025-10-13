"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import questions from "../../app/data/level3.json";

const MonacoEditor = dynamic(() => import("./MonacoEditor"), { ssr: false });

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
    <div className="flex flex-col gap-4 items-center w-full max-w-[500px] mx-auto">
      <div className="p-4 bg-gray-800 rounded-lg text-white w-full">
        <strong>Task:</strong> {questions[currentIndex].question}
      </div>

      <div className="w-full">
        <MonacoEditor value={code} onChange={setCode} />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleValidate}
          disabled={loading}
          className="border-3 p-[12px] border-solid border-[#079cde] w-[240px] transition hover:translate-y-[-5px]"
        >
          {loading ? "Checking..." : "Check Solution"}
        </button>

        {/* <button
          onClick={handleNext}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-xl"
        >
          Next Task
        </button> */}
      </div>

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
  );
}
