import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, HeartHandshake, LogIn } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import DonateModal from "./DonateModal";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/activities", label: t("nav.activities") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const linkClass = ({ isActive }) =>
    `relative text-sm font-semibold tracking-wide transition-colors py-2 ${
      isActive ? "text-primary" : "text-ink/70 hover:text-primary"
    }`;

  const openDonate = () => {
    setOpen(false);
    setDonateOpen(true);
  };

  // Compact mobile-only language toggle: shows the OTHER language's short code,
  // tapping switches to it. Adjust the "ta"/"en" codes and labels to match your i18n setup.
  const isTamil = i18n.language?.startsWith("ta");
  const toggleLang = () => i18n.changeLanguage(isTamil ? "en" : "ta");
  const langLabel = isTamil ? "E" : "த";

  return (
    <header
      className={`sticky top-0 z-50 w-full overflow-x-hidden transition-all duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur shadow-[0_1px_0_0_rgba(27,94,32,0.12)]" : "bg-bg/70 backdrop-blur-sm"
      }`}
    >
      {/* seal-ring accent strip */}
      <div className="h-[3px] w-full seal-ring" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-3 lg:px-8">
        <NavLink to="/" className="flex min-w-0 items-center gap-2 sm:gap-3 shrink-0">
          <img
            src={logo}
            alt={t("meta.orgNameShort")}
            className="h-8 w-8 rounded-full ring-2 ring-gold/60 object-cover sm:h-11 sm:w-11"
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-display text-[13px] font-bold text-primary sm:text-[15px] lg:text-base">
              {t("meta.orgNameShort")}
            </p>
            <p className="hidden truncate text-[11px] font-medium tracking-wide text-maroon/80 sm:block">
              {t("meta.tagline")}
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <NavLink
            to="/admin/login"
            aria-label="Admin login"
            title="Admin login"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary/70 transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            <LogIn size={16} />
          </NavLink>
          <button
            type="button"
            onClick={openDonate}
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-maroon/90"
          >
            <HeartHandshake size={16} />
            {t("nav.donate")}
          </button>
        </div>

        {/* Mobile: compact language toggle + hamburger, always visible, small footprint */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <button
            type="button"
            onClick={toggleLang}
            aria-label="Switch language"
            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 text-[11px] font-bold text-primary"
          >
            {langLabel}
          </button>
          <button
            className="inline-flex shrink-0 items-center justify-center rounded-full p-1.5 text-primary"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary/10 bg-bg px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-semibold ${
                    isActive ? "bg-primary/10 text-primary" : "text-ink/70"
                  }`
                }
                end={l.to === "/"}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/admin/login"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold ${
                  isActive ? "bg-primary/10 text-primary" : "text-ink/70"
                }`
              }
            >
              <LogIn size={15} />
              Login
            </NavLink>
          </nav>
          <div className="mt-4 flex items-center justify-end">
            <button
              type="button"
              onClick={openDonate}
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white"
            >
              <HeartHandshake size={16} />
              {t("nav.donate")}
            </button>
          </div>
        </div>
      )}

      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </header>
  );
}
// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Menu, X, HeartHandshake } from "lucide-react";
// import LanguageSwitcher from "./LanguageSwitcher";
// import DonateModal from "./DonateModal";
// import logo from "../assets/logo.png";

// export default function Navbar() {
//   const { t, i18n } = useTranslation();
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [donateOpen, setDonateOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   const links = [
//     { to: "/", label: t("nav.home") },
//     { to: "/activities", label: t("nav.activities") },
//     { to: "/contact", label: t("nav.contact") },
//   ];

//   const linkClass = ({ isActive }) =>
//     `relative text-sm font-semibold tracking-wide transition-colors py-2 ${
//       isActive ? "text-primary" : "text-ink/70 hover:text-primary"
//     }`;

//   const openDonate = () => {
//     setOpen(false);
//     setDonateOpen(true);
//   };

//   // Compact mobile-only language toggle: shows the OTHER language's short code,
//   // tapping switches to it. Adjust the "ta"/"en" codes and labels to match your i18n setup.
//   const isTamil = i18n.language?.startsWith("ta");
//   const toggleLang = () => i18n.changeLanguage(isTamil ? "en" : "ta");
//   const langLabel = isTamil ? "E" : "த";

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full overflow-x-hidden transition-all duration-300 ${
//         scrolled ? "bg-bg/95 backdrop-blur shadow-[0_1px_0_0_rgba(27,94,32,0.12)]" : "bg-bg/70 backdrop-blur-sm"
//       }`}
//     >
//       {/* seal-ring accent strip */}
//       <div className="h-[3px] w-full seal-ring" />
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-5 sm:py-3 lg:px-8">
//         <NavLink to="/" className="flex min-w-0 items-center gap-2 sm:gap-3 shrink-0">
//           <img
//             src={logo}
//             alt={t("meta.orgNameShort")}
//             className="h-8 w-8 rounded-full ring-2 ring-gold/60 object-cover sm:h-11 sm:w-11"
//           />
//           <div className="min-w-0 leading-tight">
//             <p className="truncate font-display text-[13px] font-bold text-primary sm:text-[15px] lg:text-base">
//               {t("meta.orgNameShort")}
//             </p>
//             <p className="hidden truncate text-[11px] font-medium tracking-wide text-maroon/80 sm:block">
//               {t("meta.tagline")}
//             </p>
//           </div>
//         </NavLink>

//         <nav className="hidden items-center gap-8 lg:flex">
//           {links.map((l) => (
//             <NavLink key={l.to} to={l.to} className={linkClass} end={l.to === "/"}>
//               {({ isActive }) => (
//                 <>
//                   {l.label}
//                   <span
//                     className={`absolute -bottom-0.5 left-0 h-[2px] bg-gold transition-all ${
//                       isActive ? "w-full" : "w-0"
//                     }`}
//                   />
//                 </>
//               )}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="hidden items-center gap-3 lg:flex">
//           <LanguageSwitcher />
//           <button
//             type="button"
//             onClick={openDonate}
//             className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-maroon/90"
//           >
//             <HeartHandshake size={16} />
//             {t("nav.donate")}
//           </button>
//         </div>

//         {/* Mobile: compact language toggle + hamburger, always visible, small footprint */}
//         <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
//           <button
//             type="button"
//             onClick={toggleLang}
//             aria-label="Switch language"
//             className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/30 text-[11px] font-bold text-primary"
//           >
//             {langLabel}
//           </button>
//           <button
//             className="inline-flex shrink-0 items-center justify-center rounded-full p-1.5 text-primary"
//             onClick={() => setOpen((o) => !o)}
//             aria-label="Toggle menu"
//           >
//             {open ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </div>

//       {open && (
//         <div className="border-t border-primary/10 bg-bg px-4 pb-4 pt-2 lg:hidden">
//           <nav className="flex flex-col gap-1">
//             {links.map((l) => (
//               <NavLink
//                 key={l.to}
//                 to={l.to}
//                 onClick={() => setOpen(false)}
//                 className={({ isActive }) =>
//                   `rounded-lg px-3 py-2.5 text-sm font-semibold ${
//                     isActive ? "bg-primary/10 text-primary" : "text-ink/70"
//                   }`
//                 }
//                 end={l.to === "/"}
//               >
//                 {l.label}
//               </NavLink>
//             ))}
//           </nav>
//           <div className="mt-4 flex items-center justify-end">
//             <button
//               type="button"
//               onClick={openDonate}
//               className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white"
//             >
//               <HeartHandshake size={16} />
//               {t("nav.donate")}
//             </button>
//           </div>
//         </div>
//       )}

//       <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
//     </header>
//   );
// }