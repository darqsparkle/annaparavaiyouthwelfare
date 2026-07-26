// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import { FileText, Download, ShieldCheck, CalendarClock, HardDrive } from "lucide-react";
// import { documentFiles } from "../data/documents";

// export default function OfficialDocuments() {
//   const { t } = useTranslation();
//   const docs = t("documents.items", { returnObjects: true });

//   return (
//     <section id="documents" className="relative bg-white py-20 lg:py-28">
//       <div className="mx-auto max-w-7xl px-5 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 0.6 }}
//           className="mx-auto max-w-2xl text-center"
//         >
//           <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
//             <ShieldCheck size={14} />
//             {t("documents.verifiedBadge")}
//           </span>
//           <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-maroon">{t("documents.eyebrow")}</p>
//           <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{t("documents.title")}</h2>
//           <p className="mt-4 text-ink/65">{t("documents.description")}</p>
//         </motion.div>

//         <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//           {docs.map((doc, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.3 }}
//               transition={{ duration: 0.5, delay: i * 0.08 }}
//               className="group relative flex flex-col rounded-2xl border border-primary/10 bg-bg p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
//             >
//               <div className="absolute right-4 top-4">
//                 <ShieldCheck size={16} className="text-secondary/50" />
//               </div>
//               <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
//                 <FileText size={20} />
//               </div>
//               <h3 className="font-display text-base font-semibold leading-snug text-dark">{doc.title}</h3>
//               <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{doc.description}</p>

//               <div className="mt-4 flex items-center gap-4 border-t border-primary/10 pt-4 text-[11px] text-ink/50">
//                 <span className="inline-flex items-center gap-1">
//                   <HardDrive size={12} /> {t("documents.fileSizeLabel")}: {doc.size}
//                 </span>
//                 <span className="inline-flex items-center gap-1">
//                   <CalendarClock size={12} /> {doc.updated}
//                 </span>
//               </div>

//               <a
//                 href={documentFiles[i].file}
//                 download={documentFiles[i].filename}
//                 className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-dark"
//               >
//                 <Download size={15} />
//                 {t("documents.downloadLabel")}
//               </a>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Download,
  ShieldCheck,
  CalendarClock,
  HardDrive,
} from "lucide-react";

import { documentFiles } from "../data/documents";

export default function OfficialDocuments() {
  const { t } = useTranslation();

  const docs = t("documents.items", {
    returnObjects: true,
  });

  const doc = docs[0];

  return (
    <section id="documents" className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <ShieldCheck size={14} />
            {t("documents.verifiedBadge")}
          </span>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-maroon">
            {t("documents.eyebrow")}
          </p>

          <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
            {t("documents.title")}
          </h2>

          <p className="mt-4 text-ink/65">
            {t("documents.description")}
          </p>
        </motion.div>

        {/* Certificate Card */}
        <div className="mt-14 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl rounded-2xl border border-primary/10 bg-bg p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
              <FileText size={26} />
            </div>

            <h3 className="font-display text-xl font-semibold text-dark">
              {doc.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-ink/60">
              {doc.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 border-t border-primary/10 pt-5 text-sm text-ink/50">
              <span className="inline-flex items-center gap-2">
                <HardDrive size={15} />
                {t("documents.fileSizeLabel")}: {doc.size}
              </span>

              <span className="inline-flex items-center gap-2">
                <CalendarClock size={15} />
                {doc.updated}
              </span>
            </div>

            <a
              href={documentFiles[0].file}
              download={documentFiles[0].filename}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-dark hover:shadow-lg"
            >
              <Download size={18} />
              {t("documents.downloadLabel")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}