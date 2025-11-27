"use client";

import { useTranslation } from "react-i18next";

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const switchLang = (lang: "en" | "uk") => {
    i18n.changeLanguage(lang);

    // сохранить язык для уровней
    localStorage.setItem("quizLang", lang);

    // сообщить страницам, что язык сменился → нужно перезагрузить JSON
    window.dispatchEvent(new Event("quiz-lang-change"));
  };

  return (
    <div className="flex gap-3 text-2xl fixed bottom-4 right-4 z-50">
      <button
        onClick={() => switchLang("en")}
        className="p-2 hover:scale-110 transition"
      >
        🇬🇧
      </button>

      <button
        onClick={() => switchLang("uk")}
        className="p-2 hover:scale-110 transition"
      >
        🇺🇦
      </button>
    </div>
  );
}
