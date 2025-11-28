"use client";

import { useTranslation } from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Flag from "react-world-flags";

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const switchLang = (lang: "en" | "uk") => {
    i18n.changeLanguage(lang);

    localStorage.setItem("quizLang", lang);

    window.dispatchEvent(new Event("quiz-lang-change"));
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => switchLang("en")}
        className="hover:scale-110 transition"
      >
        <Flag code="GB" style={{ width: 40, height: 30 }} />
      </button>

      <button
        onClick={() => switchLang("uk")}
        className="hover:scale-110 transition"
      >
        <Flag code="UA" style={{ width: 40, height: 30 }} />
      </button>
    </div>
  );
}
