"use client";
import { useState, useEffect } from "react";
import { QuizTask } from "@/types/quiz";
import level1Data from "@/app/data/level1.json";
import LevelComplete from "@/components/LevelComplete/LevelComplete";

export default function Level1Page() {
  const questions: QuizTask[] = level1Data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  // const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelOne"]) {
        setCurrentQuestionIndex(progressData.progress["levelOne"]);
        setCurrentQuestion(progressData.progress["levelOne"] + 1);
      }
    }
  }, []);

  const saveProgress = (questionIndex: number) => {
    const rawProgress = localStorage.getItem("quizProgress") || "{}";
    const progressData = JSON.parse(rawProgress);
    if (!progressData.progress) {
      progressData.progress = {};
    }
    progressData.lastActiveLevel = "levelOne";
    progressData.progress["levelOne"] = questionIndex;
    localStorage.setItem("quizProgress", JSON.stringify(progressData));
  };

  const question = questions[currentQuestionIndex];

  const handleAnswerClick = (option: string) => {
    // Блокуємо повторне натискання після вибору відповіді
    if (selectedAnswer) return;
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    // Перевіряємо, чи це останнє питання
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(currentQuestion + 1);
      saveProgress(nextIndex);
      setSelectedAnswer(null); // Скидаємо відповідь для наступного питання
    } else {
      setIsLevelComplete(true);
      const rawProgress = localStorage.getItem("quizProgress");
      if (rawProgress) {
        const progressData = JSON.parse(rawProgress);
        progressData.lastActiveLevel = "levelTwo";
        progressData.progress.levelTwo = 0;
        localStorage.setItem("quizProgress", JSON.stringify(progressData));
      }
    }
  };

  // Оновлена логіка для стилізації кнопок
  const getButtonClass = (option: string): string => {
    // Якщо відповідь ще не обрано, всі кнопки стандартні
    if (!selectedAnswer) {
      return "bg-slate-700 hover:bg-slate-600";
    }

    const isCorrectAnswer = option === question.answer;
    const isSelectedAnswer = option === selectedAnswer;
    if (isCorrectAnswer) {
      // Завжди підсвічуємо правильну відповідь зеленим
      return "bg-green-500";
    }

    // Якщо користувач обрав цю (неправильну) відповідь, підсвічуємо червоним
    if (isSelectedAnswer) {
      return "bg-red-500";
    }

    // Всі інші (неправильні і не обрані) кнопки робимо напівпрозорими
    return "bg-slate-700 opacity-50";
  };

  // Якщо рівень завершено, показуємо спеціальний екран
  if (isLevelComplete) {
    return <LevelComplete level="1" route="levelTwo" />;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between align-center">
            <h1 className="text-2xl font-bold mb-4">Level 1: Tests</h1>
          </div>
          <h3 className="text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>
          <div className="space-y-4">
            {question.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                // Кнопки блокуються після того, як відповідь обрано
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${getButtonClass(
                  option
                )}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentQuestion}/{level1Data.length}
          </div>
          {/* Кнопка "Далі" з'являється тільки після вибору відповіді */}

          <div className="mt-8 text-center">
            <button
              onClick={handleNextQuestion}
              className={`font-bold py-3 px-6 rounded-lg text-xl ${
                !selectedAnswer
                  ? "bg-cyan-700 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
              disabled={!selectedAnswer}
            >
              {selectedAnswer ? "Next question" : "Waiting..."}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
