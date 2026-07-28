import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, Smartphone, HeartHandshake } from "lucide-react";
import logo from "../assets/logo.png";

// ── Replace with your real UPI details ──────────────────────────────────
const UPI_ID = "8939243699-2@ybl";
const PAYEE_NAME = "Annapparavai Ilaignar Nalasangam";
// ─────────────────────────────────────────────────────────────────────────

const PRESET_AMOUNTS = [100, 500, 1000];

export default function DonateModal({ open, onClose }) {
    const { t } = useTranslation();
    const [selectedAmount, setSelectedAmount] = useState(500);
    const [customAmount, setCustomAmount] = useState("");
    const [isCustom, setIsCustom] = useState(false);
    const [copied, setCopied] = useState(false);

    const amount = isCustom ? Number(customAmount) || 0 : selectedAmount;

    // Standard UPI deep-link format. Any UPI app (GPay, PhonePe, Paytm, BHIM...)
    // can open this link directly, and any UPI app's camera can scan a QR
    // encoding this same string.
    const upiLink = useMemo(() => {
        const params = new URLSearchParams({
            pa: UPI_ID,
            pn: PAYEE_NAME,
            cu: "INR",
            tn: "Donation",
        });
        if (amount > 0) params.set("am", String(amount));
        return `upi://pay?${params.toString()}`;
    }, [amount]);

    useEffect(() => {
        if (open) setCopied(false);
    }, [open]);

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        if (open) document.addEventListener("keydown", onKey);
        document.body.style.overflow = open ? "hidden" : "";
        return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(UPI_ID);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard API unavailable (e.g. insecure context) — silently ignore
        }
    };

    const selectPreset = (value) => {
        setIsCustom(false);
        setSelectedAmount(value);
    };

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 px-4 py-8 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
                    >
                        {/* header */}
                        <div className="seal-ring relative overflow-hidden px-6 py-5 text-center text-white">
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                            >
                                <X size={16} />
                            </button>
                            <img
                                src={logo}
                                alt={PAYEE_NAME}
                                className="mx-auto h-14 w-14 rounded-full ring-2 ring-white/80"
                            />
                            <h3 className="font-display mt-2 text-lg font-bold">{t("donate.title")}</h3>
                            <p className="mt-0.5 text-xs text-white/85">{t("donate.subtitle")}</p>
                        </div>

                        <div className="px-6 py-6">
                            {/* amount selection */}
                            <p className="text-xs font-bold uppercase tracking-wide text-primary/80">
                                {t("donate.chooseAmount")}
                            </p>
                            <div className="mt-3 grid grid-cols-4 gap-2">
                                {PRESET_AMOUNTS.map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => selectPreset(value)}
                                        className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${!isCustom && selectedAmount === value
                                                ? "border-primary bg-primary text-white"
                                                : "border-primary/20 bg-bg text-ink/70 hover:border-primary/50"
                                            }`}
                                    >
                                        ₹{value}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setIsCustom(true)}
                                    className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${isCustom
                                            ? "border-primary bg-primary text-white"
                                            : "border-primary/20 bg-bg text-ink/70 hover:border-primary/50"
                                        }`}
                                >
                                    {t("donate.custom")}
                                </button>
                            </div>

                            <AnimatePresence>
                                {isCustom && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-3 flex items-center gap-2 rounded-xl border border-primary/20 bg-bg px-4 py-2.5">
                                            <span className="text-sm font-semibold text-ink/60">₹</span>
                                            <input
                                                type="number"
                                                min="1"
                                                autoFocus
                                                value={customAmount}
                                                onChange={(e) => setCustomAmount(e.target.value)}
                                                placeholder={t("donate.customPlaceholder")}
                                                className="w-full bg-transparent text-sm text-ink outline-none"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* QR code */}
                            <div className="mt-6 flex flex-col items-center rounded-2xl border border-primary/10 bg-bg px-6 py-6">
                                <div className="rounded-xl bg-white p-3 shadow-sm">
                                    <QRCodeSVG value={upiLink} size={176} fgColor="#0D4F2B" level="M" />
                                </div>
                                <p className="mt-3 text-center text-xs text-ink/60">{t("donate.scanHint")}</p>

                                <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-lg border border-primary/15 bg-white px-3 py-2">
                                    <span className="truncate text-sm font-medium text-dark">{UPI_ID}</span>
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                                    >
                                        {copied ? <Check size={13} /> : <Copy size={13} />}
                                        {copied ? t("donate.copied") : t("donate.copy")}
                                    </button>
                                </div>
                            </div>

                            {/* mobile deep-link button */}
                            <a
                                href={upiLink}
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:bg-maroon/90"
                            >
                                <Smartphone size={17} />
                                {t("donate.payButton", {
                                    amount: amount > 0 ? `₹${amount}` : "",
                                })}
                            </a>
                            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink/45">
                                <HeartHandshake size={13} className="text-gold" />
                                {t("donate.thanksNote")}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}