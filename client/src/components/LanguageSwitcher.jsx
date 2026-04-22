import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      title={i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <span className="language-code">{i18n.language.toUpperCase()}</span>
      <span className="language-name">
        {i18n.language === "en" ? "عربي" : "English"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
