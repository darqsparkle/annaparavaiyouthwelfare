
// import { motion } from "framer-motion";
// import { useTranslation } from "react-i18next";
// import {
//   FileText,
//   Download,
//   ShieldCheck,
//   CalendarClock,
//   HardDrive,
// } from "lucide-react";

// import { documentFiles } from "../data/documents";

// export default function OfficialDocuments() {
//   const { t } = useTranslation();

//   const docs = t("documents.items", {
//     returnObjects: true,
//   });

//   const doc = docs[0];

//   return (
//     <section id="documents" className="relative bg-white py-20 lg:py-28">
//       <div className="mx-auto max-w-7xl px-5 lg:px-8">
//         {/* Heading */}
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

//           <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-maroon">
//             {t("documents.eyebrow")}
//           </p>

//           <h2 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">
//             {t("documents.title")}
//           </h2>

//           <p className="mt-4 text-ink/65">
//             {t("documents.description")}
//           </p>
//         </motion.div>

//         {/* Certificate Card */}
//         <div className="mt-14 flex justify-center">
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.5 }}
//             className="w-full max-w-xl rounded-2xl border border-primary/10 bg-bg p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
//           >
//             <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
//               <FileText size={26} />
//             </div>

//             <h3 className="font-display text-xl font-semibold text-dark">
//               {doc.title}
//             </h3>

//             <p className="mt-3 text-sm leading-7 text-ink/60">
//               {doc.description}
//             </p>

//             <div className="mt-6 flex flex-wrap gap-6 border-t border-primary/10 pt-5 text-sm text-ink/50">
//               <span className="inline-flex items-center gap-2">
//                 <HardDrive size={15} />
//                 {t("documents.fileSizeLabel")}: {doc.size}
//               </span>

//               <span className="inline-flex items-center gap-2">
//                 <CalendarClock size={15} />
//                 {doc.updated}
//               </span>
//             </div>

//             <a
//               href={documentFiles[0].file}
//               download={documentFiles[0].filename}
//               className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-dark hover:shadow-lg"
//             >
//               <Download size={18} />
//               {t("documents.downloadLabel")}
//             </a>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Eye,
  ShieldCheck,
  CalendarClock,
  HardDrive,
  X,
} from "lucide-react";

import { documentFiles } from "../data/documents";

function getFileType(path = "") {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return "image";
  return "unknown";
}

export default function OfficialDocuments() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const docs = t("documents.items", {
    returnObjects: true,
  });

  const doc = docs[0];
  const fileEntry = documentFiles[0];
  const fileType = getFileType(fileEntry.file);

  // Lock background scroll + allow Escape to close while viewer is open
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-dark hover:shadow-lg"
            >
              <Eye size={18} />
              {t("documents.viewLabel")}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 p-4 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
                <h3 className="truncate font-display text-base font-semibold text-dark sm:text-lg">
                  {doc.title}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={t("documents.closeLabel")}
                  className="ml-4 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/60 transition-colors hover:bg-ink/10 hover:text-dark"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Viewer body */}
              <div className="flex-1 overflow-auto bg-ink/5">
                {fileType === "pdf" && (
                  <iframe
                    src={`${fileEntry.file}#toolbar=0`}
                    title={doc.title}
                    className="h-[75vh] w-full"
                  />
                )}

                {fileType === "image" && (
                  <img
                    src={fileEntry.file}
                    alt={doc.title}
                    className="mx-auto h-auto max-h-[75vh] w-auto max-w-full object-contain"
                  />
                )}

                {fileType === "unknown" && (
                  <div className="flex h-[50vh] items-center justify-center px-6 text-center text-sm text-ink/50">
                    {t("documents.previewUnavailable")}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}