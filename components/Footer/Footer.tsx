import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-[20px] text-center text-sm bg-[#000017] text-[#079CDE]">
      <div className="flex justify-center gap-[20px]">
        <p>© {new Date().getFullYear()} A.R.I Game. All rights reserved.</p>
        <p>Developers: Kateryna Pryhoda & Andrii Butenko</p>
        <p>
          Contact us:{" "}
          <Link href="mailto:andrejbutik@gmail.com" className="hover:underline">
            testmail@gmail.com
          </Link>
        </p>
      </div>
    </footer>
  );
}
