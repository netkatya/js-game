"use client";
import { useState, useEffect } from "react";
import { QuizTask } from "@/types/quiz";
import level1Data from "@/app/data/level1.json";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import { getButtonClass, showToast } from "@/utils/functions";
import { useLevelLogic } from "@/hooks/useLevelLogic";
import Toast from "@/components/Toast/Toast";

export default function Level1Page() {
  const questions: QuizTask[] = level1Data;
  const {
    currentIndex,
    rightAnswers,
    wrongAnswers,
    isLevelComplete,
    setRightAnswers,
    setWrongAnswers,
    saveProgress,
    goToNextQuestionOrComplete,
  } = useLevelLogic({ levelId: "levelOne", questionCount: questions.length });

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex]);

  const question = questions[currentIndex];

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);
    let finalRight = rightAnswers;
    let finalWrong = wrongAnswers;

    if (option === question.answer) {
      finalRight++;
      setRightAnswers(finalRight);
      showToast("✅ Correct!", setToast);
    } else {
      finalWrong++;
      setWrongAnswers(finalWrong);
      showToast("❌ Incorrect!", setToast);
    }

    saveProgress(currentIndex, finalRight, finalWrong);
  };

  const handleNext = () => {
    goToNextQuestionOrComplete();
  };
  if (isLevelComplete) {
    return <LevelComplete level="1" route="levelTwo" />;
  }

  return (
    <div>
      <Toast toast={toast}></Toast>
      <div className="w-auto max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              Level 1: Tests
            </h1>
          </div>
          <h3 className="text-[16px] md:text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>
          <div className="space-y-4">
            {questions[currentIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${getButtonClass(option, question, selectedAnswer)}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentIndex + 1}/{level1Data.length}
          </div>

          <div className="mt-8 text-center h-14">
            {isAnswered && (
              <button
                onClick={handleNext}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
              >
                Next question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
