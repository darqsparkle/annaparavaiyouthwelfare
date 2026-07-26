import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, MessageCircle, Mail, HeartHandshake } from "lucide-react";
import DonateModal from "./DonateModal";

// ── Update these to your real numbers/email ─────────────────────────────
const CALL_NUMBER = "+91 63845 35527";
const CALL_HREF = "tel:+916384535527";

const WHATSAPP_NUMBER = "+91 76394 24383";
const WHATSAPP_HREF =
  "https://wa.me/917639424383?text=" +
  encodeURIComponent("Hello, I'd like to know more about Annapparavai Ilaignar Nalasangam.");

const EMAIL_ADDRESS = "annaparavai.youths@gmail.com";
const EMAIL_HREF = `mailto:${EMAIL_ADDRESS}`;
// ─────────────────────────────────────────────────────────────────────────

export default function QuickConnect() {
  const { t } = useTranslation();
  const [donateOpen, setDonateOpen] = useState(false);

  const items = [
    { key: "call", icon: Phone, href: CALL_HREF, value: CALL_NUMBER, accent: "bg-primary text-white" },
    {
      key: "whatsapp",
      icon: MessageCircle,
      href: WHATSAPP_HREF,
      value: WHATSAPP_NUMBER,
      accent: "bg-secondary text-white",
      external: true,
    },
    { key: "email", icon: Mail, href: EMAIL_HREF, value: EMAIL_ADDRESS, accent: "bg-maroon text-white" },
    {
      key: "donate",
      icon: HeartHandshake,
      onClick: () => setDonateOpen(true),
      value: t("contact.quickConnect.donateValue"),
      accent: "bg-gold text-dark",
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">
          {t("contact.quickConnect.title")}
        </p>
        <p className="mt-2 max-w-sm text-sm text-ink/60">{t("contact.quickConnect.subtitle")}</p>

        <div className="mt-6 flex items-center gap-4 sm:gap-6">
          {items.map(({ key, icon: Icon, href, onClick, value, accent, external }, i) => {
            const Tag = href ? "a" : "button";
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative"
              >
                <Tag
                  {...(href ? { href } : { type: "button", onClick })}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${t(`contact.quickConnect.${key}Title`)} — ${value}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-md transition-transform hover:-translate-y-1 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:h-16 sm:w-16 ${accent}`}
                >
                  <Icon size={22} />
                </Tag>

                {/* hover / focus tooltip */}
                <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-max max-w-[10rem] -translate-x-1/2 rounded-lg bg-dark px-3 py-1.5 text-center opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                  <span className="block text-[11px] font-semibold text-white">
                    {t(`contact.quickConnect.${key}Title`)}
                  </span>
                  <span className="block text-[10px] text-white/65">{value}</span>
                  <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-dark" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-ink/45">{t("contact.quickConnect.note")}</p>
      </motion.div>

      <DonateModal open={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}