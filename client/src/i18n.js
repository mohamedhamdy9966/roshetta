import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

// Set initial RTL/LTR based on detected language
i18n.on("initialized", () => {
  const currentLang = i18n.language;
  if (currentLang === "ar") {
    document.body.dir = "rtl";
    document.documentElement.lang = "ar";
    document.body.classList.add("rtl");
  } else {
    document.body.dir = "ltr";
    document.documentElement.lang = "en";
    document.body.classList.remove("rtl");
  }
});

// Also handle language changes
i18n.on("languageChanged", (lng) => {
  if (lng === "ar") {
    document.body.dir = "rtl";
    document.documentElement.lang = "ar";
    document.body.classList.add("rtl");
  } else {
    document.body.dir = "ltr";
    document.documentElement.lang = "en";
    document.body.classList.remove("rtl");
  }
});

export default i18n;
