import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-[20px] text-center text-sm bg-[#000017] text-[#079CDE]">
      <div className="flex flex-col md:flex-row justify-center gap-[20px]">
        <p>© {new Date().getFullYear()} A.R.I Game. All rights reserved.</p>
        <p>
          Developers:{" "}
          <span>
            <Link
              href="https://www.linkedin.com/in/kateryna-pryhoda"
              className="hover:underline"
              target="_blank"
            >
              Kateryna Pryhoda {""}
            </Link>
            &
            <Link
              href="https://www.linkedin.com/in/andrii-butenko-5190a6371"
              className="hover:underline"
              target="_blank"
            >
              {""} Andrii Butenko
            </Link>
          </span>
        </p>
        <p>Designed by Tatiana Kriukovska</p>
      </div>
    </footer>
  );
}
