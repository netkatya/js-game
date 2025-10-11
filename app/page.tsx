import Image from "next/image";

export default function App() {
  return (
    <main>
      <div className="min-h-screen bg-[#0D0F14] flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold text-[#00E5FF] drop-shadow-[0_0_15px_#00E5FF]">
          Welcome to JavaScript game
        </h1>
        <div className="flex items-center space-x-8">
          <Image src="/img/robot.png" width={300} height={300} alt="Robot" />
          <p className="text-[#fff] text-2xl font-semibold max-w-lg">
            Gear up, coder! Your JavaScript adventure begins now!
          </p>
        </div>
      </div>
    </main>
  );
}
