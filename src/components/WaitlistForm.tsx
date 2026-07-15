"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check, Copy, MessageCircle, Flame } from "lucide-react";
import { AREAS, WAITLIST_BASE_COUNT, WHATSAPP_SHARE_TEXT, type Area } from "@/lib/config";
import { track } from "@/lib/analytics";
import MagneticButton from "@/components/MagneticButton";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "revo_waitlist_signups";

type Signup = {
  email: string;
  name: string;
  username: string;
  area: string;
  date: string;
  refId: string;
  position: number;
};

function readSignups(): Signup[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function WaitlistForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    area: "" as Area | "",
    areaOther: "",
  });
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [queuePosition, setQueuePosition] = useState(0);
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(formData.email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");

    const signups = readSignups();
    const existing = signups.find((s) => s.email.toLowerCase() === formData.email.toLowerCase());
    if (existing) {
      setFormData((prev) => ({
        ...prev,
        name: existing.name,
        username: existing.username,
        area: existing.area as Area,
      }));
      setQueuePosition(existing.position);
      setReferralCode(existing.refId);
      setIsReturning(true);
      setStep(3);
      return;
    }

    const baseUsername = formData.email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    setFormData((prev) => ({ ...prev, username: baseUsername }));
    setIsReturning(false);
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedArea = formData.area === "Other" ? formData.areaOther.trim() : formData.area;

    if (!formData.name || !formData.username || !formData.area || (formData.area === "Other" && !resolvedArea)) {
      setError("Please fill out all required fields.");
      return;
    }
    setError("");

    try {
      const signups = readSignups();

      const isUsernameTaken = signups.some((s) => s.username.toLowerCase() === formData.username.toLowerCase());
      if (isUsernameTaken) {
        setError("This username is already claimed.");
        return;
      }

      const position = WAITLIST_BASE_COUNT + signups.length + 1;
      const newSignup: Signup = {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        area: resolvedArea,
        date: new Date().toISOString(),
        refId: Math.random().toString(36).substring(2, 8).toUpperCase(),
        position,
      };
      signups.push(newSignup);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));

      setQueuePosition(position);
      setReferralCode(newSignup.refId);
      track("waitlist_submit", { area: resolvedArea });
      setStep(3);
    } catch (err) {
      console.error(err);
      setStep(3);
    }
  };

  const referralLink = `https://revo.run/waitlist?ref=${referralCode || "JOIN"}`;

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    track("referral_copy");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    track("whatsapp_share");
    window.open(`https://wa.me/?text=${encodeURIComponent(WHATSAPP_SHARE_TEXT(referralLink))}`, "_blank");
  };

  return (
    <div className="w-full text-left">
      <AnimatePresence mode="wait">

        {step === 1 && (
          <motion.form
            key="rf-step1"
            onSubmit={handleEmailSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="flex items-stretch gap-2 rounded-2xl bg-white/[0.05] border border-white/15 p-1.5 focus-within:border-[#FF5A1F] focus-within:bg-white/[0.08] transition-colors">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => {
                  setEmailError("");
                  setFormData({ ...formData, email: e.target.value });
                }}
                placeholder="you@example.com"
                className="flex-grow bg-transparent px-4 text-[15px] font-sans text-white placeholder-white/35 focus:outline-none min-w-0"
              />
              <MagneticButton strength={0.25}>
                <button
                  type="submit"
                  className="group flex items-center gap-1.5 bg-[#FF5A1F] hover:bg-[#ff7038] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
                >
                  Get on the list
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>
            </div>
            {emailError && <p className="mt-2 pl-1 text-[11px] font-semibold text-[#FF8A5B]">{emailError}</p>}
          </motion.form>
        )}

        {step === 2 && (
          <motion.div
            key="rf-step2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md mx-auto rounded-3xl border border-white/10 bg-[#20203a] p-7 shadow-2xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF8A5B] mb-1.5">One more step</p>
            <h3 className="font-display text-3xl tracking-wide text-white mb-6">Claim your handle.</h3>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5A1F]/60 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1.5">Handle</label>
                <div className="flex items-center rounded-xl bg-white/[0.05] border border-white/10 focus-within:border-[#FF5A1F]/60 transition-colors">
                  <span className="pl-4 text-sm text-white/30">@</span>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => {
                      setError("");
                      setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "") });
                    }}
                    className="w-full bg-transparent pl-1 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Your patch of the city</label>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setError("");
                        setFormData({ ...formData, area: a });
                      }}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-all ${
                        formData.area === a
                          ? "bg-[#FF5A1F] border-[#FF5A1F] text-[#1A1A2E] scale-[1.03]"
                          : "bg-transparent border-white/15 text-white/60 hover:border-white/40"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                {formData.area === "Other" && (
                  <input
                    type="text"
                    required
                    value={formData.areaOther}
                    onChange={(e) => setFormData({ ...formData, areaOther: e.target.value })}
                    placeholder="Which neighbourhood?"
                    className="w-full mt-2.5 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF5A1F]/60"
                  />
                )}
              </div>

              {error && <p className="text-[11px] font-semibold text-[#FF8A5B]">{error}</p>}

              <MagneticButton className="block w-full" strength={0.12}>
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#FF5A1F] hover:bg-[#ff7038] text-[#1A1A2E] text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Lock it in
                </button>
              </MagneticButton>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="rf-step3"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="w-full max-w-md mx-auto relative"
          >
            {/* Radiating burst behind the ticket */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 -z-10 rounded-[28px] bg-[#FF5A1F] blur-[60px] opacity-20"
            />

            <div className="rounded-[28px] border border-white/10 bg-[#20203a] shadow-2xl overflow-hidden">
              <div className="relative px-7 pt-7 pb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -25 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.15 }}
                  className="w-11 h-11 rounded-full bg-[#FF5A1F] flex items-center justify-center mb-5"
                >
                  <Check className="w-5 h-5 text-[#1A1A2E]" strokeWidth={3} />
                </motion.div>

                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF8A5B] mb-1.5">
                  {isReturning ? "Already claimed" : "Mark secured"}
                </p>
                <h3 className="font-display text-4xl tracking-wide text-white leading-none mb-3">
                  {isReturning ? "Welcome back." : "You're in."}
                </h3>
                <p className="text-sm text-white/50">
                  Runner <span className="font-mono text-white">@{formData.username}</span> ·{" "}
                  {formData.area === "Other" ? formData.areaOther : formData.area}
                </p>
              </div>

              {/* Perforated tear line */}
              <div
                className="h-0 border-t-2 border-dashed border-white/15 relative"
                style={{
                  maskImage: "radial-gradient(circle at 0 0, transparent 8px, black 8.5px), radial-gradient(circle at 100% 0, transparent 8px, black 8.5px)",
                }}
              />

              <div className="px-7 py-6 flex items-end justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Your mark</p>
                  <p className="font-display text-5xl text-[#FF5A1F] tabular-nums leading-none">
                    #{queuePosition.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mb-1">Invite code</p>
                  <p className="font-mono text-sm font-bold text-white">{referralCode}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-white/60 mb-3">
                <Flame className="w-3.5 h-3.5 text-[#FF5A1F]" />
                Every friend who joins moves you up 10 spots.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={shareOnWhatsApp}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider bg-[#25D366] text-[#1A1A2E] hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </button>
                <button
                  onClick={copyReferralLink}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    copied ? "bg-[#FF5A1F] text-[#1A1A2E]" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy link"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
