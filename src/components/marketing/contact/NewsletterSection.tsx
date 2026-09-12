'use client';

import React, { useState } from "react";

interface NewsletterDict {
  title?: string;
  description?: string;
  inputPlaceholder?: string;
  button?: string;
}

interface NewsletterSectionProps {
  dict?: NewsletterDict;
  lang?: string;
}

export default function NewsletterSection({ dict, lang = "en" }: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const isRtl = lang === "ar";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    }, 600);
  };

  return (
    <section className="newsletter-section" aria-label="Newsletter Subscription">
      <div className="newsletter-container flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left rtl:lg:text-right">
        {/* Heading & Description */}
        <div className="newsletter-text-col text-center mx-auto max-w-md lg:mx-0 lg:text-left rtl:lg:text-right">
          <h2 className="newsletter-title text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">
            {dict?.title || "Newsletter"}
          </h2>
          <p className="newsletter-desc text-slate-600 dark:text-zinc-300 text-sm mt-1.5">
            {dict?.description || "Subscribe to our newsletter to get early news and topics of your choice."}
          </p>
        </div>

        {/* Input & Button: Stacked vertically and centered on mobile/tablet */}
        <form className="newsletter-form w-full max-w-md mx-auto flex flex-col items-center lg:flex-row lg:w-auto lg:mx-0 gap-0 lg:gap-3" onSubmit={handleSubscribe}>
          <div className="relative w-full max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict?.inputPlaceholder || "Enter email"}
              className="newsletter-input w-full max-w-md mx-auto text-center md:text-left rtl:md:text-right rounded-xl border border-slate-300 dark:border dark:border-zinc-700/80 bg-white dark:bg-[#0c0f14] py-3 px-4 mb-3 lg:mb-0 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400 focus:border-slate-400 focus:dark:border-zinc-400 focus:ring-1 focus:ring-slate-400 dark:focus:ring-zinc-400 outline-none"
              aria-label="Email address for newsletter"
            />
            {status === "success" && (
              <span className="absolute -bottom-6 left-0 right-0 text-center lg:text-left rtl:lg:text-right text-xs text-emerald-600 dark:text-emerald-400">
                {isRtl ? "تم الاشتراك بنجاح!" : "Thank you for subscribing!"}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="newsletter-btn w-full max-w-md mx-auto py-3 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-black font-semibold text-sm hover:bg-slate-800 hover:dark:bg-zinc-200 transition-colors shadow-xs active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shrink-0 lg:w-auto lg:px-6"
          >
            {status === "loading"
              ? (isRtl ? "جاري الإرسال..." : "Subscribing...")
              : dict?.button || "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
