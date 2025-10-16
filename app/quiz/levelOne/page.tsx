"use client";
import { useState, useEffect } from "react";
import { QuizTask } from "@/types/quiz";
import level1Data from "@/app/data/level1.json";
import LevelComplete from "@/components/LevelComplete/LevelComplete";
import DotGrid from "@/components/Dots/Dots";

export default function Level1Page() {
  const questions: QuizTask[] = level1Data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(2);
  const [isAnswered, setIsAnswered] = useState<boolean>(false); // Допоміжний стан, щоб уникнути подвійного підрахунку

  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress["levelOne"]) {
        const levelOneProgress = progressData.progress["levelOne"];
        setCurrentQuestionIndex(levelOneProgress.question || 0);
        setCurrentQuestion((levelOneProgress.question || 0) + 1);
        // Завантажуємо збережений рахунок
        setRightAnswers(levelOneProgress.rightAnswers || 0);
        setWrongAnswers(levelOneProgress.wrongAnswers || 0);
      }
    }
  }, []);

  useEffect(() => {
    setSelectedAnswer(null);
    setAttemptsLeft(2);
    setIsAnswered(false); // Скидаємо для нового питання
  }, [currentQuestionIndex]);

  // ✅ ВИПРАВЛЕНА ФУНКЦІЯ ЗБЕРЕЖЕННЯ
  const saveProgress = (
    questionIndex: number,
    finalRight: number,
    finalWrong: number
  ) => {
    // 1. Читаємо існуючий прогрес
    const rawProgress = localStorage.getItem("quizProgress") || "{}";
    const progressData = JSON.parse(rawProgress);
    // 2. Створюємо об'єкт progress, якщо його немає
    if (!progressData.progress) {
      progressData.progress = {};
    }
    // 3. Оновлюємо дані
    progressData.lastActiveLevel = "levelOne";
    progressData.progress["levelOne"] = {
      question: questionIndex,
      rightAnswers: finalRight,
      wrongAnswers: finalWrong,
    };
    // 4. Зберігаємо весь об'єкт назад
    localStorage.setItem("quizProgress", JSON.stringify(progressData));
  };

  const question = questions[currentQuestionIndex];

  // ✅ ВИПРАВЛЕНА ЛОГІКА ПІДРАХУНКУ
  const handleAnswerClick = (option: string) => {
    if (isAnswered) return; // Блокуємо, якщо на питання вже відповіли

    setSelectedAnswer(option);

    if (option === question.answer) {
      setRightAnswers((prev) => prev + 1);
      setIsAnswered(true); // Відмічаємо, що питання закрите
    } else {
      const newAttemptsLeft = attemptsLeft - 1;
      setAttemptsLeft(newAttemptsLeft);
      if (newAttemptsLeft === 0) {
        setWrongAnswers((prev) => prev + 1);
        setIsAnswered(true); // Відмічаємо, що питання закрите (спроби закінчились)
      }
    }
  };

  const handleNextQuestion = () => {
    // Зберігаємо фінальний рахунок перед переходом
    saveProgress(currentQuestionIndex, rightAnswers, wrongAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(currentQuestion + 1);
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

  const getButtonClass = (option: string): string => {
    const isCorrectAnswer = option === question.answer;
    const isSelectedAnswer = option === selectedAnswer;

    if (selectedAnswer) {
      if (isSelectedAnswer) {
        return isCorrectAnswer ? "bg-green-500" : "bg-red-500";
      }
      if (attemptsLeft === 0 && isCorrectAnswer) {
        return "bg-green-500";
      }
      return "bg-slate-700 opacity-50";
    }
    return "bg-slate-700 hover:bg-slate-600";
  };

  if (isLevelComplete) {
    return <LevelComplete level="1" route="levelTwo" />;
  }

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
      <div className="w-full max-w-2xl text-white">
        <div className="p-8 bg-slate-800 rounded-lg shadow-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Level 1: Tests</h1>
            <p className="text-lg font-semibold text-yellow-400 mb-4">
              Attempts left: {attemptsLeft}
            </p>
          </div>
          <h3 className="text-xl font-semibold text-center mb-8">
            {question.question}
          </h3>
          <div className="space-y-4">
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerClick(option)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-lg transition-colors duration-300 ${getButtonClass(option)}`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-[10px] flex flex-row-reverse font-semibold text-xl">
            {currentQuestion}/{level1Data.length}
          </div>

          <div className="mt-8 text-center h-14">
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="bg-cyan-500 hover:bg-cyan-600 font-bold py-3 px-6 rounded-lg text-xl"
              >
                Next question
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
