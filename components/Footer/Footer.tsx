import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-[20px] text-center text-sm bg-[#000017] text-[#079CDE]">
      <div className="flex flex-col md:flex-row justify-center gap-[20px]">
        <p>© {new Date().getFullYear()} A.R.I Game. All rights reserved.</p>
        <p>
          Developers:
          <Link
            href="https://www.linkedin.com/in/kateryna-pryhoda"
            className="hover:underline"
            target="_blank"
          >
            Kateryna Pryhoda
          </Link>{" "}
          &{" "}
          <Link
            href="https://www.linkedin.com/in/andrii-butenko-5190a6371"
            className="hover:underline"
            target="_blank"
          >
            Andrii Butenko
          </Link>
        </p>
        <p>
          Designed by{" "}
          <Link
            href="https://www.linkedin.com/in/tetiana-kriukovska-40a65735b"
            className="hover:underline"
            target="_blank"
          >
            Tatiana Kriukovska
          </Link>
        </p>
        <div className="flex flex-row gap-[5px]"></div>
      </div>
    </footer>
  );
}
