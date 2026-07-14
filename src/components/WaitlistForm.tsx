"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Copy, MessageCircle } from "lucide-react";
import { AREAS, WAITLIST_BASE_COUNT, WHATSAPP_SHARE_TEXT, type Area } from "@/lib/config";
import { track } from "@/lib/analytics";

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

export default function WaitlistForm({ dark = false }: { dark?: boolean }) {
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

        {/* STEP 1: Minimalist Inline Email Capsule */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <form onSubmit={handleEmailSubmit} className="relative">
              <div className={`flex items-center rounded-full p-1.5 transition-all duration-300 ${
                dark
                  ? "bg-white/10 border border-white/20 backdrop-blur focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20"
                  : "bg-white border border-gray-200 focus-within:border-gray-400 shadow-sm"
              }`}>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setEmailError("");
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  placeholder="Enter email to join waitlist"
                  className={`bg-transparent text-sm font-sans pl-5 pr-2 py-3 flex-grow focus:outline-none min-w-0 ${
                    dark
                      ? "text-white placeholder-white/50"
                      : "text-gray-900 placeholder-gray-400"
                  }`}
                />
                <button
                  type="submit"
                  className={`text-[10px] font-sans font-bold px-7 py-3.5 rounded-full uppercase tracking-widest transition duration-200 flex items-center justify-center gap-1 active:scale-[0.97] shrink-0 ${
                    dark
                      ? "bg-emerald-500 hover:bg-emerald-400 text-white"
                      : "bg-[#1F2937] hover:bg-black text-white"
                  }`}
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {emailError && (
                <p className="text-[10px] font-sans font-bold text-red-500 mt-2 pl-4">
                  {emailError}
                </p>
              )}
            </form>
          </motion.div>
        )}

        {/* STEP 2: Smooth profiling form */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-md border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl mx-auto ${dark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-100'}`}
          >
            <div className="space-y-1">
              <h3 className={`font-display font-bold text-2xl tracking-tight ${dark ? 'text-white' : 'text-gray-900'}`}>Claim your handle</h3>
              <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>You're almost on the list.</p>
            </div>

            <form onSubmit={handleFinalSubmit} className="space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${dark ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-400'}`}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Username</label>
                    <div className="relative">
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm ${dark ? 'text-gray-500' : 'text-gray-400'}`}>@</span>
                      <input
                        type="text"
                        required
                        value={formData.username}
                        onChange={(e) => {
                          setError("");
                          setFormData({ ...formData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') });
                        }}
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${dark ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-400'}`}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Your Area</label>
                    <div className="flex flex-wrap gap-2">
                      {AREAS.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => {
                            setError("");
                            setFormData({ ...formData, area: a });
                          }}
                          className={`px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wide border transition-colors ${
                            formData.area === a
                              ? "bg-[#16A34A] border-[#16A34A] text-white"
                              : dark
                                ? "bg-white/5 border-white/10 text-gray-300 hover:border-white/30"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400"
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
                        className={`w-full mt-2.5 px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors ${dark ? 'bg-white/5 border-white/10 text-white focus:border-emerald-500/50' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-gray-400'}`}
                      />
                    )}
                  </div>
                </div>
                {error && <p className="text-[10px] font-bold text-red-500 mt-1">{error}</p>}
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-transform active:scale-[0.98] ${dark ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-gray-900 hover:bg-black text-white'}`}
              >
                Complete Registration
              </button>
            </form>
          </motion.div>
        )}

        {/* STEP 3: Success / Returning Ticket */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`w-full max-w-md border rounded-3xl overflow-hidden shadow-2xl relative mx-auto ${dark ? 'bg-[#0f172a] border-white/10' : 'bg-white border-gray-200'}`}
          >
            <div className="p-8 pb-6 border-b border-dashed border-gray-200 relative">
              <motion.div
                className="absolute top-0 right-0 p-4"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.15 }}
              >
                <Check className="w-5 h-5 text-emerald-500" />
              </motion.div>
              <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-2">
                {isReturning ? "Already On The List" : "Waitlist Confirmed"}
              </p>
              <h3 className={`font-display font-black text-3xl mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                {isReturning ? "Welcome back." : "You're in."}
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className={`text-sm font-bold tabular-nums ${dark ? 'text-emerald-400' : 'text-[#16A34A]'}`}
              >
                Mark #{queuePosition.toLocaleString()} claimed.
              </motion.p>

              <div className="mt-8 space-y-4">
                <div>
                  <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Runner Handle</p>
                  <p className={`font-mono text-lg font-medium ${dark ? 'text-emerald-400' : 'text-gray-900'}`}>@{formData.username}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Queue Position</p>
                    <p className={`font-mono text-xl font-bold tabular-nums ${dark ? 'text-white' : 'text-gray-900'}`}>#{queuePosition.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Area</p>
                    <p className={`font-mono text-sm font-medium pt-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {formData.area === "Other" ? formData.areaOther : formData.area}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-6 ${dark ? 'bg-[#1e293b]' : 'bg-gray-50'}`}>
              <p className={`text-[10px] font-bold mb-3 ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
                Move up the list — every friend who joins bumps you 10 spots.
              </p>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className={`text-[9px] uppercase tracking-widest font-bold mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Invite Code</p>
                  <p className={`font-mono font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{referralCode}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={shareOnWhatsApp}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors bg-[#25D366] text-white hover:bg-[#20bd5a]"
                  >
                    <MessageCircle className="w-3 h-3" />
                    WhatsApp
                  </button>
                  <button
                    onClick={copyReferralLink}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${copied ? 'bg-emerald-500 text-white' : dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white border text-gray-700 hover:bg-gray-50'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
