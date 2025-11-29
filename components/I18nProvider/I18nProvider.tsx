"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/i18n";

export default function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLang = localStorage.getItem("quizLang");
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  if (!isMounted) return null;

  return <>{children}</>;
}
