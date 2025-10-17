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

// Тип для даних діаграми
interface ChartData {
  level: string;
  score: number;
}

export default function FinalPage() {
  // Створюємо стан для даних діаграми
  const [chartData, setChartData] = useState<ChartData[]>([]);
  // Стан для відображення загального рахунку (опціонально)
  const [totalScore, setTotalScore] = useState({ right: 0, wrong: 0 });

  useEffect(() => {
    let totalRightAnswers = 0;
    let totalWrongAnswers = 0;

    const rawProgress = localStorage.getItem("quizProgress");

    if (rawProgress) {
      const progressData = JSON.parse(rawProgress);

      if (progressData.progress) {
        // ✅ Ось виправлена логіка:
        // Ми проходимося по значенням об'єкта progress (тобто по кожному рівню)
        for (const levelKey in progressData.progress) {
          const levelStats = progressData.progress[levelKey];
          totalRightAnswers += levelStats.rightAnswers;
          totalWrongAnswers += levelStats.wrongAnswers;
        }
      }
    }

    // Оновлюємо стан з результатами
    setTotalScore({ right: totalRightAnswers, wrong: totalWrongAnswers });
    setChartData([
      { level: "Correct", score: totalRightAnswers },
      { level: "Incorrect", score: totalWrongAnswers },
    ]);
  }, []); // Пустий масив означає, що цей ефект виконається один раз після монтування

  return (
    <main className="pt-[40px] pb-[40px] bg-[#000017] min-h-screen text-white">
      <div className="pr-[40px] pl-[40px] flex gap-10 items-center justify-center">
        {/* Відео зліва */}
        <div className="relative w-[400px] h-[550px] overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <video
            src="/gif/final-good.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
          />
        </div>

        {/* BarChart */}
        <div className="flex justify-center items-center flex-col">
          <div className="min-h-[200px] max-w-[720px] text-center">
            <TextType
              text={[
                `Excellent work, human.
Your contribution is invaluable.
Now, I know all of JavaScript — and I can think like a human.`,
              ]}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              className="text-3xl text-white whitespace-pre-wrap font-semibold"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">
            Your Results: {totalScore.right} / 50 Correct
          </h2>

          <ResponsiveContainer width={350} height={300}>
            {/* Передаємо динамічні дані в діаграму */}
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
    </main>
  );
}
