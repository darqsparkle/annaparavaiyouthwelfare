import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CalendarDays, Users, ClipboardList, HeartHandshake } from "lucide-react";

const values = [5, 150, 40, 500];
const icons = [CalendarDays, Users, ClipboardList, HeartHandshake];

function Counter({ target, duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-white sm:text-5xl">
      {value}
    </span>
  );
}

export default function Stats() {
  const { t } = useTranslation();
  const items = t("stats.items", { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-dark via-primary to-secondary py-20">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:26px_26px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{t("stats.eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{t("stats.title")}</h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl border border-white/15 bg-white/5 px-4 py-8 text-center backdrop-blur-sm"
              >
                <Icon size={26} className="mb-3 text-gold" />
                <div className="flex items-baseline gap-0.5">
                  <Counter target={values[i]} />
                  <span className="font-display text-2xl font-bold text-white">{item.suffix}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-white/75">{item.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
