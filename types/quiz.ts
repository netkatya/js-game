// Тип для одного питання в квізі
export interface QuizTask {
  id: number;
  type: string;
  question: string;
  options: string[];
  answer: string;
}
export interface InputTask {
  id: number;
  type: string;
  question: string;
  answer: string;
}

// Описуємо рівень-квіз
export interface QuizLevel {
  levelId: number;
  levelType: 'quiz';
  tasks: QuizTask[];
}
export interface InputLevel {
  levelId: number;
  levelType: 'input';
  tasks: InputTask[];
}

// Описуємо рівень з кодом
export interface CodeLevel {
  levelId: number;
  levelType: 'code';
  task: {
    title: string;
    description: string;
    initialCode: string;
    testCases: {
      input: string[];
      expected: string;
    }[];
  };
}


// Прогрес залишається без змін
export interface Progress {
  [key: string]: number;
}