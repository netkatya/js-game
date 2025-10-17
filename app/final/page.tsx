"use client";

import TextType from "@/components/TextType/TextType";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { level: "right", score: 80 },
  { level: "wrong", score: 20 },
];

export default function FinalPage() {
  return (
    <main className="pt-[40px] pb-[40px] bg-[#000017] min-h-screen text-white">
      <div className="pr-[40px] pl-[40px] flex gap-10 items-center justify-center">
        {/* Видео слева */}
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

        {/* {BarChart} */}
        <div className="flex justify-center items-center flex-col">
          <div className="h-[200px] w-[720px] text-center">
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
            Your Results
          </h2>

          <ResponsiveContainer width={350} height={300}>
            <BarChart data={data}>
              <XAxis dataKey="level" stroke="#0ff" />
              <YAxis stroke="#0ff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#001933",
                  border: "1px solid #00ffff",
                }}
              />
              <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.level === "right" ? "#00ff88" : "#ff3366"}
                    style={{
                      filter:
                        entry.level === "right"
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
