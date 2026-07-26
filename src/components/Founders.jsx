import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FounderCard from "./FounderCard";

export default function Founders() {
  const { t } = useTranslation();
  const founders = t("founders.members", { returnObjects: true });

  return (
    <section id="founders" className="bg-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">{t("founders.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{t("founders.title")}</h2>
          <p className="mt-4 text-ink/65">{t("founders.description")}</p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((f, i) => (
            <FounderCard key={i} index={i} name={f.name} role={f.role} bio={f.bio} />
          ))}
        </div>
      </div>
    </section>
  );
}
