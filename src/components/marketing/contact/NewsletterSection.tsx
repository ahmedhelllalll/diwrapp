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
      <div className="newsletter-container">
        {/* Left Column: Heading & Subtitle */}
        <div className="newsletter-text-col">
          <h2 className="newsletter-title">
            {dict?.title || "Newsletter"}
          </h2>
          <p className="newsletter-desc">
            {dict?.description || "Subscribe to our newsletter to get early news and topics of your choice."}
          </p>
        </div>

        {/* Right Column: Input & Button */}
        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <div className="relative w-full sm:w-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={dict?.inputPlaceholder || "Enter email"}
              className="newsletter-input"
              aria-label="Email address for newsletter"
            />
            {status === "success" && (
              <span className="absolute -bottom-6 left-0 text-xs text-emerald-600 dark:text-emerald-400">
                {isRtl ? "تم الاشتراك بنجاح!" : "Thank you for subscribing!"}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="newsletter-btn"
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
