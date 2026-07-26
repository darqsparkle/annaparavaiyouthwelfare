import { motion } from "framer-motion";

export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-secondary py-20 text-center text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:26px_26px]" />
      <div className="relative mx-auto max-w-3xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
          )}
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{title}</h1>
          {description && <p className="mx-auto mt-4 max-w-xl text-white/80">{description}</p>}
        </motion.div>
      </div>
    </section>
  );
}
