"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header className="bg-[#000017] px-6 md:px-10 flex justify-between items-center border-b-2 border-b-[#079CDE] shadow-[0_0_20px_#079CDE] text-[#079CDE] text-lg font-semibold sticky top-0 left-0 z-[999]">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo of the website"
          width={70}
          height={70}
          className="cursor-pointer"
        />
      </Link>

      <nav className="hidden md:block">
        <ul className="flex gap-[30px] text-2xl font-semibold">
          <li className="transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="/">Home</Link>
          </li>
          <li className="transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="/#legend">About A.R.I</Link>
          </li>
          <li className="transition duration-300 hover:[text-shadow:0_0_10px_#079CDE]">
            <Link href="/#levels">Levels</Link>
          </li>
          <li>
            <LangSwitcher />
          </li>
        </ul>
      </nav>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-[#079CDE] focus:outline-none"
        aria-label="open menu"
      >
        {isOpen ? <X size={36} /> : <Menu size={36} />}
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-[70%] max-w-[280px] bg-[#00001a] border-l-2 border-[#079CDE] shadow-[0_0_20px_#079CDE] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-[998]`}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#079CDE]">
          <Image src="/logo.png" alt="logo" width={60} height={60} />
          <button onClick={() => setIsOpen(false)} aria-label="close menu">
            <X size={30} />
          </button>
        </div>

        <ul className="flex flex-col items-start p-6 gap-6 text-xl font-semibold">
          <li onClick={() => setIsOpen(false)}>
            <Link href="/" className="hover:[text-shadow:0_0_10px_#079CDE]">
              Home
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link
              href="/#legend"
              className="hover:[text-shadow:0_0_10px_#079CDE]"
            >
              About A.R.I
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link
              href="/#levels"
              className="hover:[text-shadow:0_0_10px_#079CDE]"
            >
              Levels
            </Link>
          </li>
        </ul>
        <LangSwitcher />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
}
