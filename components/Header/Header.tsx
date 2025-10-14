import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#000017] px-35 flex justify-between items-center border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE] text-[#079CDE] text-lg font-semibold">
      <Image src="/logo.png" alt="logo of the website" width="80" height="80" />
      <nav>
        <ul className="flex gap-[30px] text-2xl font-semibold">
          <li className="text-[#079CDE] transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="/">Home</Link>
          </li>
          <li className="text-[#079CDE] transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="#">About A.R.I</Link>
          </li>
          <li className="text-[#079CDE] transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="/levels">Levels</Link>
          </li>
          {/* <li className="hover:underline">
            <Link href="#">Progress</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
