import Image from "next/image";

export default function Levels() {
  return (
    <section
      className="scroll-mt-[70px] md:scroll-mt-[50px] pt-[20px] md:pt-[60px] pb-[40px] flex justify-center"
      id="levels"
    >
      <div className="pl-[20px] pr-[20px] max-w-[1200px]">
        <h2 className="text-4xl md:text-8xl text-center mb-[16px] font-semibold">
          Levels
        </h2>
        <ul className="flex flex-col gap-[40px] md:gap-[80px]">
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level1.png"
              width={312}
              height={485}
              alt="level-one"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Type: Test
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Description: <br />
                <span className="text-[16px] md:text-2xl font-normal">
                  A.R.I. has just activated. Its processor is ready for the
                  first knowledge checks. It asks simple questions to understand
                  how human logic works.
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                Goal: Warm up, recall syntax basics, and get familiar with
                A.R.I.
              </p>
            </div>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Type: Text Input
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  A.R.I. is learning to interpret text and data from the user.
                  Now it’s not enough to just pick an option — precise input is
                  required.
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                Goal: Test how well you understand JavaScript behavior and can
                formulate answers.
              </p>
            </div>
            <Image
              src="/img/level2.png"
              width={312}
              height={485}
              alt="level-two"
            ></Image>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level3.webp"
              width={312}
              height={485}
              alt="level-three"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Type: Live Code
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  A.R.I. connects to your console space. It observes how you
                  write code — variables, output, basic constructs.
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                Goal: Teach A.R.I. to think through code, not just through
                multiple-choice answers.
              </p>
            </div>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Type: Live Code with Functions
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-[16px] md:text-2xl font-normal">
                  A.R.I. realizes that functions are the building blocks of
                  thought. Now it needs to understand how to create reusable
                  logic.
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                Goal: Practice writing and calling functions, working with
                parameters and return values.
              </p>
            </div>

            <Image
              src="/img/level4.webp"
              width={312}
              height={485}
              alt="level-four"
            ></Image>
          </li>
          <li className="flex gap-[24px] md:gap-[184px] items-center">
            <Image
              src="/img/level5.webp"
              width={312}
              height={485}
              alt="level-five"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Type: Debugging
              </p>
              <p className="text-[16px] md:text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-[16px] md:text-2xl font-normal text-center">
                  System error. The code is corrupted. A.R.I. needs your help.
                  Fix the malfunction, find the issue, and restore algorithm
                  stability.
                </span>
              </p>
              <p className="text-[16px] md:text-2xl text-center">
                Goal: Learn to locate and fix errors — the key skill of a true
                developer.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
