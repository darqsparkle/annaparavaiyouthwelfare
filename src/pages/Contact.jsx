
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, MessageCircle, Mail, Clock } from "lucide-react";
import PageHero from "../components/PageHero";
import ContactForm from "../components/ContactForm";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "../components/SocialIcons";

const MAP_QUERY = encodeURIComponent("S. Sankaralingapuram, Madurai District, Tamil Nadu 625705");

export default function Contact() {
  const { t } = useTranslation();

  const infoRows = [
    { icon: MapPin, label: t("contact.address") },
    { icon: Phone, label: `${t("contact.phone")}: +91 63845 35527` },
    { icon: Phone, label: `${t("contact.phone")}: +91 89392 43699` },
    { icon: Phone, label: `${t("contact.phone")}: +91 76394 24383` },
    { icon: Mail, label: `${t("contact.email")}: annaparavai.youths@gmail.com` },
    { icon: Clock, label: `${t("contact.hours")}: ${t("contact.hoursValue")}` },
  ];

  const socials = [
    // { icon: FacebookIcon, href: "#", label: "Facebook" },
    // { icon: InstagramIcon, href: "#", label: "Instagram" },
    // { icon: YoutubeIcon, href: "#", label: "YouTube" },
    // { icon: MessageCircle, href: "#", label: "WhatsApp" },
  ];

  return (
    <>
      <PageHero title={t("contact.heroTitle")} description={t("contact.heroDescription")} />

      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:px-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-primary/10 bg-bg p-6 sm:p-8"
            >
              <h3 className="font-display text-xl font-semibold text-dark">{t("contact.infoTitle")}</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {infoRows.map(({ icon: Icon, label }, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink/70">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon size={16} />
                    </span>
                    <span className="leading-relaxed">{label}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-3 border-t border-primary/10 pt-6">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon size={17} />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 overflow-hidden rounded-2xl border border-primary/10 shadow-sm"
            >
              <p className="bg-primary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-primary">
                {t("contact.mapTitle")}
              </p>
              <div className="aspect-[4/3] w-full sm:aspect-video">
                <iframe
                  title="Location map"
                  src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}