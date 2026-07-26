import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Lightbox({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const handleKey = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % items.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + items.length) % items.length);
    },
    [isOpen, activeIndex, items.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/90 px-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex - 1 + items.length) % items.length);
            }}
            aria-label="Previous"
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((activeIndex + 1) % items.length);
            }}
            aria-label="Next"
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 sm:flex"
          >
            <ChevronRight size={22} />
          </button>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <img src={item.image} alt={item.title} className="max-h-[55vh] w-full object-cover" />
            <div className="p-6">
              <h3 className="font-display text-xl font-semibold text-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
