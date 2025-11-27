import { QuizTask } from "@/types/quiz";

export const saveProgress = (
  questionIndex: number,
  finalRight: number,
  finalWrong: number,
  levelNumber: string
) => {
  const rawProgress = localStorage.getItem("quizProgress") || "{}";
  const progressData = JSON.parse(rawProgress);
  if (!progressData.progress) {
    progressData.progress = {};
  }
  progressData.lastActiveLevel = `level${levelNumber}`;
  progressData.progress[`level${levelNumber}`] = {
    question: questionIndex,
    rightAnswers: finalRight,
    wrongAnswers: finalWrong,
  };
  localStorage.setItem("quizProgress", JSON.stringify(progressData));
};

export const getButtonClass = (
  option: string,
  question: QuizTask,
  selectedAnswer: string | null
): string => {
  const isCorrectAnswer = option === question.answer;
  const isSelectedAnswer = option === selectedAnswer;

  if (!selectedAnswer) {
    return "bg-slate-700 hover:bg-slate-600";
  }
  if (isCorrectAnswer) {
    return "bg-green-500";
  }
  if (isSelectedAnswer) {
    return "bg-red-500";
  }
  return "bg-slate-700 opacity-50";
};

export const getInputClasses = (
  validationStatus: string,
  attemptsLeft: number
) => {
  const baseClasses =
    "w-full p-3 bg-slate-700 text-white rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors";
  if (validationStatus === "correct") {
    return `${baseClasses} border-green-500`;
  }
  if (validationStatus === "incorrect") {
    if (attemptsLeft === 0) {
      return `${baseClasses} border-red-500 cursor-not-allowed`;
    }
    return `${baseClasses} border-red-500 `;
  }
  return `${baseClasses} border-slate-600`;
};

export const showToast = (message: string, setToast: (message: string | null) => void, duration = 2000) => {
    setToast(message);
    setTimeout(() => setToast(null), duration);
  };