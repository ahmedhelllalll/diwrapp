"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  FloppyDisk,
  NavArrowDown,
  Check,
  CheckCircle,
} from "iconoir-react";
import VendorOnboardingSuccess from "./VendorOnboardingSuccess";

export interface Step3Dict {
  stepBadge?: string;
  title?: string;
  subtitle?: string;
  contactPersonLabel?: string;
  contactPersonPlaceholder?: string;
  positionLabel?: string;
  positionPlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  phoneLabel?: string;
  phonePlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  previous?: string;
  saveAndExit?: string;
  submit?: string;
  successTitle?: string;
  successSubtitle?: string;
  returnHome?: string;
  vendorOnboarding?: {
    step3?: Step3Dict;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface VendorOnboardingStep3Props {
  lang: string;
  dict?: Step3Dict;
  onPrevious?: () => void;
  onSaveAndExit?: () => void;
  onSubmitSuccess?: () => void;
}

interface CountryDial {
  code: string;
  dial: string;
  flag: string;
  name: string;
}

function CountryFlag({ code, className = "w-6 h-6" }: { code: string; className?: string }) {
  const inner = (() => {
    switch (code.toUpperCase()) {
      case "US":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#bd3d44" />
            <path stroke="#fff" strokeWidth="39" d="M0 58h512M0 136h512M0 214h512M0 292h512M0 370h512M0 448h512" />
            <path fill="#192f5d" d="M0 0h256v256H0z" />
            <circle cx="128" cy="128" r="13" fill="#fff" />
          </svg>
        );
      case "SA":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#007a3d" />
            <path fill="#fff" d="M100 290h312v18H100z" />
            <text x="50%" y="46%" textAnchor="middle" fill="#fff" fontSize="64" fontWeight="bold" fontFamily="sans-serif">
              الله أكبر
            </text>
          </svg>
        );
      case "AE":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#00732F" />
            <path d="M0 170h512v172H0z" fill="#FFFFFF" />
            <path d="M0 342h512v170H0z" fill="#000000" />
            <path d="M0 0h170v512H0z" fill="#FF0000" />
          </svg>
        );
      case "QA":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#8D1B3D" />
            <path d="M0 0h170l40 51-40 51 40 51-40 51 40 51-40 51 40 51-40 51 40 51-40 53H0z" fill="#FFFFFF" />
          </svg>
        );
      case "KW":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#007A3D" />
            <path d="M0 170h512v172H0z" fill="#FFFFFF" />
            <path d="M0 342h512v170H0z" fill="#CE1126" />
            <path d="M0 0h170l50 170v172L170 512H0z" fill="#000000" />
          </svg>
        );
      case "BH":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#CE1126" />
            <path d="M0 0h170l40 51-40 51 40 51-40 51 40 51-40 51 40 51-40 51 40 51-40 53H0z" fill="#FFFFFF" />
          </svg>
        );
      case "OM":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#FFFFFF" />
            <path d="M0 170h512v172H0z" fill="#DB161B" />
            <path d="M0 342h512v170H0z" fill="#008000" />
            <path d="M0 0h170v512H0z" fill="#DB161B" />
          </svg>
        );
      case "EG":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#CE1126" />
            <path d="M0 170h512v172H0z" fill="#FFFFFF" />
            <path d="M0 342h512v170H0z" fill="#000000" />
            <circle cx="256" cy="256" r="40" fill="#C09300" />
          </svg>
        );
      case "GB":
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#012169" />
            <path d="M0 0l512 512M512 0L0 512" stroke="#FFFFFF" strokeWidth="60" />
            <path d="M0 0l512 512M512 0L0 512" stroke="#C8102E" strokeWidth="30" />
            <path d="M256 0v512M0 256h512" stroke="#FFFFFF" strokeWidth="100" />
            <path d="M256 0v512M0 256h512" stroke="#C8102E" strokeWidth="60" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full object-cover" viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="256" fill="#bd3d44" />
            <path stroke="#fff" strokeWidth="39" d="M0 58h512M0 136h512M0 214h512M0 292h512M0 370h512M0 448h512" />
            <path fill="#192f5d" d="M0 0h256v256H0z" />
            <circle cx="128" cy="128" r="13" fill="#fff" />
          </svg>
        );
    }
  })();

  return (
    <span
      className={`${className} rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-black/5 shadow-xs select-none`}
      aria-hidden="true"
    >
      {inner}
    </span>
  );
}

const countryDials: CountryDial[] = [
  { code: "US", dial: "+966", flag: "🇺🇸", name: "United States (+966)" },
  { code: "SA", dial: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "AE", dial: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "QA", dial: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "KW", dial: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "BH", dial: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "OM", dial: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "EG", dial: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "UK" },
];

export default function VendorOnboardingStep3({
  lang,
  dict: dictProp,
  onPrevious: onPreviousProp,
  onSaveAndExit: onSaveAndExitProp,
  onSubmitSuccess: onSubmitSuccessProp,
}: VendorOnboardingStep3Props) {
  const isRtl = lang === "ar";

  // Normalize dictionary so dict.vendorOnboarding.step3.* and direct dict.* both resolve seamlessly
  const step3Data = (dictProp?.vendorOnboarding?.step3 || dictProp || {}) as Step3Dict;
  const dict: Step3Dict & {
    vendorOnboarding: {
      step3: Step3Dict;
      [key: string]: any;
    };
  } = {
    ...step3Data,
    vendorOnboarding: {
      step3: {
        saveAndExit: step3Data?.saveAndExit || (isRtl ? "حفظ وخروج" : "Save & Exit"),
        submit: step3Data?.submit || (isRtl ? "تقديم الطلب" : "Submit"),
        previous: step3Data?.previous || (isRtl ? "السابق" : "Previous"),
        ...step3Data,
      },
      ...dictProp?.vendorOnboarding,
    },
  };

  // Form states
  const [contactName, setContactName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Country Dial Code state
  const [selectedDial, setSelectedDial] = useState<CountryDial>(countryDials[0]);
  const [isDialDropdownOpen, setIsDialDropdownOpen] = useState<boolean>(false);
  const dialDropdownRef = useRef<HTMLDivElement>(null);

  // Close country dial dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialDropdownRef.current &&
        !dialDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDialDropdownOpen(false);
      }
    };
    if (isDialDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDialDropdownOpen]);

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSaveAndExit = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
    if (onSaveAndExitProp) {
      onSaveAndExitProp();
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e && "preventDefault" in e) {
      e.preventDefault();
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitSuccessProp) {
        onSubmitSuccessProp();
      } else {
        setIsSubmitted(true);
      }
    }, 600);
  };

  const onPrevious = onPreviousProp || (() => {});

  // If submitted successfully in standalone mode, render VendorOnboardingSuccess
  if (isSubmitted) {
    return (
      <VendorOnboardingSuccess
        lang={lang}
        dict={dict?.vendorOnboarding?.success || (dict as any)?.success}
        userName={contactName || undefined}
      />
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Main Centered Content */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Stepper Header with Bottom Divider */}
        <div className="border-b border-[#EAECF0] dark:border-neutral-800 pb-8 mb-10 text-left rtl:text-right">
          {/* Step Badge */}
          <span className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal text-[#667085] dark:text-neutral-400 mb-2">
            {dict?.stepBadge || (isRtl ? "الخطوة 3" : "Step 3")}
          </span>

          {/* Title */}
          <h1 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[24px] leading-[32px] tracking-[-1%] text-[#101828] dark:text-white mb-3">
            {dict?.title || (isRtl ? "معلومات التواصل" : "Contact Info")}
          </h1>

          {/* 3 Sleek Progress Segments - All fully filled with solid blue */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5" aria-label="Step progress">
            {/* Segment 1: Filled */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#0066FF]"
              aria-label="Step 1 completed"
            />
            {/* Segment 2: Filled */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#0066FF]"
              aria-label="Step 2 completed"
            />
            {/* Segment 3: Filled */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#0066FF]"
              aria-current="step"
            />
          </div>

          {/* Subtitle */}
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[22px] text-[#667085] dark:text-neutral-400 max-w-[620px]">
            {dict?.subtitle ||
              (isRtl
                ? "أدخل معلومات التواصل الخاصة بمنظمتك للتمكن من الوصول إليك."
                : "Enter your organization contact information to reach you out.")}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Row 1: Contact Person Full Name & Position */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Contact Person Full Name */}
            <div>
              <label
                htmlFor="contact-person-name"
                className="block text-[14px] font-medium text-[#101828] dark:text-white mb-2 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                {dict?.contactPersonLabel || (isRtl ? "الاسم الكامل لمسؤول التواصل" : "Contact Person Full name")}
              </label>
              <input
                id="contact-person-name"
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={dict?.contactPersonPlaceholder || (isRtl ? "أدخل اسم مسؤول التواصل" : "Enter Contact name")}
                className="h-[48px] rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 text-[15px] text-[#101828] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0066FF] w-full font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all"
              />
            </div>

            {/* Position */}
            <div>
              <label
                htmlFor="contact-position"
                className="block text-[14px] font-medium text-[#101828] dark:text-white mb-2 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                {dict?.positionLabel || (isRtl ? "المنصب / المسمى الوظيفي" : "Position")}
              </label>
              <input
                id="contact-position"
                type="text"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={dict?.positionPlaceholder || (isRtl ? "أدخل المنصب الوظيفي" : "Enter Position")}
                className="h-[48px] rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 text-[15px] text-[#101828] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0066FF] w-full font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Email Address & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Email Address */}
            <div>
              <label
                htmlFor="contact-email"
                className="block text-[14px] font-medium text-[#101828] dark:text-white mb-2 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                {dict?.emailLabel || (isRtl ? "البريد الإلكتروني" : "Email Address")}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={dict?.emailPlaceholder || "example@domain.com"}
                className="h-[48px] rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 text-[15px] text-[#101828] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:border-[#0066FF] w-full font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all"
              />
            </div>

            {/* Phone Number with Circular Flag Dropdown & Dial Code */}
            <div className="w-full">
              <label
                htmlFor="contact-phone"
                className="block text-[14px] font-medium text-[#101828] dark:text-white mb-2 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                {dict?.phoneLabel || (isRtl ? "رقم الهاتف" : "Phone Number")}
              </label>

              <div
                className="relative flex items-center w-full h-[48px] rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 focus-within:border-[#0066FF] transition-all"
                ref={dialDropdownRef}
              >
                {/* Flag Dropdown Button (Left Side) */}
                <button
                  type="button"
                  onClick={() => setIsDialDropdownOpen(!isDialDropdownOpen)}
                  className="h-full px-3.5 flex items-center gap-2 bg-[#F9FAFB] dark:bg-neutral-800/50 border-r border-[#E4E7EC] dark:border-neutral-800 hover:bg-[#F2F4F7] dark:hover:bg-neutral-800 transition-colors shrink-0 rtl:border-l rtl:border-r-0 rounded-s-[11px] cursor-pointer select-none"
                  aria-label="Select country dial code"
                  aria-expanded={isDialDropdownOpen}
                >
                  {/* Circular Flag */}
                  <CountryFlag code={selectedDial.code} className="w-6 h-6" />
                  <NavArrowDown className="w-3.5 h-3.5 text-[#101828] dark:text-white stroke-[2]" />
                </button>

                {/* Dial Code Prefix + Number Input */}
                <div className="flex items-center flex-1 h-full px-4 gap-2">
                  <span className="text-[15px] font-medium text-[#344054] dark:text-neutral-300 select-none dir-ltr">
                    {selectedDial.dial}
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={dict?.phonePlaceholder || "00 000 0000"}
                    className="w-full h-full bg-transparent text-[15px] text-[#101828] dark:text-white placeholder-[#98A2B3] focus:outline-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
                  />
                </div>

                {/* Dropdown Options */}
                {isDialDropdownOpen && (
                  <div
                    role="listbox"
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    className="absolute top-full left-0 rtl:left-auto rtl:right-0 mt-2 w-56 max-h-60 overflow-y-auto overscroll-contain touch-pan-y custom-scrollbar rounded-[12px] border border-[#EAECF0] dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl z-30 py-1.5"
                  >
                    {countryDials.map((cd) => (
                      <button
                        key={cd.code}
                        type="button"
                        onClick={() => {
                          setSelectedDial(cd);
                          setIsDialDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left rtl:text-right flex items-center justify-between text-[13.5px] hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
                          selectedDial.code === cd.code
                            ? "bg-[#0066FF]/5 text-[#0066FF] font-medium"
                            : "text-[#344054] dark:text-neutral-200"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <CountryFlag code={cd.code} className="w-5 h-5" />
                          <span>{cd.name}</span>
                        </span>
                        <span className="text-[#667085] text-[12.5px] font-mono dir-ltr">{cd.dial}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div className="mb-8">
            <label
              htmlFor="contact-message"
              className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] text-[#344054] dark:text-neutral-300 mb-2 font-normal"
            >
              {dict?.messageLabel || (isRtl ? "الرسالة" : "Message")}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={dict?.messagePlaceholder || (isRtl ? "أدخل ملاحظاتك أو رسالتك" : "Enter your comment")}
              className="min-h-[140px] rounded-[12px] border border-[#D0D5DD] dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 text-[14px] text-[#101828] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#0066FF]/20 focus:border-[#0066FF] w-full resize-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all"
            />
          </div>

          {/* Notice of Save */}
          {savedNotice && (
            <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-[13px] text-center font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all">
              {isRtl ? "تم حفظ التغييرات بنجاح" : "Progress saved successfully"}
            </div>
          )}

          {/* Actions Footer */}
          <div className="border-t border-[#EAECF0] dark:border-neutral-800 pt-6 mt-12 flex items-center justify-between">
            {/* Left Action: Previous Button */}
            <button
              type="button"
              onClick={onPrevious}
              className="h-[42px] px-5 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <ArrowLeftCircle className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8] rtl:rotate-180" />
              <span>{dict?.previous || (isRtl ? "السابق" : "Previous")}</span>
            </button>

            {/* Right Actions: Save & Exit + Submit */}
            <div className="flex items-center gap-3">
              {/* Save & Exit */}
              <button
                type="button"
                onClick={handleSaveAndExit}
                className="h-[42px] px-5 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer select-none"
              >
                <FloppyDisk className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8]" />
                <span>{dict?.saveAndExit || (isRtl ? "حفظ وخروج" : "Save & Exit")}</span>
              </button>

              {/* Submit Button (Solid Primary Blue) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[42px] px-6 rounded-[12px] bg-[#0066FF] hover:bg-blue-600 text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer select-none disabled:opacity-70"
              >
                <span>{isSubmitting ? (isRtl ? "جاري الإرسال..." : "Submitting...") : dict?.submit || (isRtl ? "تقديم الطلب" : "Submit")}</span>
                <ArrowRightCircle className="w-4 h-4 text-white rtl:rotate-180 stroke-[1.8]" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
