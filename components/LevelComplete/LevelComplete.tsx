"use client";
import { useRouter } from "next/navigation";
interface LevelCompleteProps {
  level: string;
  route: string;
}

export default function LevelComplete({ level, route }: LevelCompleteProps) {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-white mb-4">
          Level {level} Complete!
        </h1>
        <button
          onClick={() => router.push(`/quiz/${route}`)} // Змініть на правильний шлях
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg text-xl"
        >
          Go to the next Level
        </button>
      </div>
    </main>
  );
}
