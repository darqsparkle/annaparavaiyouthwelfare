import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Send, CheckCircle2 } from "lucide-react";

const initialState = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // NOTE: Wire this up to your email/CRM service (e.g. Formspree, EmailJS,
    // or a backend endpoint). This demo just simulates a network call.
    setTimeout(() => {
      setStatus("sent");
      setForm(initialState);
    }, 900);
  };

  const fields = [
    { name: "name", type: "text", labelKey: "form.name", placeholderKey: "form.namePlaceholder", full: false },
    { name: "email", type: "email", labelKey: "form.email", placeholderKey: "form.emailPlaceholder", full: false },
    { name: "phone", type: "tel", labelKey: "form.phone", placeholderKey: "form.phonePlaceholder", full: false },
    { name: "subject", type: "text", labelKey: "form.subject", placeholderKey: "form.subjectPlaceholder", full: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <h3 className="font-display text-xl font-semibold text-dark">{t("contact.formTitle")}</h3>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label htmlFor={f.name} className="text-xs font-semibold uppercase tracking-wide text-primary/80">
              {t(`contact.${f.labelKey}`)}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required
              value={form[f.name]}
              onChange={handleChange}
              placeholder={t(`contact.${f.placeholderKey}`)}
              className="rounded-lg border border-primary/15 bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        ))}

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-primary/80">
            {t("contact.form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            placeholder={t("contact.form.messagePlaceholder")}
            className="resize-none rounded-lg border border-primary/15 bg-bg px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark disabled:opacity-60 sm:w-auto"
          >
            <Send size={16} />
            {status === "sending" ? t("contact.form.sending") : t("contact.form.submit")}
          </button>

          <AnimatePresence>
            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-center gap-2 text-sm font-medium text-secondary"
              >
                <CheckCircle2 size={16} />
                {t("contact.form.success")}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
}
