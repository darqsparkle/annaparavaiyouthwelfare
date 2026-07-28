import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Users2 } from "lucide-react";
import logo from "../assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-maroon/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,_#0D4F2B_1px,_transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[3fr_2fr] lg:gap-6 lg:px-8 lg:py-20">
        {/* Left Content */}
        <div className="flex min-w-0 flex-col items-start justify-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-maroon"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {t("hero.eyebrow")}
          </motion.span>

          <motion.h1
  variants={fadeUp}
  initial="hidden"
  animate="show"
  custom={1}
  className="font-display font-bold leading-[1.12] tracking-tight"
>
  <span className="relative inline-block">
    {/* Static yellow glow — inline style guarantees it never gets purged/dropped */}
    <span
      aria-hidden="true"
      className="absolute -inset-2 -z-10 rounded-xl blur-lg"
      style={{ backgroundColor: "rgba(212, 175, 55, 0.3)" }}
    />

    <span className="relative block text-primary text-2xl sm:text-3xl lg:whitespace-nowrap lg:text-[1.8rem] xl:text-3xl 2xl:text-4xl">
      {t("hero.titleLine1")}
    </span>
  </span>

  <span className="mt-1.5 block text-primary text-3xl sm:text-3xl lg:text-3xl xl:text-3xl">
    {t("hero.titleLine2")}
  </span>
  
</motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 font-display text-lg italic text-primary/80 sm:text-xl"
          >
            {t("hero.tagline")}
            <span className="mx-2 text-gold">·</span>
            <span className="text-sm not-italic text-ink/50">
              {t("hero.taglineTranslation")}
            </span>
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink/70"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a
              href="/activities"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
            >
              {t("hero.ctaPrimary")}
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-maroon/70 px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
            >
              {t("hero.ctaSecondary")}
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 flex items-center gap-2 text-xs font-medium text-ink/50"
          >
            <Users2 size={15} className="text-secondary" />
            {t("hero.statBadge")}
          </motion.div>
        </div>

        {/* Right Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex items-center justify-center lg:translate-y-6 xl:translate-y-10"
        >
          <div className="animate-float relative">
            <div className="absolute inset-0 -z-10 scale-110 rounded-full seal-ring opacity-20 blur-2xl" />

            <div className="rounded-full border-[8px] border-white bg-white p-3 shadow-2xl shadow-primary/20">
              <img
                src={logo}
                alt={t("meta.orgNameShort")}
                className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
              />
            </div>

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold text-primary shadow-lg">
              {t("meta.regNumber")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { ArrowRight, Users2 } from "lucide-react";
// import logo from "../assets/logo.png";

// const fadeUp = {
//   hidden: { opacity: 0, y: 28 },
//   show: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
//   }),
// };

// export default function Hero() {
//   const { t } = useTranslation();

//   return (
//     <section className="relative overflow-hidden bg-bg">
//       {/* Ambient backdrop */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
//         <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-maroon/10 blur-3xl" />
//         <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,_#0D4F2B_1px,_transparent_1px)] [background-size:22px_22px]" />
//       </div>

//       <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[3fr_2fr] lg:gap-6 lg:px-8 lg:py-20">
//         {/* Left Content */}
//         <div className="flex min-w-0 flex-col items-start justify-center">
//           <motion.span
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={0}
//             className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-maroon"
//           >
//             <span className="h-1.5 w-1.5 rounded-full bg-gold" />
//             {t("hero.eyebrow")}
//           </motion.span>

//           <motion.h1
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={1}
//             className="font-display font-bold leading-[1.12] tracking-tight"
//           >
//             <span className="block text-primary text-2xl sm:text-3xl lg:whitespace-nowrap lg:text-[1.8rem] xl:text-3xl 2xl:text-4xl">
//               {t("hero.titleLine1")}
//             </span>

//             <span className="mt-1.5 block text-primary text-3xl sm:text-3xl lg:text-3xl xl:text-3xl">
//               {t("hero.titleLine2")}
//             </span>
//           </motion.h1>

//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={2}
//             className="mt-4 font-display text-lg italic text-primary/80 sm:text-xl"
//           >
//             {t("hero.tagline")}
//             <span className="mx-2 text-gold">·</span>
//             <span className="text-sm not-italic text-ink/50">
//               {t("hero.taglineTranslation")}
//             </span>
//           </motion.p>

//           <motion.p
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={3}
//             className="mt-6 max-w-xl text-base leading-relaxed text-ink/70"
//           >
//             {t("hero.description")}
//           </motion.p>

//           <motion.div
//   variants={fadeUp}
//   initial="hidden"
//   animate="show"
//   custom={4}
//   className="mt-8 flex flex-wrap items-center gap-4"
// >
//   <a
//     href="/activities"
//     className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
//   >
//     {t("hero.ctaPrimary")}
//     <ArrowRight
//       size={16}
//       className="transition-transform group-hover:translate-x-1"
//     />
//   </a>

//   <a
//     href="/contact"
//     className="inline-flex items-center gap-2 rounded-full border-2 border-maroon/70 px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
//   >
//     {t("hero.ctaSecondary")}
//   </a>
// </motion.div>

//           <motion.div
//             variants={fadeUp}
//             initial="hidden"
//             animate="show"
//             custom={5}
//             className="mt-8 flex items-center gap-2 text-xs font-medium text-ink/50"
//           >
//             <Users2 size={15} className="text-secondary" />
//             {t("hero.statBadge")}
//           </motion.div>
//         </div>

//         {/* Right Logo */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
//           animate={{ opacity: 1, scale: 1, rotate: 0 }}
//           transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
//           className="relative flex items-center justify-center lg:translate-y-6 xl:translate-y-10"
//         >
//           <div className="animate-float relative">
//             <div className="absolute inset-0 -z-10 scale-110 rounded-full seal-ring opacity-20 blur-2xl" />

//             <div className="rounded-full border-[8px] border-white bg-white p-3 shadow-2xl shadow-primary/20">
//               <img
//                 src={logo}
//                 alt={t("meta.orgNameShort")}
//                 className="h-64 w-64 rounded-full object-cover sm:h-80 sm:w-80 lg:h-80 lg:w-80 xl:h-96 xl:w-96"
//               />
//             </div>

//             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-bold text-primary shadow-lg">
//               {t("meta.regNumber")}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }