import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ta from "./locales/ta.json";

const savedLang = localStorage.getItem("appLanguage") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ta: { translation: ta },
  },
  lng: savedLang,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// Keep <html lang="..."> in sync so CSS :lang() font rules apply correctly
document.documentElement.lang = savedLang;

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
  localStorage.setItem("appLanguage", lng);
});

export default i18n;
