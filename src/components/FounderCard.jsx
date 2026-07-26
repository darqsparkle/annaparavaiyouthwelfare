import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function FounderCard({ name, role, bio, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center rounded-2xl border border-primary/10 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative">
        <div className="seal-ring flex h-24 w-24 items-center justify-center rounded-full p-1">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-bg">
            <User size={36} className="text-primary/70" />
          </div>
        </div>
      </div>
      <h3 className="font-display mt-5 text-lg font-semibold text-dark">{name}</h3>
      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-maroon">{role}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink/60">{bio}</p>
    </motion.div>
  );
}
