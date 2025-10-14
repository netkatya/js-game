import Link from "next/link";

const availableLevels = [
  { id: 1, name: "Tests", route: "levelOne" },
  { id: 2, name: "React Fundamentals" },
  { id: 3, name: "React Fundamentals" },
  { id: 4, name: "React Fundamentals" },
  { id: 5, name: "React Fundamentals" },
];

export default function Levels() {
  return (
    <div className="flex  items-center justify-center mb-[105px] flex-col p-[37px]">
      <h1 className="text-[128px] font-semibold mb-[25px]">Choose Level</h1>
      <div>
        <ul className="flex flex-col flex-wrap gap-[25px] items-center">
          {availableLevels.map((level) => (
            <li
              key={level.id}
              className="flex justify-center w-[567px] h-[126px] border-3 p-[12px] border-solid border-[#079cde] transition hover:translate-y-[-5px]"
            >
              <Link
                href={`/quiz/${level.route}`}
                className="text-[64px] font-semibold"
              >
                {" "}
                {level.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
