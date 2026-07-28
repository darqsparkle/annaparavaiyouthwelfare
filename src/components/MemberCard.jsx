import { motion } from "framer-motion";

export default function MemberCard({ photo, name, role, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
      className="group overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-3 text-center">
        <h4 className="font-display text-sm font-semibold text-dark">{name}</h4>
        <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-maroon/80">{role}</p>
      </div>
    </motion.div>
  );
}
