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
    <main
      className="flex items-center justify-center p-8
             bg-[length:400%_400%]
             animate-[neonGradient_12s_ease_infinite]
             relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(315deg, #000017, #021940, #0b004f, #001c5e, #0ff, #001c5e, #0b004f, #021940, #000017)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-[12px] md:gap-4">
        <div className="w-[240px] h-[280px] md:w-[450px] md:h-[600px] relative overflow-hidden rounded-2xl border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE]">
          <video
            src="/gif/robot_level.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute -top-12 left-0"
          />
        </div>

        <div className="w-xl text-center p-[10px] md:p-8">
          <div>
            <div className="h-[100px] md:h-[200px] pt-[4px] pb-[4px] md:pt-16 md:pb-24">
              <TextType
                text={[
                  `Well done, human! Your logic is\n impressive. Advancing to the next\n level...`,
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="|"
                className="text-[20px] md:text-2xl text-white whitespace-pre-wrap font-semibold"
              />
            </div>
          </div>
          <h1 className="text-[36px] md:text-4xl font-bold text-white mb-[16px] md:mb-16">
            Level {level} Complete!
          </h1>
          <button
            onClick={() => router.push(`/quiz/${route}`)}
            className="w-[300px] md:w-[420px] min-h-[60px] md:min-h-[80px] p-3 text-center border-3 border-solid border-[#079cde] rounded-md 
                 transition-shadow duration-300 hover:shadow-[0_0_20px_#079CDE] text-[16px] md:text-2xl font-semibold"
          >
            Go to the next Level
          </button>
        </div>
      </div>
    </main>
  );
}
