'use client';

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, NavArrowDown } from "iconoir-react";

interface FormDict {
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  subjectLabel?: string;
  subjectPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  charLimit?: string;
  submitButton?: string;
}

interface ContactFormProps {
  lang: string;
  dict?: FormDict;
  cardsSlot?: React.ReactNode;
}

// Crisp fully rounded/circular flag SVGs (w-5 h-5 / 20x20)
function UsFlag({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-label="United States"
    >
      <circle cx="10" cy="10" r="10" fill="#B22234" />
      <mask id="us-circle-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask="url(#us-circle-mask)">
        <rect y="1.54" width="20" height="1.54" fill="white" />
        <rect y="4.62" width="20" height="1.54" fill="white" />
        <rect y="7.69" width="20" height="1.54" fill="white" />
        <rect y="10.77" width="20" height="1.54" fill="white" />
        <rect y="13.85" width="20" height="1.54" fill="white" />
        <rect y="16.92" width="20" height="1.54" fill="white" />
        <rect width="10" height="10.77" fill="#1E3A8A" />
        <circle cx="2.2" cy="2" r="0.6" fill="white" />
        <circle cx="5" cy="2" r="0.6" fill="white" />
        <circle cx="7.8" cy="2" r="0.6" fill="white" />
        <circle cx="3.6" cy="4.5" r="0.6" fill="white" />
        <circle cx="6.4" cy="4.5" r="0.6" fill="white" />
        <circle cx="2.2" cy="7" r="0.6" fill="white" />
        <circle cx="5" cy="7" r="0.6" fill="white" />
        <circle cx="7.8" cy="7" r="0.6" fill="white" />
        <circle cx="3.6" cy="9.2" r="0.6" fill="white" />
        <circle cx="6.4" cy="9.2" r="0.6" fill="white" />
      </g>
    </svg>
  );
}

function SaFlag({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-label="Saudi Arabia"
    >
      <circle cx="10" cy="10" r="10" fill="#006C35" />
      <mask id="sa-circle-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask="url(#sa-circle-mask)">
        <path d="M4 9h12v1.5H4zM6 12h8v1H6z" fill="white" opacity="0.95" />
      </g>
    </svg>
  );
}

function AeFlag({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-label="UAE"
    >
      <circle cx="10" cy="10" r="10" fill="white" />
      <mask id="ae-circle-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask="url(#ae-circle-mask)">
        <rect width="20" height="6.67" fill="#00732F" />
        <rect y="6.67" width="20" height="6.67" fill="white" />
        <rect y="13.33" width="20" height="6.67" fill="#000000" />
        <rect width="6" height="20" fill="#FF0000" />
      </g>
    </svg>
  );
}

function GbFlag({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-label="United Kingdom"
    >
      <circle cx="10" cy="10" r="10" fill="#012169" />
      <mask id="gb-circle-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask="url(#gb-circle-mask)">
        <path d="M0 0l20 20M20 0L0 20" stroke="white" strokeWidth="3" />
        <path d="M0 0l20 20M20 0L0 20" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M10 0v20M0 10h20" stroke="white" strokeWidth="5" />
        <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="3" />
      </g>
    </svg>
  );
}

const COUNTRIES = [
  { code: "+1", name: "United States", FlagComponent: UsFlag, iso: "us" },
  { code: "+966", name: "Saudi Arabia", FlagComponent: SaFlag, iso: "sa" },
  { code: "+971", name: "United Arab Emirates", FlagComponent: AeFlag, iso: "ae" },
  { code: "+44", name: "United Kingdom", FlagComponent: GbFlag, iso: "gb" },
];

export default function ContactForm({ lang, dict, cardsSlot }: ContactFormProps) {
  const isRtl = lang === "ar";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+1",
    phone: "",
    subject: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const maxChars = 250;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > maxChars) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setFormData((prev) => ({ ...prev, countryCode: country.code }));
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        countryCode: selectedCountry.code,
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 600);
  };

  const SelectedFlag = selectedCountry.FlagComponent;

  return (
    <form className="contact-form contact-form-container w-full" onSubmit={handleSubmit} noValidate>
      <div className="contact-content-grid grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-10 items-stretch w-full">
        {/* Left Column: Exactly equal in height to the inputs container */}
        {cardsSlot && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="contact-cards-column w-full lg:col-span-6 lg:row-start-1 h-full flex flex-col"
          >
            {cardsSlot}
          </motion.div>
        )}

        {/* Right Column: All inputs from Name down to Message textarea */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`contact-form-fields ${cardsSlot ? 'w-full lg:col-span-6 lg:col-start-7 lg:row-start-1' : 'w-full'} flex flex-col gap-4 h-full`}
        >
          {/* Row 1: Name & Email */}
          <div className="contact-form-row grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Your Name */}
            <div className="contact-field-group">
              <label htmlFor="contact-name" className="contact-label text-left rtl:text-right text-slate-800 dark:text-zinc-200 font-medium text-sm">
                <span>{dict?.nameLabel || "Your name"}</span>
                <span className="contact-required text-rose-500 dark:text-rose-400 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder={dict?.namePlaceholder || "Enter name"}
                className="contact-input rounded-xl border border-slate-300 dark:border-white/[0.09] bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus:border-slate-400 focus:dark:border-white/30 focus:dark:ring-1 focus:dark:ring-white/20 outline-none w-full transition-all"
              />
            </div>

            {/* Your Email */}
            <div className="contact-field-group">
              <label htmlFor="contact-email" className="contact-label text-left rtl:text-right text-slate-800 dark:text-zinc-200 font-medium text-sm">
                <span>{dict?.emailLabel || "Your email"}</span>
                <span className="contact-required text-rose-500 dark:text-rose-400 ml-1" aria-hidden="true">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder={dict?.emailPlaceholder || "Enter email"}
                className="contact-input rounded-xl border border-slate-300 dark:border-white/[0.09] bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus:border-slate-400 focus:dark:border-white/30 focus:dark:ring-1 focus:dark:ring-white/20 outline-none w-full transition-all"
              />
            </div>
          </div>

          {/* Row 2: Phone Input with Country Code Dropdown */}
          <div className="contact-field-group">
            <label htmlFor="contact-phone" className="contact-label text-left rtl:text-right text-slate-800 dark:text-zinc-200 font-medium text-sm">
              <span>{dict?.phoneLabel || (isRtl ? "رقم الهاتف" : "Phone number")}</span>
            </label>
            <div 
              className="contact-phone-group relative border border-slate-300 dark:border-white/[0.09] bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] focus-within:border-slate-400 focus-within:dark:border-white/30 focus-within:dark:ring-1 focus-within:dark:ring-white/20 rounded-xl w-full transition-all"
              dir="ltr"
            >
              <div className="relative h-full flex items-center shrink-0">
                <button
                  type="button"
                  className="contact-country-trigger flex items-center gap-1.5 px-3 h-full border-r border-slate-300 dark:border-white/[0.09] bg-transparent hover:bg-slate-100/50 dark:hover:bg-white/[0.04] transition-colors cursor-pointer outline-none shrink-0"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isCountryDropdownOpen}
                  aria-label="Select country code"
                >
                  <SelectedFlag className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 font-sans" dir="ltr" style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}>{selectedCountry.code}</span>
                  <NavArrowDown width={14} height={14} className="w-3.5 h-3.5 text-slate-800 dark:text-zinc-200 shrink-0" aria-hidden="true" />
                </button>

                {/* Country Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1.5 w-52 bg-white/95 dark:bg-zinc-900/90 dark:backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] rounded-xl shadow-xl z-30 py-1.5 overflow-hidden"
                    role="listbox"
                    dir="ltr"
                  >
                    {COUNTRIES.map((c) => {
                      const Flag = c.FlagComponent;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          role="option"
                          aria-selected={selectedCountry.code === c.code}
                          onClick={() => handleCountrySelect(c)}
                          className="w-full px-3.5 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-slate-900 dark:text-zinc-100"
                        >
                          <span className="flex items-center gap-2">
                            <Flag className="w-4 h-4 rounded-full overflow-hidden shrink-0" />
                            <span className="font-medium">{c.name}</span>
                          </span>
                          <span className="text-slate-500 dark:text-zinc-400 font-sans">{c.code}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <input
                id="contact-phone"
                name="phone"
                type="tel"
                dir="ltr"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={dict?.phonePlaceholder || "+1 (000) 000 - 0000"}
                className="contact-phone-input placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none text-left w-full bg-transparent"
              />
            </div>
          </div>

          {/* Row 3: Subject */}
          <div className="contact-field-group">
            <label htmlFor="contact-subject" className="contact-label text-left rtl:text-right text-slate-800 dark:text-zinc-200 font-medium text-sm">
              <span>{dict?.subjectLabel || "Subject"}</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder={dict?.subjectPlaceholder || "Enter Subject"}
              className="contact-input rounded-xl border border-slate-300 dark:border-white/[0.09] bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus:border-slate-400 focus:dark:border-white/30 focus:dark:ring-1 focus:dark:ring-white/20 outline-none w-full transition-all"
            />
          </div>

          {/* Row 4: Message */}
          <div className="contact-field-group">
            <label htmlFor="contact-message" className="contact-label text-left rtl:text-right text-slate-800 dark:text-zinc-200 font-medium text-sm">
              <span>{dict?.messageLabel || "Message"}</span>
            </label>
            <div className="contact-textarea-wrapper">
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={dict?.messagePlaceholder || "Type here..."}
                className="contact-textarea rounded-xl border border-slate-300 dark:border-white/[0.09] bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus:border-slate-400 focus:dark:border-white/30 focus:dark:ring-1 focus:dark:ring-white/20 outline-none w-full transition-all"
              />
              <span className="contact-char-count text-slate-500 dark:text-zinc-400 text-xs font-mono select-none" aria-live="polite">
                {formData.message.length}/{maxChars}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Submit Action: Explicitly full-width on mobile/tablet, right-aligned on desktop lg below fields */}
        <div className={`contact-form-actions ${cardsSlot ? 'w-full lg:col-span-6 lg:col-start-7 lg:row-start-2' : 'w-full'} flex flex-col items-stretch lg:items-end rtl:lg:items-start mt-2 md:mt-4 lg:mt-6`}>
          {/* Form Submission Confirmation Notice */}
          {isSuccess && (
            <div className="w-full p-3.5 mb-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm">
              {isRtl
                ? "تم استلام رسالتك بنجاح! سيتواصل فريقنا معك قريبًا."
                : "Your message has been received! Our team will get back to you shortly."}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-btn-submit w-full lg:w-auto flex items-center justify-center gap-2 py-3.5 lg:py-3 lg:px-7 rounded-xl text-sm font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2 md:mt-0"
          >
            <span>{isSubmitting ? (isRtl ? "جاري الإرسال..." : "Sending...") : dict?.submitButton || "Submit"}</span>
            {isRtl ? (
              <ArrowLeft width={16} height={16} strokeWidth={2} className="contact-btn-icon shrink-0" aria-hidden="true" />
            ) : (
              <ArrowRight width={16} height={16} strokeWidth={2} className="contact-btn-icon shrink-0" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
