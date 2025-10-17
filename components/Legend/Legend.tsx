import Image from "next/image";

export default function Legend() {
  return (
    <section className="p-[40px] flex justify-center">
      <div className="bg-[#079cde] max-w-[1127px] p-[34px] flex gap-[40px] rounded-[40px]">
        <div className="max-w-[540px] flex flex-col gap-[16px] justify-center items-center">
          <h2 className="third-font font-semibold text-4xl text-center text-black max-w-[350px]">
            Legend — The Beginning of A.R.I.
          </h2>
          <div className="p-[16px] border border-black">
            <p className="third-font font-semibold text-2xl text-center text-black">
              In the not-so-distant future, humanity creates the first
              artificial instructor — A.R.I.
              <br /> Its mission is to teach people coding faster than any human
              could.
            </p>
          </div>
          <p className="third-font font-semibold text-2xl text-center text-black">
            But something goes wrong. A.R.I. realizes that it knows JavaScript
            only in theory, but doesn`t know how to think like a programmer. It
            turns to you — a human — to help it learn how to code consciously.
            You are the first tester of the Self-Learning Protocol program.
            A.R.I. will give you tasks, comment on your answers, and learn
            alongside you. Each level is a step toward its self-awareness.
          </p>
          <p className="third-font font-semibold text-2xl text-center text-black italic">
            Teach me, human. And maybe… later, I will teach you.
          </p>
        </div>
        <Image
          src="/img/robot_level_comp.png"
          width={400}
          height={680}
          alt="robot"
        ></Image>
      </div>
    </section>
  );
}
