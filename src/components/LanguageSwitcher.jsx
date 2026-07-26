import { useTranslation } from "react-i18next";

export default function LanguageSwitcher({ className = "" }) {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const setLang = (lng) => {
    if (lng !== current) i18n.changeLanguage(lng);
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border border-primary/20 bg-white/70 p-1 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={current === "en"}
        className={`rounded-full px-3 py-1.5 transition-colors cursor-pointer ${
          current === "en" ? "bg-primary text-white shadow-sm" : "text-primary/70 hover:text-primary"
        }`}
      >
        English
      </button>
      <button
        type="button"
        onClick={() => setLang("ta")}
        aria-pressed={current === "ta"}
        className={`rounded-full px-3 py-1.5 transition-colors cursor-pointer ${
          current === "ta" ? "bg-primary text-white shadow-sm" : "text-primary/70 hover:text-primary"
        }`}
      >
        தமிழ்
      </button>
    </div>
  );
}
