import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Expand } from "lucide-react";
import PageHero from "../components/PageHero";
import Lightbox from "../components/Lightbox";
import { galleryImages } from "../data/gallery";

export default function Activities() {
  const { t } = useTranslation();
  const activityItems = t("activities.items", { returnObjects: true });
  const [activeIndex, setActiveIndex] = useState(null);

  const items = galleryImages.map((image, i) => ({
    image,
    title: activityItems[i]?.title,
    description: activityItems[i]?.description,
  }));

  return (
    <>
      <PageHero
        eyebrow={t("nav.activities")}
        title={t("activities.heroTitle")}
        description={t("activities.heroDescription")}
      />

      <section className="bg-bg py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {items.map((item, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                className="group relative block aspect-square overflow-hidden rounded-2xl text-left shadow-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/10 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <div className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <Expand size={16} />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-sm font-semibold leading-snug text-white sm:text-base">
                    {item.title}
                  </p>
                  <p className="mt-1 hidden text-xs text-white/70 sm:line-clamp-2 sm:block">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox items={items} activeIndex={activeIndex} onClose={() => setActiveIndex(null)} onNavigate={setActiveIndex} />
    </>
  );
}
