// import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import { Menu, X, HeartHandshake } from "lucide-react";
// import LanguageSwitcher from "./LanguageSwitcher";
// import logo from "../assets/logo.png";

// export default function Navbar() {
//   const { t } = useTranslation();
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

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

//   return (
//     <header
//       className={`sticky top-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-bg/95 backdrop-blur shadow-[0_1px_0_0_rgba(27,94,32,0.12)]" : "bg-bg/70 backdrop-blur-sm"
//       }`}
//     >
//       {/* seal-ring accent strip */}
//       <div className="h-[3px] w-full seal-ring" />
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
//         <NavLink to="/" className="flex items-center gap-3 shrink-0">
//           <img
//             src={logo}
//             alt={t("meta.orgNameShort")}
//             className="h-11 w-11 rounded-full ring-2 ring-gold/60 object-cover"
//           />
//           <div className="leading-tight">
//             <p className="font-display text-[15px] font-bold text-primary sm:text-base">
//               {t("meta.orgNameShort")}
//             </p>
//             <p className="text-[11px] font-medium tracking-wide text-maroon/80">
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
//           <NavLink
//             to="/#documents"
//             className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-maroon/90"
//           >
//             <HeartHandshake size={16} />
//             {t("nav.donate")}
//           </NavLink>
//         </div>

//         <button
//           className="inline-flex items-center justify-center rounded-full p-2 text-primary lg:hidden"
//           onClick={() => setOpen((o) => !o)}
//           aria-label="Toggle menu"
//         >
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {open && (
//         <div className="border-t border-primary/10 bg-bg px-5 pb-5 pt-2 lg:hidden">
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
//           <div className="mt-4 flex items-center justify-between gap-3">
//             <LanguageSwitcher />
//             <NavLink
//               to="/#documents"
//               onClick={() => setOpen(false)}
//               className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white"
//             >
//               <HeartHandshake size={16} />
//               {t("nav.donate")}
//             </NavLink>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, HeartHandshake } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import DonateModal from "./DonateModal";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { t } = useTranslation();
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

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/95 backdrop-blur shadow-[0_1px_0_0_rgba(27,94,32,0.12)]" : "bg-bg/70 backdrop-blur-sm"
      }`}
    >
      {/* seal-ring accent strip */}
      <div className="h-[3px] w-full seal-ring" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt={t("meta.orgNameShort")}
            className="h-11 w-11 rounded-full ring-2 ring-gold/60 object-cover"
          />
          <div className="leading-tight">
            <p className="font-display text-[15px] font-bold text-primary sm:text-base">
              {t("meta.orgNameShort")}
            </p>
            <p className="text-[11px] font-medium tracking-wide text-maroon/80">
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
          <button
            type="button"
            onClick={openDonate}
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] hover:bg-maroon/90"
          >
            <HeartHandshake size={16} />
            {t("nav.donate")}
          </button>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full p-2 text-primary lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-primary/10 bg-bg px-5 pb-5 pt-2 lg:hidden">
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
          </nav>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher />
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