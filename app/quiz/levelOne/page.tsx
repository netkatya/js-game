"use client";

import { useState, useEffect, useCallback } from "react";
import { QuizTask } from "@/types/quiz";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import DotGrid from "@/components/Dots/Dots";
import { saveProgress } from "@/utils/save";
import { useTranslation } from "react-i18next";

export default function Level1Page() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState<QuizTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [rightAnswers, setRightAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // --- LANGUAGE DETECTOR ---
  const getLang = useCallback(
    () =>
      typeof window !== "undefined"
        ? localStorage.getItem("quizLang") || "en"
        : "en",
    []
  );

  // --- LOAD QUESTIONS BY LANGUAGE ---
  const loadQuestions = useCallback(async () => {
    setLoading(true);
    const lang = getLang();
    try {
      const res = await fetch(`/data/${lang}/level1.json`);
      const data = await res.json();
      setQuestions(data);
    } catch (e) {
      console.error("Error loading questions:", e);
    } finally {
      setLoading(false);
    }
  }, [getLang]);

  // Load questions on mount
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Listen to language change from LangSwitcher
  useEffect(() => {
    const handler = () => loadQuestions();
    window.addEventListener("quiz-lang-change", handler);
    return () => window.removeEventListener("quiz-lang-change", handler);
  }, [loadQuestions]);

  // Reset answer state on question change
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentQuestionIndex]);

  // After questions loaded — restore progress
  useEffect(() => {
    if (!questions.length) return;

    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelOne"]) {
        const levelOneProgress = progressData.progress["levelOne"];
        const nextQuestionIndex = (levelOneProgress.question || 0) + 1;

        if (nextQuestionIndex >= questions.length) {
          setIsLevelComplete(true);
        } else {
          setCurrentQuestionIndex(nextQuestionIndex);
        }

        setRightAnswers(levelOneProgress.rightAnswers || 0);
        setWrongAnswers(levelOneProgress.wrongAnswers || 0);
      }
    }
  }, [questions]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white text-xl">
        {t("loading")}
      </main>
    );
  }

  if (!questions.length) {
    return (
      <main className="min-h-screen flex items-center justify-center text-red-400 text-xl">
        {t("no_questions")}
      </main>
    );
  }

  const question = questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    let newRight = rightAnswers;
    let newWrong = wrongAnswers;

    if (option === question.answer) {
      newRight++;
      setRightAnswers(newRight);
    } else {
      newWrong++;
      setWrongAnswers(newWrong);
    }

    saveProgress(currentQuestionIndex, newRight, newWrong, "One");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setSelectedAnswer(null);
      setIsAnswered(false);
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsLevelComplete(true);

      const rawProgress = localStorage.getItem("quizProgress") || "{}";
      const progressData = JSON.parse(rawProgress);

      progressData.lastActiveLevel = "levelTwo";
      if (!progressData.progress.levelTwo) {
        progressData.progress.levelTwo = {
          question: 0,
          rightAnswers: 0,
          wrongAnswers: 0,
        };
      }

      localStorage.setItem("quizProgress", JSON.stringify(progressData));
    }
  };

  const getButtonClass = (option: string) => {
    const isCorrect = option === question.answer;
    const isSelected = option === selectedAnswer;

    if (!selectedAnswer) return "bg-slate-700 hover:bg-slate-600";

    if (isCorrect) return "bg-green-500";
    if (isSelected) return "bg-red-500";

    return "bg-slate-700 opacity-50";
  };

  if (isLevelComplete) {
    return <LevelComplete level="1" route="levelTwo" />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-[10px] md:p-4">
      {/* Background */}
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

      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              {t("levelOneTitle")}
            </h1>
          </div>

          <h3 className="text-[16px] md:text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>

          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${getButtonClass(
                  option
                )}`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentQuestionIndex + 1}/{questions.length}
          </div>

          <div className="mt-8 text-center h-14">
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
                aria-label="check button"
              >
                {t("next")}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
