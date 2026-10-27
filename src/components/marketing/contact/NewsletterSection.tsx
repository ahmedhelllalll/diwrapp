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
    <section 
      className="newsletter-section border-t border-[#EAECF0] dark:border-[#27272A] bg-[#F2F4F7] dark:bg-[#0a0a0a] transition-colors duration-300 py-12 sm:py-14" 
      aria-label={isRtl ? "الاشتراك في النشرة الإخبارية" : "Newsletter Subscription"}
    >
      <div className="newsletter-container site-container w-full max-w-[2520px] mx-auto px-6 sm:px-10 xl:px-20 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-start">
        {/* Heading & Description */}
        <div className="newsletter-text-col text-center mx-auto max-w-[380px] sm:max-w-md lg:max-w-xl lg:mx-0 lg:text-start mb-6 lg:mb-0">
          <h2 className="newsletter-title text-[28px] sm:text-3xl font-bold tracking-tight text-[#101828] dark:text-white">
            {dict?.title || (isRtl ? "النشرة الإخبارية" : "Newsletter")}
          </h2>
          <p className="newsletter-desc text-[#344054] dark:text-zinc-300 text-sm sm:text-base mt-2.5 max-w-[340px] mx-auto lg:mx-0">
            {dict?.description || (isRtl ? "اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والموضوعات التي تهمك." : "Subscribe to our newsletter to get early news and topics of your choice.")}
          </p>
        </div>

        {/* Input & Button: Stacked on mobile, row on desktop */}
        <form className="newsletter-form w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none mx-auto lg:mx-0 flex flex-col lg:flex-row items-stretch lg:items-center gap-3.5 lg:gap-3" onSubmit={handleSubscribe}>
          <div className="relative flex-1 w-full lg:w-auto">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict?.inputPlaceholder || (isRtl ? "أدخل البريد الإلكتروني" : "Enter email")}
              className="newsletter-input w-full h-12 rounded-xl border border-[#D0D5DD] dark:border-[#27272A] bg-white dark:bg-[#0a0a0a] px-4 text-base sm:text-sm text-[#101828] dark:text-zinc-100 placeholder:text-[#98A2B3] dark:placeholder:text-zinc-500 focus-visible:border-slate-400 focus-visible:dark:border-zinc-500 focus-visible:ring-2 focus-visible:ring-brand/20 outline-none transition-colors duration-200"
              aria-label={dict?.inputPlaceholder || (isRtl ? "أدخل البريد الإلكتروني" : "Enter email")}
            />
            {status === "success" && (
              <span className="absolute -bottom-6 start-0 text-xs font-medium text-emerald-600 dark:text-emerald-400" role="status">
                {isRtl ? "تم الاشتراك بنجاح!" : "Thank you for subscribing!"}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="newsletter-btn w-full lg:w-auto h-12 px-6 rounded-xl bg-[#101828] dark:bg-white text-white dark:text-slate-950 font-semibold text-base sm:text-sm hover:bg-[#1D2939] hover:dark:bg-zinc-100 transition-colors shadow-xs active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shrink-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            {status === "loading"
              ? (isRtl ? "جاري الإرسال..." : "Subscribing...")
              : dict?.button || (isRtl ? "اشتراك" : "Subscribe")}
          </button>
        </form>
      </div>
    </section>
  );
}

