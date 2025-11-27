"use client";

import { useState } from "react";

export function useLanguage() {
  const [lang, setLang] = useState(
    typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en"
  );

  const changeLanguage = (lng: string) => {
    localStorage.setItem("lang", lng);
    setLang(lng);
    window.location.reload(); // обновляем данные
  };

  return { lang, changeLanguage };
}
