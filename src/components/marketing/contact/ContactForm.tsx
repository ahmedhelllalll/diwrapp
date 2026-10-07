'use client';

import React, { useState, useRef, useEffect, useId } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowLeft, NavArrowDown, Mail, CheckCircle, WarningTriangle } from "iconoir-react";

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
  sendingButton?: string;
  selectCountryCode?: string;
  privacyNotice?: {
    pre?: string;
    linkText?: string;
    post?: string;
  };
  validation?: {
    nameRequired?: string;
    emailRequired?: string;
    emailInvalid?: string;
    messageRequired?: string;
    messageMin?: string;
  };
  successMessage?: string;
  fallback?: {
    title?: string;
    description?: string;
    mailtoButton?: string;
  };
}

interface ContactFormProps {
  lang: string;
  dict?: FormDict;
  cardsSlot?: React.ReactNode;
}

// Crisp fully rounded/circular flag SVGs (20x20)
function UsFlag({ className = "w-5 h-5" }: { className?: string }) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#B22234" />
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
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
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#006C35" />
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path d="M4 9h12v1.5H4zM6 12h8v1H6z" fill="white" opacity="0.95" />
      </g>
    </svg>
  );
}

function AeFlag({ className = "w-5 h-5" }: { className?: string }) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="white" />
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <rect width="20" height="6.67" fill="#00732F" />
        <rect y="6.67" width="20" height="6.67" fill="white" />
        <rect y="13.33" width="20" height="6.67" fill="#000000" />
        <rect width="6" height="20" fill="#FF0000" />
      </g>
    </svg>
  );
}

function GbFlag({ className = "w-5 h-5" }: { className?: string }) {
  const maskId = useId();
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="10" fill="#012169" />
      <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
        <circle cx="10" cy="10" r="10" fill="white" />
      </mask>
      <g mask={`url(#${maskId})`}>
        <path d="M0 0l20 20M20 0L0 20" stroke="white" strokeWidth="3" />
        <path d="M0 0l20 20M20 0L0 20" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M10 0v20M0 10h20" stroke="white" strokeWidth="5" />
        <path d="M10 0v20M0 10h20" stroke="#C8102E" strokeWidth="3" />
      </g>
    </svg>
  );
}

const COUNTRIES = [
  { code: "+1", name: "United States", nameAr: "الولايات المتحدة", FlagComponent: UsFlag, iso: "us" },
  { code: "+966", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", FlagComponent: SaFlag, iso: "sa" },
  { code: "+971", name: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", FlagComponent: AeFlag, iso: "ae" },
  { code: "+44", name: "United Kingdom", nameAr: "المملكة المتحدة", FlagComponent: GbFlag, iso: "gb" },
];

const MAX_MESSAGE_LENGTH = 250;

export default function ContactForm({ lang, dict, cardsSlot }: ContactFormProps) {
  const isRtl = lang === "ar";
  const shouldReduceMotion = useReducedMotion();

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
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "fallback">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isCountryDropdownOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null;
      if (dropdownContainerRef.current && target && !dropdownContainerRef.current.contains(target)) {
        setIsCountryDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCountryDropdownOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCountryDropdownOpen]);

  // Validation function
  const validateField = (name: string, value: string): string => {
    if (name === "name") {
      if (!value.trim()) {
        return dict?.validation?.nameRequired || (isRtl ? "يرجى إدخال اسمك" : "Please enter your name");
      }
      if (value.trim().length < 2) {
        return isRtl ? "يجب ألا يقل الاسم عن حرفين" : "Name must be at least 2 characters";
      }
    }
    if (name === "email") {
      if (!value.trim()) {
        return dict?.validation?.emailRequired || (isRtl ? "يرجى إدخال بريدك الإلكتروني" : "Please enter your email address");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value.trim())) {
        return dict?.validation?.emailInvalid || (isRtl ? "يرجى إدخال عنوان بريد إلكتروني صحيح" : "Please enter a valid email address");
      }
    }
    if (name === "message") {
      if (!value.trim()) {
        return dict?.validation?.messageRequired || (isRtl ? "يرجى كتابة رسالتك" : "Please enter your message");
      }
      if (value.trim().length < 10) {
        return dict?.validation?.messageMin || (isRtl ? "يجب ألا تقل الرسالة عن 10 أحرف" : "Message must be at least 10 characters");
      }
    }
    return "";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCountrySelect = (country: typeof COUNTRIES[0]) => {
    setSelectedCountry(country);
    setFormData((prev) => ({ ...prev, countryCode: country.code }));
    setIsCountryDropdownOpen(false);
    triggerRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark required fields as touched
    setTouched({ name: true, email: true, message: true });

    // Validate all fields
    const nameError = validateField("name", formData.name);
    const emailError = validateField("email", formData.email);
    const messageError = validateField("message", formData.message);

    const newErrors: Record<string, string> = {};
    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);

    // Focus first invalid input
    if (nameError) {
      nameInputRef.current?.focus();
      return;
    }
    if (emailError) {
      emailInputRef.current?.focus();
      return;
    }
    if (messageError) {
      messageInputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    try {
      // Attempt API delivery if configured in environment
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      if (apiBaseUrl) {
        const response = await fetch(`${apiBaseUrl.replace(/\/+$/, '')}/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          setSubmitStatus("success");
          setFormData({
            name: "",
            email: "",
            countryCode: selectedCountry.code,
            phone: "",
            subject: "",
            message: "",
          });
          setTouched({});
          return;
        }
      }
      
      // If backend is not yet active in pre-launch, activate honest fallback
      setSubmitStatus("fallback");
    } catch {
      setSubmitStatus("fallback");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SelectedFlag = selectedCountry.FlagComponent;
  const currentCountryName = isRtl ? selectedCountry.nameAr : selectedCountry.name;

  const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${selectedCountry.code} ${formData.phone}\n\nMessage:\n${formData.message}`;
  const mailtoHref = `mailto:support@di-wrapp.com?subject=${encodeURIComponent(formData.subject || (isRtl ? "استفسار عبر موقع دي-راب" : "DiWrapp Contact Inquiry"))}&body=${encodeURIComponent(mailtoBody)}`;

  return (
    <form className="contact-form contact-form-container w-full" onSubmit={handleSubmit} noValidate aria-label={isRtl ? "نموذج التواصل" : "Contact form"}>
      <div className="contact-content-grid grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-10 items-stretch w-full">
        {/* Left Column: Direct Contact Cards Slot */}
        {cardsSlot && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="contact-cards-column w-full lg:col-span-6 lg:row-start-1 h-full flex flex-col"
          >
            {cardsSlot}
          </motion.div>
        )}

        {/* Right Column: Contact Form Inputs */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className={`contact-form-fields ${cardsSlot ? 'w-full lg:col-span-6 lg:col-start-7 lg:row-start-1' : 'w-full'} flex flex-col gap-4 h-full`}
        >
          {/* Row 1: Name & Email */}
          <div className="contact-form-row grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Your Name */}
            <div className="contact-field-group flex flex-col gap-1.5">
              <label htmlFor="contact-name" className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm flex items-center">
                <span>{dict?.nameLabel || (isRtl ? "اسمك" : "Your name")}</span>
                <span className="contact-required text-rose-500 dark:text-rose-400 ms-1" aria-hidden="true">*</span>
              </label>
              <input
                ref={nameInputRef}
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                placeholder={dict?.namePlaceholder || (isRtl ? "أدخل الاسم" : "Enter name")}
                className={`contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border px-3.5 text-base sm:text-sm bg-white dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                  errors.name
                    ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
                    : "border-slate-300 dark:border-white/[0.09] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-white/30"
                }`}
              />
              {errors.name && (
                <p id="contact-name-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Your Email */}
            <div className="contact-field-group flex flex-col gap-1.5">
              <label htmlFor="contact-email" className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm flex items-center">
                <span>{dict?.emailLabel || (isRtl ? "بريدك الإلكتروني" : "Your email")}</span>
                <span className="contact-required text-rose-500 dark:text-rose-400 ms-1" aria-hidden="true">*</span>
              </label>
              <input
                ref={emailInputRef}
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                placeholder={dict?.emailPlaceholder || (isRtl ? "أدخل البريد الإلكتروني" : "Enter email")}
                className={`contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border px-3.5 text-base sm:text-sm bg-white dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                  errors.email
                    ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
                    : "border-slate-300 dark:border-white/[0.09] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-white/30"
                }`}
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone Input with Country Code Dropdown */}
          <div className="contact-field-group flex flex-col gap-1.5">
            <label htmlFor="contact-phone" className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm">
              <span>{dict?.phoneLabel || (isRtl ? "رقم الهاتف" : "Phone number")}</span>
            </label>
            <div 
              className={`contact-phone-group relative ${isCountryDropdownOpen ? 'z-30 is-open' : 'z-0'} border border-slate-300 dark:border-white/[0.09] bg-white dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] focus-within:border-slate-400 focus-within:dark:border-white/30 focus-within:ring-2 focus-within:ring-brand/20 dark:focus-within:ring-white/20 rounded-xl w-full transition-colors duration-200 flex items-center min-h-[44px] h-11 sm:h-12`}
            >
              <div ref={dropdownContainerRef} className="relative h-full flex items-center shrink-0">
                <button
                  ref={triggerRef}
                  type="button"
                  className="contact-country-trigger flex items-center gap-1.5 px-3 h-full border-none bg-transparent hover:bg-transparent dark:hover:bg-transparent transition-colors cursor-pointer outline-none shrink-0 rounded-s-[11px]"
                  onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                  aria-haspopup="listbox"
                  aria-expanded={isCountryDropdownOpen}
                  aria-label={`${dict?.selectCountryCode || (isRtl ? "اختر رمز الدولة" : "Select country code")}, ${currentCountryName} ${selectedCountry.code}`}
                >
                  <SelectedFlag className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 font-sans" dir="ltr">{selectedCountry.code}</span>
                  <NavArrowDown width={14} height={14} className={`contact-country-chevron w-3.5 h-3.5 text-slate-800 dark:text-zinc-200 shrink-0 transition-transform duration-200 ${isCountryDropdownOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" />
                </button>

                {/* Country Dropdown Menu */}
                {isCountryDropdownOpen && (
                  <div 
                    data-lenis-prevent
                    onWheel={(e) => e.stopPropagation()}
                    className="absolute top-full start-0 mt-1.5 w-60 bg-white/98 dark:bg-zinc-900/95 dark:backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] rounded-xl shadow-xl z-30 py-1 overflow-hidden"
                    role="listbox"
                    dir={isRtl ? "rtl" : "ltr"}
                    aria-label={dict?.selectCountryCode || (isRtl ? "اختر رمز الدولة" : "Select country code")}
                  >
                    {COUNTRIES.map((c) => {
                      const Flag = c.FlagComponent;
                      const countryLabel = isRtl ? c.nameAr : c.name;
                      return (
                        <button
                          key={c.code}
                          type="button"
                          role="option"
                          aria-selected={selectedCountry.code === c.code}
                          onClick={() => handleCountrySelect(c)}
                          className="w-full px-3.5 py-2.5 min-h-[44px] text-start flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer text-slate-900 dark:text-zinc-100"
                        >
                          <span className="flex items-center gap-2.5">
                            <Flag className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
                            <span className="font-medium text-slate-900 dark:text-zinc-100">{countryLabel}</span>
                          </span>
                          <span className="text-slate-500 dark:text-zinc-400 font-sans font-medium" dir="ltr">{c.code}</span>
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
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={dict?.phonePlaceholder || "+1 (000) 000 - 0000"}
                className="contact-phone-input text-base sm:text-sm px-3 placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none text-start rtl:text-end w-full bg-transparent h-full rounded-e-[11px]"
              />
            </div>
          </div>

          {/* Row 3: Subject */}
          <div className="contact-field-group flex flex-col gap-1.5">
            <label htmlFor="contact-subject" className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm">
              <span>{dict?.subjectLabel || (isRtl ? "الموضوع" : "Subject")}</span>
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder={dict?.subjectPlaceholder || (isRtl ? "أدخل الموضوع" : "Enter Subject")}
              className="contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border border-slate-300 dark:border-white/[0.09] px-3.5 text-base sm:text-sm bg-white dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus-visible:border-slate-400 focus-visible:ring-2 focus-visible:ring-brand/20 dark:focus-visible:border-white/30 outline-none w-full transition-colors duration-200"
            />
          </div>

          {/* Row 4: Message */}
          <div className="contact-field-group flex flex-col gap-1.5">
            <label htmlFor="contact-message" className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm flex items-center">
              <span>{dict?.messageLabel || (isRtl ? "الرسالة" : "Message")}</span>
              <span className="contact-required text-rose-500 dark:text-rose-400 ms-1" aria-hidden="true">*</span>
            </label>
            <div className="contact-textarea-wrapper relative w-full">
              <textarea
                ref={messageInputRef}
                id="contact-message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                placeholder={dict?.messagePlaceholder || (isRtl ? "اكتب هنا..." : "Type here...")}
                className={`contact-textarea rounded-xl border p-3.5 pb-8 text-base sm:text-sm bg-white dark:bg-zinc-900/60 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 min-h-[144px] focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
                  errors.message
                    ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
                    : "border-slate-300 dark:border-white/[0.09] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-white/30"
                }`}
              />
              {/* Character counter meeting WCAG AA contrast (text-slate-600 / dark:text-zinc-400) */}
              <span className="contact-char-count absolute bottom-2.5 end-3 text-slate-600 dark:text-zinc-400 text-xs font-mono select-none" aria-live="polite">
                {formData.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
            {errors.message && (
              <p id="contact-message-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
                {errors.message}
              </p>
            )}
          </div>

          {/* Personal Data Collection Statutory Notice */}
          <p className="text-xs text-slate-500 dark:text-zinc-400 text-start leading-relaxed mt-1">
            {dict?.privacyNotice?.pre ||
              (isRtl
                ? "بإرسالك لهذا النموذج، فإنك تقر بأن دي-راب تعالج بياناتك الشخصية وفقاً لـ "
                : "By submitting this form, you acknowledge that DiWrapp processes your personal information in accordance with our ")}
            <Link
              href={`/${lang}/privacy-policy`}
              className="text-brand hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-xs"
            >
              {dict?.privacyNotice?.linkText || (isRtl ? "سياسة الخصوصية" : "Privacy Policy")}
            </Link>
            {dict?.privacyNotice?.post || "."}
          </p>
        </motion.div>

        {/* Submit Action: Full-width on mobile/tablet, aligned on desktop lg below fields */}
        <div className={`contact-form-actions ${cardsSlot ? 'w-full lg:col-span-6 lg:col-start-7 lg:row-start-2' : 'w-full'} flex flex-col items-stretch lg:items-end rtl:lg:items-start mt-3 sm:mt-4 lg:mt-6`}>
          {/* Submission Status Notifications */}
          <div aria-live="polite" className="w-full">
            {submitStatus === "success" && (
              <div role="status" className="w-full p-4 mb-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{dict?.successMessage || (isRtl ? "تم استلام رسالتك بنجاح! سيتواصل فريقنا معك قريبًا." : "Your message has been received! Our team will get back to you shortly.")}</span>
              </div>
            )}

            {submitStatus === "fallback" && (
              <div role="alert" className="w-full p-4 mb-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-slate-800 dark:text-zinc-200 text-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold">
                  <WarningTriangle className="w-5 h-5 shrink-0" />
                  <span>{dict?.fallback?.title || (isRtl ? "خدمة الإرسال عبر النموذج في وضع المعاينة التجريبية" : "Online submission is temporarily in preview mode")}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {dict?.fallback?.description || (isRtl ? "لضمان متابعة استفسارك على الفور، يُرجى مراسلة فريقنا مباشرة عبر support@di-wrapp.com أو استخدام زر البريد الإلكتروني أدناه." : "To ensure your inquiry is answered immediately, please contact our team directly at support@di-wrapp.com or use the direct email button below.")}
                </p>
                <div className="pt-1">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{dict?.fallback?.mailtoButton || (isRtl ? "إرسال عبر البريد الإلكتروني" : "Open Email Client (Pre-filled)")}</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-btn-submit w-full lg:w-auto min-h-[44px] h-12 flex items-center justify-center gap-2 px-8 rounded-xl text-sm font-semibold bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-xs active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950"
          >
            <span>
              {isSubmitting
                ? dict?.sendingButton || (isRtl ? "جاري الإرسال..." : "Sending...")
                : dict?.submitButton || (isRtl ? "إرسال" : "Submit")}
            </span>
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
