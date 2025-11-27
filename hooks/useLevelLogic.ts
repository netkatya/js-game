import { useState, useEffect, useCallback } from 'react';

// Тип для даних, що зберігаються в localStorage
interface LevelProgressData {
  question: number;
  rightAnswers: number;
  wrongAnswers: number;
}

// Тип для параметрів, які приймає хук
interface UseLevelLogicParams {
  levelId: string; // "levelOne", "levelTwo", etc.
  questionCount: number; // Загальна кількість питань у рівні
}

// Тип для значень, які хук повертає
interface UseLevelLogicReturn {
  currentIndex: number;
  rightAnswers: number;
  wrongAnswers: number;
  isLevelComplete: boolean;
  setRightAnswers: React.Dispatch<React.SetStateAction<number>>;
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>;
  saveProgress: (
    index: number,
    right: number,
    wrong: number
  ) => void;
  goToNextQuestionOrComplete: () => void; // Функція для переходу
}

export function useLevelLogic({
  levelId,
  questionCount,
}: UseLevelLogicParams): UseLevelLogicReturn {
  // --- Стан хука ---
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [isLevelComplete, setIsLevelComplete] = useState<boolean>(false);

  // --- Завантаження прогресу при першому рендері ---
  useEffect(() => {
    const rawProgress = localStorage.getItem("quizProgress");
    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);
      if (progressData.progress && progressData.progress[levelId]) {
        const levelProgress: LevelProgressData = progressData.progress[levelId];
        const savedIndex = levelProgress.question || 0;
        const savedRight = levelProgress.rightAnswers || 0;
        const savedWrong = levelProgress.wrongAnswers || 0;
        const totalAnswers = savedRight + savedWrong;

        // Визначаємо, з якого питання починати
        let nextQuestionIndex = 0;
        if (totalAnswers > 0 || savedIndex > 0) { // Якщо вже відповідали
          nextQuestionIndex = savedIndex + 1;
        }

        if (nextQuestionIndex >= questionCount) {
          setIsLevelComplete(true); // Рівень вже пройдено
        } else {
          setCurrentIndex(nextQuestionIndex);
        }
        setRightAnswers(savedRight);
        setWrongAnswers(savedWrong);
      }
    }
  }, [levelId, questionCount]); // Додаємо залежності

  // --- Функція збереження прогресу ---
  // Використовуємо useCallback, щоб функція не створювалася заново при кожному рендері
  const saveProgress = useCallback(
    (index: number, right: number, wrong: number) => {
      const rawProgress = localStorage.getItem("quizProgress") || "{}";
      const progressData = JSON.parse(rawProgress);
      if (!progressData.progress) {
        progressData.progress = {};
      }
      progressData.lastActiveLevel = levelId;
      progressData.progress[levelId] = {
        question: index, // Зберігаємо індекс ОСТАННЬОГО ПРОЙДЕНОГО питання
        rightAnswers: right,
        wrongAnswers: wrong,
      };
      localStorage.setItem("quizProgress", JSON.stringify(progressData));
    },
    [levelId] // Залежність від levelId
  );

  // --- Функція переходу на наступне питання або завершення ---
  const goToNextQuestionOrComplete = useCallback(() => {
    if (currentIndex < questionCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsLevelComplete(true);
      // Опціонально: Одразу готуємо наступний рівень у localStorage
      const nextLevelId = getNextLevelId(levelId); // Потрібна буде функція для цього
      if (nextLevelId) {
        const rawProgress = localStorage.getItem("quizProgress") || "{}";
        const progressData = JSON.parse(rawProgress);
        if (!progressData.progress) progressData.progress = {};
        progressData.lastActiveLevel = nextLevelId;
        if (!progressData.progress[nextLevelId]) {
          progressData.progress[nextLevelId] = { question: -1, rightAnswers: 0, wrongAnswers: 0 }; // -1 означає, що рівень ще не почато
        }
        localStorage.setItem("quizProgress", JSON.stringify(progressData));
      }
    }
  }, [currentIndex, questionCount, levelId]);

  // --- Повертаємо потрібні значення та функції ---
  return {
    currentIndex,
    rightAnswers,
    wrongAnswers,
    isLevelComplete,
    setRightAnswers, // Повертаємо сеттери, щоб можна було оновлювати бали з компонента
    setWrongAnswers,
    saveProgress,
    goToNextQuestionOrComplete,
  };
}

// Допоміжна функція (можна винести в utils)
function getNextLevelId(currentLevelId: string): string | null {
    const levels = ["levelOne", "levelTwo", "levelThree", "levelFour", "levelFive"];
    const currentIndex = levels.indexOf(currentLevelId);
    if (currentIndex !== -1 && currentIndex < levels.length - 1) {
        return levels[currentIndex + 1];
    }
    return null; // Або повертати шлях до фінальної сторінки
}