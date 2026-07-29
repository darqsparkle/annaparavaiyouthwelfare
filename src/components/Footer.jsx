
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MessageCircle, MapPin, Phone, Mail, Users, Handshake, TrendingUp } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import logo from "../assets/logo.png";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/activities", label: t("nav.activities") },
    { to: "/#documents", label: t("nav.documents") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const socials = [
    { icon: FacebookIcon, href: "https://www.facebook.com/annaparavaiyouthswelfare", label: "Facebook" },
    { icon: InstagramIcon, href: "https://www.instagram.com/annaparavai_youthswelfare", label: "Instagram" },
    { icon: YoutubeIcon, href: "https://www.youtube.com/@annaparavaiyouths_welfare", label: "YouTube" },
    { icon: MessageCircle, href: "https://wa.me/919840984502", label: "WhatsApp" },
  ];

  const sloganItems = [
    { icon: Users, label: "சேவை செய்வோம்" },
    { icon: Handshake, label: "ஒற்றுமையுடன் வளர்வோம்" },
    { icon: TrendingUp, label: "வளர்ச்சியை உருவாக்குவோம்" },
  ];

  return (
    <footer className="relative bg-dark text-white/80">
      <div className="h-[3px] w-full seal-ring" />
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt={t("meta.orgNameShort")} className="h-12 w-12 rounded-full ring-2 ring-gold/60" />
              <div className="leading-tight">
                <p className="font-display text-sm font-bold text-white">{t("meta.orgNameShort")}</p>
                <p className="text-[11px] text-gold">{t("meta.tagline")}</p>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">{t("footer.about")}</p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">{t("footer.quickLinks")}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">{t("footer.contactUs")}</h4>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                {t("contact.address")}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold" />
                <span>+91 63845 35527</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold" />
                <span>contact@annapparavai.org</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">{t("footer.followUs")}</h4>
            <div className="mt-4 flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-gold hover:text-dark"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {t("meta.orgNameShort")}. {t("footer.rights")}
          </p>
          <p>{t("meta.regNumber")}</p>
        </div>
      </div>

      {/* Tamil slogan strip */}
      <div className="relative border-t border-gold/20 bg-black/20 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 lg:px-8">
          {sloganItems.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-4">
              {i !== 0 && (
                <span className="hidden h-1.5 w-1.5 rotate-45 bg-gold/60 sm:inline-block" aria-hidden="true" />
              )}
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon size={17} />
                </span>
                <span className="font-display text-sm font-semibold tracking-wide text-gold sm:text-base">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}