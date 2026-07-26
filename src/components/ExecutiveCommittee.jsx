import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import MemberCard from "./MemberCard";
import { members } from "../data/members";

export default function ExecutiveCommittee() {
  const { t } = useTranslation();
  const roles = t("committee.roles", { returnObjects: true });

  return (
    <section id="committee" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">{t("committee.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{t("committee.title")}</h2>
          <p className="mt-4 text-ink/65">{t("committee.description")}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {members.map((m, i) => (
            <MemberCard key={m.id} index={i} photo={m.photo} name={m.name} role={roles[i]} />
          ))}
        </div>
      </div>
    </section>
  );
}
