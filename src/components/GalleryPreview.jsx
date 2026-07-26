import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "../data/gallery";

export default function GalleryPreview() {
  const { t } = useTranslation();
  const items = t("activities.items", { returnObjects: true });
  const preview = galleryImages.slice(0, 6);

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-maroon">{t("galleryPreview.eyebrow")}</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{t("galleryPreview.title")}</h2>
            <p className="mt-3 text-ink/65">{t("galleryPreview.description")}</p>
          </div>
          <Link
            to="/activities"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {t("galleryPreview.cta")}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
          {preview.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <Link
                to="/activities"
                className="group relative block aspect-square overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={src}
                  alt={items[i]?.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/0 to-dark/0 opacity-70 transition-opacity group-hover:opacity-90" />
                <p className="absolute bottom-3 left-3 right-3 font-display text-sm font-semibold text-white">
                  {items[i]?.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
