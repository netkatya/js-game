import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#000017] px-35 text-[#079CDE] flex justify-between items-center">
      <Image src="/logo.png" alt="logo of the website" width="80" height="80" />
      <nav>
        <ul className="flex gap-[30px] text-2xl font-semibold">
          <li className="hover:underline">
            <Link href="#">Home</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">Levels</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">Progress</Link>
          </li>
          <li className="hover:underline">
            <Link href="#">About A.R.I</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
