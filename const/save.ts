export const saveProgress = (
    questionIndex: number,
    finalRight: number,
    finalWrong: number,
    levelNumber:string
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