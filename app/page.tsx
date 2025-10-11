import Link from "next/link";

export default function App() {
  return (
    <main className="min-w-[1440px]">
      <div className="bg-[url('/img/bg.jpg')] bg-cover bg-center p-[37] h-[960]">
        <div className="flex  items-center justify-center mb-[105px]">
          {/* <video
            src="/gif/robot.mp4"
            autoPlay
            loop
            muted
            playsInline
            className=" w-[961px] h-[946px]"
          >
            Ваш браузер не підтримує відео тег.
          </video> */}
          <div className="font-semibold text-center w-[561px] h-[446px]">
            <h1 className="text-[128px] ">A.R.I</h1>
            <p className="text-[64px]">Artificial Robotic Instructor</p>
          </div>
        </div>
        <ul className="flex flex-col items-center gap-[24px] font-semibold text-[40px] text-center">
          <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px]">
            <Link href="#">Start training</Link>
          </li>
          <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px]">
            <Link href="#">Continue</Link>
          </li>
          <li className="border-3 p-[12px] border-solid border-[#079cde] w-[543px] transition hover:translate-y-[-5px] ">
            <Link href="#">Settings</Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
