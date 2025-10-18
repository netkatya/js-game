import Image from "next/image";

export default function Levels() {
  return (
    <section className="pt-[60px] pb-[40px] flex justify-center" id="levels">
      <div className="pl-[20px] pr-[20px] max-w-[1200px]">
        <ul className="flex flex-col gap-[80px]">
          <li className="flex gap-[184px] items-center">
            <Image
              src="/img/levelOne.png"
              width={312}
              height={485}
              alt="level-one"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-2xl font-bold text-center">Type: Test</p>
              <p className="text-2xl font-bold text-center">
                Description: <br />
                <span className="text-2xl font-normal">
                  A.R.I. has just activated. Its processor is ready for the
                  first knowledge checks. It asks simple questions to understand
                  how human logic works. Goal: Warm up, recall syntax basics,
                  and get familiar with A.R.I.
                </span>
              </p>
              <p className="text-xl italic text-center">
                “Your answers will calibrate my learning modules.”
              </p>
            </div>
          </li>
          <li className="flex gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-2xl font-bold text-center">Type: Text Input</p>
              <p className="text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-2xl font-normal">
                  A.R.I. is learning to interpret text and data from the user.
                  Now it’s not enough to just pick an option — precise input is
                  required.
                </span>
              </p>
              <p className="text-2xl text-center">
                Goal: Test how well you understand JavaScript behavior and can
                formulate answers.
              </p>
            </div>
            <Image
              src="/img/levelTwo.png"
              width={312}
              height={485}
              alt="level-two"
            ></Image>
          </li>
          <li className="flex gap-[184px] items-center">
            <Image
              src="/img/levelThree.png"
              width={312}
              height={485}
              alt="level-three"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-2xl font-bold text-center">Type: Live Code</p>
              <p className="text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-2xl font-normal">
                  A.R.I. connects to your console space. It observes how you
                  write code — variables, output, basic constructs.
                </span>
              </p>
              <p className="text-2xl text-center">
                Goal: Teach A.R.I. to think through code, not just through
                multiple-choice answers.
              </p>
            </div>
          </li>
          <li className="flex gap-[184px] items-center">
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-2xl font-bold text-center">
                Type: Live Code with Functions
              </p>
              <p className="text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-2xl font-normal">
                  A.R.I. realizes that functions are the building blocks of
                  thought. Now it needs to understand how to create reusable
                  logic.
                </span>
              </p>
              <p className="text-2xl text-center">
                Goal: Practice writing and calling functions, working with
                parameters and return values.
              </p>
            </div>

            <Image
              src="/img/levelFour.png"
              width={312}
              height={485}
              alt="level-four"
            ></Image>
          </li>
          <li className="flex gap-[184px] items-center">
            <Image
              src="/img/levelFive.png"
              width={312}
              height={485}
              alt="level-five"
            ></Image>
            <div className="flex flex-col gap-[8px] max-w-[540px]">
              <p className="text-2xl font-bold text-center">Type: Debugging</p>
              <p className="text-2xl font-bold text-center">
                Description:{" "}
                <span className="text-2xl font-normal text-center">
                  System error. The code is corrupted. A.R.I. needs your help.
                  Fix the malfunction, find the issue, and restore algorithm
                  stability.
                </span>
              </p>
              <p className="text-2xl text-center">
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

// import Link from "next/link";

// const availableLevels = [
//   { id: 1, name: "Tests", route: "levelOne" },
//   { id: 2, name: "React Fundamentals" },
//   { id: 3, name: "React Fundamentals" },
//   { id: 4, name: "React Fundamentals" },
//   { id: 5, name: "React Fundamentals" },
// ];

// export default function Levels() {
//   return (
//     <div className="flex  items-center justify-center mb-[105px] flex-col p-[37px]">
//       <h1 className="text-[128px] font-semibold mb-[25px]">Choose Level</h1>
//       <div>
//         <ul className="flex flex-col flex-wrap gap-[25px] items-center">
//           {availableLevels.map((level) => (
//             <li
//               key={level.id}
//               className="flex justify-center w-[567px] h-[126px] border-3 p-[12px] border-solid border-[#079cde] transition hover:translate-y-[-5px]"
//             >
//               <Link
//                 href={`/quiz/${level.route}`}
//                 className="text-[64px] font-semibold"
//               >
//                 {" "}
//                 {level.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
