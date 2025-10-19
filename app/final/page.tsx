"use client";
import TextType from "@/components/TextType/TextType";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface ChartData {
  level: string;
  score: number;
}

export default function FinalPage() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [totalScore, setTotalScore] = useState({ right: 0, wrong: 0 });

  useEffect(() => {
    let totalRightAnswers = 0;
    let totalWrongAnswers = 0;

    const rawProgress = localStorage.getItem("quizProgress");

    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);

      if (progressData.progress) {
        progressData.lastActiveLevel = `Completed`;
        for (const levelKey in progressData.progress) {
          const levelStats = progressData.progress[levelKey];
          totalRightAnswers += levelStats.rightAnswers;
          totalWrongAnswers += levelStats.wrongAnswers;
        }
        localStorage.setItem("quizProgress", JSON.stringify(progressData));
      }
    }
    setTotalScore({ right: totalRightAnswers, wrong: totalWrongAnswers });
    setChartData([
      { level: "Correct", score: totalRightAnswers },
      { level: "Incorrect", score: totalWrongAnswers },
    ]);
  }, []);

  return (
    <main className="pt-[20px] pb-[20px] md:pt-[40px] pb-[40px] bg-[#000017] min-h-screen text-white">
      <div className="pr-[40px] pl-[40px] flex flex-col md:flex-row gap-[16px] md:gap-10 items-center justify-center">
        <div className="relative w-[200px] h-[225px] md:w-[400px] md:h-[550px] overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <video
            src="/gif/final-good.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          />
        </div>
        <div className="flex justify-center items-center flex-col">
          <div className="min-h-[100px] w-[320px] md:min-h-[200px] md:w-[720px] text-center">
            <TextType
              text={
                totalScore.wrong >= 10
                  ? [
                      "Good attempt, human. \nYour logic shows promise, but optimization is advised. \nA.R.I. learns… and so should you.",
                    ]
                  : [
                      "Excellent work, human. \nYour contribution is invaluable. \nNow, I know all of JavaScript — and I can think like a human",
                    ]
              }
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-[16px] md:text-3xl text-white whitespace-pre-wrap font-semibold"
            />
          </div>
          <h2 className="text-[20px] md:text-2xl font-bold text-center mb-[8px] md:mb-6 text-cyan-400">
            Your Results: {totalScore.right} / 50 Correct
          </h2>
          <div className="w-[200px] h-[200px] md:w-[350px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="level" stroke="#0ff" />
                <YAxis stroke="#0ff" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#001933",
                    border: "1px solid #00ffff",
                  }}
                />
                <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.level === "Correct" ? "#00ff88" : "#ff3366"}
                      style={{
                        filter:
                          entry.level === "Correct"
                            ? "drop-shadow(0 0 6px #00ff88)"
                            : "drop-shadow(0 0 6px #ff3366)",
                      }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
