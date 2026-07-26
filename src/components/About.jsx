import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BookOpen, Eye, Target, ListChecks } from "lucide-react";

const cards = [
  { key: "history", icon: BookOpen },
  { key: "mission", icon: Target },
  { key: "vision", icon: Eye },
];

export default function About() {
  const { t } = useTranslation();
  const objectives = t("about.objectives.items", { returnObjects: true });

  return (
    <section id="about" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">{t("about.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{t("about.title")}</h2>
          <p className="mt-4 text-ink/65">{t("about.intro")}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map(({ key, icon: Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border border-primary/10 bg-bg p-7 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-dark">{t(`about.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{t(`about.${key}.body`)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-8 overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-dark to-primary p-8 text-white sm:p-10"
        >
          <div className="flex items-center gap-3">
            <ListChecks size={22} className="text-gold" />
            <h3 className="font-display text-xl font-semibold">{t("about.objectives.title")}</h3>
          </div>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {objectives.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
