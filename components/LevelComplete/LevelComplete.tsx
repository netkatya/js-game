"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import TextType from "../TextType/TextType";

interface LevelCompleteProps {
  level: string;
  route: string;
}

export default function LevelComplete({ level, route }: LevelCompleteProps) {
  const router = useRouter();
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="flex gap-4">
        <div className="w-[370px] h-[500px] relative overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <Image
            src="/img/robot_level_comp.png"
            width={370}
            height={470}
            alt="Robot celebrating"
            className="absolute -top-12 left-0"
          />
        </div>

        <div className="w-xl text-center p-8 rounded-lg shadow-lg">
          <div>
            <div className="h-[200px] p-8">
              <TextType
                text={[
                  `Well done, human!\nYour logic is impressive.\nAdvancing to the next level...`,
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-2xl text-white whitespace-pre-wrap font-semibold"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Level {level} Complete!
          </h1>
          <button
            onClick={() => router.push(`/quiz/${route}`)} // Змініть на правильний шлях
            className="w-xm p-3 text-center border-3 border-solid border-[#079cde] rounded-md 
                 transition-shadow duration-300 hover:shadow-[0_0_20px_#079CDE] text-xl"
          >
            Go to the next Level
          </button>
        </div>
      </div>
    </main>
  );
}
