'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
 ArrowRight,
 ArrowLeft,
 NavArrowDown,
 Mail,
 CheckCircle,
 WarningTriangle,
 Search,
} from "iconoir-react";
import {
 getCountries,
 getCountryCallingCode,
 AsYouType,
 parsePhoneNumberFromString,
 isValidPhoneNumber,
 getExampleNumber,
 type CountryCode,
} from "libphonenumber-js";
import mobileExamples from "libphonenumber-js/examples.mobile.json";
import * as Flags1x1 from "country-flag-icons/react/1x1";

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
 phoneInvalid?: string;
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

export interface CountryItem {
 iso: CountryCode;
 code: string;
 nameEn: string;
 nameAr: string;
}

// Crisp circular flag SVG wrapper (20x20) using country-flag-icons 1x1, memoized
const CountryFlag = React.memo(function CountryFlag({
 iso,
 className = "w-5 h-5",
}: {
 iso: CountryCode;
 className?: string;
}) {
 const FlagComponent = (
 Flags1x1 as Record<string, React.ComponentType<{ className?: string }>>
 )[iso];
 if (!FlagComponent) {
 return (
 <span
 className={`inline-block rounded-full bg-slate-200 dark:bg-zinc-700 ${className}`}
 aria-hidden="true"
 />
 );
 }
 return (
 <FlagComponent
 className={`rounded-full overflow-hidden shrink-0 ${className}`}
 aria-hidden="true"
 />
 );
});

// 10 Priority countries in exact specified order
const PRIORITY_ISOS: CountryCode[] = [
 "SA", // Saudi Arabia (default, +966)
 "AE", // United Arab Emirates (+971)
 "EG", // Egypt (+20)
 "KW", // Kuwait (+965)
 "QA", // Qatar (+974)
 "BH", // Bahrain (+973)
 "OM", // Oman (+968)
 "JO", // Jordan (+962)
 "GB", // United Kingdom (+44)
 "US", // United States (+1)
];

interface CountryLists {
 priorityCountries: CountryItem[];
 otherCountries: CountryItem[];
 allCountriesMap: Map<CountryCode, CountryItem>;
}

// Module-level cache to guarantee zero recomputations during render or scroll
const countryListsCache = new Map<string, CountryLists>();

function getCountryListsForLocale(isRtl: boolean): CountryLists {
 const cacheKey = isRtl ? "ar" : "en";
 const existing = countryListsCache.get(cacheKey);
 if (existing) return existing;

 const enNames = new Intl.DisplayNames(["en"], { type: "region" });
 const arNames = new Intl.DisplayNames(["ar"], { type: "region" });

 const map = new Map<CountryCode, CountryItem>();
 const allList: CountryItem[] = getCountries().map((iso) => {
 let code = "";
 try {
 code = `+${getCountryCallingCode(iso)}`;
 } catch {
 code = "";
 }
 const item: CountryItem = {
 iso,
 code,
 nameEn: enNames.of(iso) || iso,
 nameAr: arNames.of(iso) || iso,
 };
 map.set(iso, item);
 return item;
 });

 const priority = PRIORITY_ISOS.map((iso) => map.get(iso)!).filter(Boolean);
 const others = allList.filter((c) => !PRIORITY_ISOS.includes(c.iso));
 others.sort((a, b) =>
 isRtl ? a.nameAr.localeCompare(b.nameAr, "ar") : a.nameEn.localeCompare(b.nameEn, "en")
 );

 const data: CountryLists = {
 priorityCountries: priority,
 otherCountries: others,
 allCountriesMap: map,
 };
 countryListsCache.set(cacheKey, data);
 return data;
}

const MAX_MESSAGE_LENGTH = 250;
const INITIAL_VISIBLE_COUNT = 35;

export default function ContactForm({ lang, dict, cardsSlot }: ContactFormProps) {
 const isRtl = lang === "ar";
 const shouldReduceMotion = useReducedMotion();

 // Country lists computed once and cached by locale
 const { priorityCountries, otherCountries, allCountriesMap } = useMemo(
 () => getCountryListsForLocale(isRtl),
 [isRtl]
 );

 const defaultCountry = priorityCountries[0] || otherCountries[0];

 const [formData, setFormData] = useState({
 name: "",
 email: "",
 countryCode: defaultCountry.code,
 phone: "",
 subject: "",
 message: "",
 });

 const [selectedCountry, setSelectedCountry] = useState<CountryItem>(defaultCountry);
 const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [highlightedIndex, setHighlightedIndex] = useState(0);
 const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "fallback">("idle");
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [touched, setTouched] = useState<Record<string, boolean>>({});

 const dropdownContainerRef = useRef<HTMLDivElement>(null);
 const triggerRef = useRef<HTMLButtonElement>(null);
 const searchInputRef = useRef<HTMLInputElement>(null);
 const listRef = useRef<HTMLDivElement>(null);
 const activeItemRef = useRef<HTMLButtonElement>(null);

 const nameInputRef = useRef<HTMLInputElement>(null);
 const emailInputRef = useRef<HTMLInputElement>(null);
 const phoneInputRef = useRef<HTMLInputElement>(null);
 const messageInputRef = useRef<HTMLTextAreaElement>(null);

 // Filtered countries for the dropdown
 const { filteredPriority, filteredOthers, flatList } = useMemo(() => {
 const q = searchQuery.trim().toLowerCase();
 if (!q) {
 return {
 filteredPriority: priorityCountries,
 filteredOthers: otherCountries,
 flatList: [...priorityCountries, ...otherCountries],
 };
 }

 const matchFn = (c: CountryItem) => {
 const matchName = isRtl
 ? c.nameAr.toLowerCase().includes(q) || c.nameEn.toLowerCase().includes(q)
 : c.nameEn.toLowerCase().includes(q) || c.nameAr.toLowerCase().includes(q);
 const matchCode = c.code.includes(q) || c.code.replace("+", "").includes(q);
 const matchIso = c.iso.toLowerCase().includes(q);
 return matchName || matchCode || matchIso;
 };

 const p = priorityCountries.filter(matchFn);
 const o = otherCountries.filter(matchFn);
 return {
 filteredPriority: p,
 filteredOthers: o,
 flatList: [...p, ...o],
 };
 }, [searchQuery, priorityCountries, otherCountries, isRtl]);

 const openDropdown = () => {
 setSearchQuery("");
 setHighlightedIndex(0);
 setVisibleCount(INITIAL_VISIBLE_COUNT);
 setIsCountryDropdownOpen(true);
 };

 const closeDropdown = () => {
 setIsCountryDropdownOpen(false);
 setSearchQuery("");
 };

 // Progressive loading of items on list scroll to maintain 60fps on mobile
 const handleListScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
 const target = e.currentTarget;
 if (target.scrollHeight - target.scrollTop - target.clientHeight < 150) {
 setVisibleCount((prev) => Math.min(prev + 30, otherCountries.length));
 }
 }, [otherCountries.length]);

 // Focus search input when dropdown opens
 useEffect(() => {
 if (isCountryDropdownOpen) {
 const timer = setTimeout(() => {
 searchInputRef.current?.focus();
 }, 50);
 return () => clearTimeout(timer);
 }
 }, [isCountryDropdownOpen]);

 // Scroll active item into view during keyboard navigation
 useEffect(() => {
 if (isCountryDropdownOpen && activeItemRef.current) {
 activeItemRef.current.scrollIntoView({ block: "nearest" });
 }
 }, [highlightedIndex, isCountryDropdownOpen]);

 // Close dropdown on click outside or Escape key
 useEffect(() => {
 if (!isCountryDropdownOpen) return;

 function handlePointerDown(event: PointerEvent) {
 const target = event.target as Node | null;
 if (dropdownContainerRef.current && target && !dropdownContainerRef.current.contains(target)) {
 closeDropdown();
 }
 }

 function handleKeyDown(event: KeyboardEvent) {
 if (event.key === "Escape") {
 closeDropdown();
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

 // Placeholder customized per country using libphonenumber example numbers
 const placeholderExample = useMemo(() => {
 try {
 const ex = getExampleNumber(selectedCountry.iso, mobileExamples);
 if (ex) {
 return ex.formatNational();
 }
 } catch {
 // Fallback below
 }
 return dict?.phonePlaceholder || (selectedCountry.iso === "SA" ? "050 123 4567" : "+1 (000) 000 - 0000");
 }, [selectedCountry.iso, dict?.phonePlaceholder]);

 // Validation function
 const validateField = (name: string, value: string, countryIso = selectedCountry.iso): string => {
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
 if (name === "phone") {
 const trimmed = value.trim();
 if (trimmed) {
 const isValid = isValidPhoneNumber(trimmed, countryIso);
 if (!isValid) {
 return dict?.validation?.phoneInvalid || (isRtl ? "يرجى إدخال رقم هاتف صحيح" : "Please enter a valid phone number");
 }
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

 const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const rawValue = e.target.value;

 // If user pastes or enters an international number starting with '+'
 if (rawValue.startsWith("+")) {
 const parsed = parsePhoneNumberFromString(rawValue);
 if (parsed?.country && allCountriesMap.has(parsed.country)) {
 const match = allCountriesMap.get(parsed.country)!;
 setSelectedCountry(match);
 const national = parsed.formatNational();
 setFormData((prev) => ({
 ...prev,
 countryCode: match.code,
 phone: national,
 }));
 if (touched.phone) {
 const error = validateField("phone", national, match.iso);
 setErrors((prev) => ({ ...prev, phone: error }));
 }
 return;
 }
 }

 // Format as user types using AsYouType per country
 const formatted = new AsYouType(selectedCountry.iso).input(rawValue);

 setFormData((prev) => ({ ...prev, phone: formatted }));

 if (touched.phone) {
 const error = validateField("phone", formatted, selectedCountry.iso);
 setErrors((prev) => ({ ...prev, phone: error }));
 }
 };

 const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
 const { name, value } = e.target;
 setTouched((prev) => ({ ...prev, [name]: true }));
 const error = validateField(name, value);
 setErrors((prev) => ({ ...prev, [name]: error }));
 };

 const handleCountrySelect = (country: CountryItem) => {
 setSelectedCountry(country);
 setFormData((prev) => {
 const newPhone = prev.phone ? new AsYouType(country.iso).input(prev.phone) : "";
 return {
 ...prev,
 countryCode: country.code,
 phone: newPhone,
 };
 });

 if (touched.phone && formData.phone) {
 const error = validateField("phone", formData.phone, country.iso);
 setErrors((prev) => ({ ...prev, phone: error }));
 }

 closeDropdown();
 phoneInputRef.current?.focus();
 };

 // Keyboard navigation for dropdown
 const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
 if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
 e.preventDefault();
 openDropdown();
 }
 };

 const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
 if (e.key === "ArrowDown") {
 e.preventDefault();
 setHighlightedIndex((prev) => (prev < flatList.length - 1 ? prev + 1 : prev));
 } else if (e.key === "ArrowUp") {
 e.preventDefault();
 setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
 } else if (e.key === "Enter") {
 e.preventDefault();
 const item = flatList[highlightedIndex];
 if (item) {
 handleCountrySelect(item);
 }
 } else if (e.key === "Escape") {
 e.preventDefault();
 closeDropdown();
 triggerRef.current?.focus();
 }
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 // Mark required fields as touched
 setTouched({ name: true, email: true, phone: true, message: true });

 // Validate all fields
 const nameError = validateField("name", formData.name);
 const emailError = validateField("email", formData.email);
 const phoneError = validateField("phone", formData.phone);
 const messageError = validateField("message", formData.message);

 const newErrors: Record<string, string> = {};
 if (nameError) newErrors.name = nameError;
 if (emailError) newErrors.email = emailError;
 if (phoneError) newErrors.phone = phoneError;
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
 if (phoneError) {
 phoneInputRef.current?.focus();
 return;
 }
 if (messageError) {
 messageInputRef.current?.focus();
 return;
 }

 // Convert to standard E.164 format if phone was entered
 let e164Phone = "";
 if (formData.phone.trim()) {
 const parsed = parsePhoneNumberFromString(formData.phone.trim(), selectedCountry.iso);
 if (parsed && parsed.isValid()) {
 e164Phone = parsed.format("E.164");
 } else {
 const digitsOnly = formData.phone.replace(/\D/g, "");
 e164Phone = `${selectedCountry.code}${digitsOnly}`;
 }
 }

 const payload = {
 ...formData,
 countryCode: selectedCountry.code,
 phone: e164Phone,
 };

 setIsSubmitting(true);

 try {
 // Attempt API delivery if configured in environment
 const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
 if (apiBaseUrl) {
 const response = await fetch(`${apiBaseUrl.replace(/\/+$/, "")}/contact`, {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(payload),
 });
 if (response.ok) {
 setSubmitStatus("success");
 setFormData({
 name: "",
 email: "",
 countryCode: defaultCountry.code,
 phone: "",
 subject: "",
 message: "",
 });
 setSelectedCountry(defaultCountry);
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

 const currentCountryName = isRtl ? selectedCountry.nameAr : selectedCountry.nameEn;

 // Compute E.164 or formatted string for mailto fallback
 const mailtoPhoneFormatted = (() => {
 if (!formData.phone.trim()) return isRtl ? "لم يُحدد" : "(not provided)";
 const parsed = parsePhoneNumberFromString(formData.phone.trim(), selectedCountry.iso);
 return parsed?.format("E.164") || `${selectedCountry.code} ${formData.phone}`;
 })();

 const mailtoBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${mailtoPhoneFormatted}\n\nMessage:\n${formData.message}`;
 const mailtoHref = `mailto:support@di-wrapp.com?subject=${encodeURIComponent(
 formData.subject || (isRtl ? "استفسار عبر موقع Di-Wrapp" : "Di-Wrapp Contact Inquiry")
 )}&body=${encodeURIComponent(mailtoBody)}`;

 // Slice others if not searching to maintain smooth initial render
 const renderedOthers = searchQuery
 ? filteredOthers
 : filteredOthers.slice(0, visibleCount);

 return (
 <form
 className="contact-form contact-form-container w-full"
 onSubmit={handleSubmit}
 noValidate
 aria-label={isRtl ? "نموذج التواصل" : "Contact form"}
 >
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
 className={`contact-form-fields ${
 cardsSlot ? "w-full lg:col-span-6 lg:col-start-7 lg:row-start-1" : "w-full"
 } flex flex-col gap-4 h-full`}
 >
 {/* Row 1: Name & Email */}
 <div className="contact-form-row grid grid-cols-1 gap-4 sm:grid-cols-2">
 {/* Your Name */}
 <div className="contact-field-group flex flex-col gap-1.5">
 <label
 htmlFor="contact-name"
 className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm flex items-center"
 >
 <span>{dict?.nameLabel || (isRtl ? "اسمك" : "Your name")}</span>
 <span className="contact-required text-rose-500 dark:text-rose-400 ms-1" aria-hidden="true">
 *
 </span>
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
 className={`contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border px-3.5 text-base sm:text-sm bg-white dark:bg-[#0a0a0a] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
 errors.name
 ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
 : "border-slate-300 dark:border-[#27272A] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-zinc-500"
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
 <label
 htmlFor="contact-email"
 className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm flex items-center"
 >
 <span>{dict?.emailLabel || (isRtl ? "بريدك الإلكتروني" : "Your email")}</span>
 <span className="contact-required text-rose-500 dark:text-rose-400 ms-1" aria-hidden="true">
 *
 </span>
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
 className={`contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border px-3.5 text-base sm:text-sm bg-white dark:bg-[#0a0a0a] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
 errors.email
 ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
 : "border-slate-300 dark:border-[#27272A] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-zinc-500"
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
 <label
 htmlFor="contact-phone"
 className="contact-label text-start text-slate-800 dark:text-zinc-200 font-medium text-sm"
 >
 <span>{dict?.phoneLabel || (isRtl ? "رقم الهاتف" : "Phone number")}</span>
 </label>
 <div
 className={`contact-phone-group relative ${
 isCountryDropdownOpen ? "z-30 is-open" : "z-0"
 } ${errors.phone ? "has-error border-rose-500 dark:border-rose-500/80" : "border-slate-300 dark:border-[#27272A]"} border bg-white dark:bg-[#0a0a0a] focus-within:border-slate-400 focus-within:dark:border-zinc-500 focus-within:ring-2 focus-within:ring-brand/20 dark:focus-within:ring-zinc-600 rounded-xl w-full transition-colors duration-200 flex items-center min-h-[44px] h-11 sm:h-12`}
 >
 <div ref={dropdownContainerRef} className="relative h-full flex items-center shrink-0">
 <button
 ref={triggerRef}
 type="button"
 className="contact-country-trigger flex items-center gap-1.5 px-3 h-full border-none bg-transparent hover:bg-transparent dark:hover:bg-transparent transition-colors cursor-pointer outline-none shrink-0 rounded-s-[11px]"
 onClick={() => (isCountryDropdownOpen ? closeDropdown() : openDropdown())}
 onKeyDown={handleTriggerKeyDown}
 aria-haspopup="listbox"
 aria-expanded={isCountryDropdownOpen}
 aria-controls="contact-country-listbox"
 aria-label={`${dict?.selectCountryCode || (isRtl ? "اختر رمز الدولة" : "Select country code")}, ${currentCountryName} ${selectedCountry.code}`}
 >
 <CountryFlag iso={selectedCountry.iso} className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
 <span className="text-xs font-semibold text-slate-800 dark:text-zinc-200 font-sans" dir="ltr">
 {selectedCountry.code}
 </span>
 <NavArrowDown
 width={14}
 height={14}
 className={`contact-country-chevron w-3.5 h-3.5 text-slate-800 dark:text-zinc-200 shrink-0 ${
 isCountryDropdownOpen ? "is-open" : ""
 }`}
 style={{
 transform: isCountryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
 transformOrigin: "center",
 transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
 }}
 aria-hidden="true"
 />
 </button>

 {/* Country Dropdown Menu with Search and Scrollable Country List */}
 {isCountryDropdownOpen && (
 <div
 data-lenis-prevent
 onWheel={(e) => e.stopPropagation()}
 className="absolute top-full start-0 mt-1.5 w-64 sm:w-72 max-w-[calc(100vw-32px)] bg-white/98 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#27272A] rounded-xl shadow-xl z-30 py-1 overflow-hidden flex flex-col"
 dir={isRtl ? "rtl" : "ltr"}
 >
 {/* Search Input matching dropdown style */}
 <div className="p-2 border-b border-slate-100 dark:border-[#27272A] sticky top-0 bg-white/95 dark:bg-[#0a0a0a] backdrop-blur-md z-10">
 <div className="relative flex items-center">
 <Search
 width={14}
 height={14}
 className="w-3.5 h-3.5 absolute start-2.5 text-slate-400 dark:text-zinc-500 pointer-events-none"
 aria-hidden="true"
 />
 <input
 ref={searchInputRef}
 type="text"
 value={searchQuery}
 onChange={(e) => {
 setSearchQuery(e.target.value);
 setHighlightedIndex(0);
 }}
 onKeyDown={handleSearchKeyDown}
 placeholder={isRtl ? "ابحث عن الدولة أو الرمز..." : "Search country or code..."}
 className="w-full ps-8 pe-2.5 py-1.5 text-xs bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-[#27272A] rounded-lg text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 dark:placeholder:text-zinc-500 outline-none focus:border-slate-400 dark:focus:border-zinc-500 transition-colors"
 aria-label={isRtl ? "بحث عن دولة" : "Search country"}
 />
 </div>
 </div>

 {/* Scrollable Country List with progressive rendering for smooth mobile scrolling */}
 <div
 ref={listRef}
 role="listbox"
 id="contact-country-listbox"
 onScroll={handleListScroll}
 aria-label={dict?.selectCountryCode || (isRtl ? "اختر رمز الدولة" : "Select country code")}
 aria-activedescendant={
 flatList[highlightedIndex] ? `country-opt-${flatList[highlightedIndex].iso}` : undefined
 }
 className="max-h-60 sm:max-h-68 overflow-y-auto py-1 overscroll-contain"
 >
 {flatList.length === 0 ? (
 <div className="py-6 px-4 text-center text-xs text-slate-500 dark:text-zinc-400">
 {isRtl ? "لم يتم العثور على أي دولة" : "No countries found"}
 </div>
 ) : (
 <>
 {/* Priority Countries */}
 {filteredPriority.map((c) => {
 const countryLabel = isRtl ? c.nameAr : c.nameEn;
 const isSelected = selectedCountry.iso === c.iso;
 const flatIdx = flatList.findIndex((item) => item.iso === c.iso);
 const isHighlighted = highlightedIndex === flatIdx;

 return (
 <button
 key={`priority-${c.iso}`}
 ref={isHighlighted ? activeItemRef : null}
 id={`country-opt-${c.iso}`}
 type="button"
 role="option"
 aria-selected={isSelected}
 onClick={() => handleCountrySelect(c)}
 onMouseEnter={() => setHighlightedIndex(flatIdx)}
 className={`w-full px-3.5 py-2.5 min-h-[44px] text-start flex items-center justify-between text-xs transition-colors cursor-pointer text-slate-900 dark:text-zinc-100 ${
 isSelected
 ? "bg-slate-100/90 dark:bg-white/[0.08] font-semibold"
 : isHighlighted
 ? "bg-slate-50 dark:bg-white/[0.04]"
 : "hover:bg-slate-100 dark:hover:bg-white/[0.06]"
 }`}
 >
 <span className="flex items-center gap-2.5 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
 <CountryFlag iso={c.iso} className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
 <span className="font-medium text-slate-900 dark:text-zinc-100 truncate">
 {countryLabel}
 </span>
 </span>
 <span className="text-slate-500 dark:text-zinc-400 font-sans font-medium shrink-0 ms-2" dir="ltr">
 {c.code}
 </span>
 </button>
 );
 })}

 {/* Subtle Separator (visible only when not actively searching) */}
 {!searchQuery && filteredPriority.length > 0 && filteredOthers.length > 0 && (
 <div
 className="my-1 border-t border-slate-200/80 dark:border-[#27272A]"
 role="separator"
 aria-hidden="true"
 />
 )}

 {/* Alphabetical Rest of Countries (progressively loaded on scroll) */}
 {renderedOthers.map((c) => {
 const countryLabel = isRtl ? c.nameAr : c.nameEn;
 const isSelected = selectedCountry.iso === c.iso;
 const flatIdx = flatList.findIndex((item) => item.iso === c.iso);
 const isHighlighted = highlightedIndex === flatIdx;

 return (
 <button
 key={`other-${c.iso}`}
 ref={isHighlighted ? activeItemRef : null}
 id={`country-opt-${c.iso}`}
 type="button"
 role="option"
 aria-selected={isSelected}
 onClick={() => handleCountrySelect(c)}
 onMouseEnter={() => setHighlightedIndex(flatIdx)}
 className={`w-full px-3.5 py-2.5 min-h-[44px] text-start flex items-center justify-between text-xs transition-colors cursor-pointer text-slate-900 dark:text-zinc-100 ${
 isSelected
 ? "bg-slate-100/90 dark:bg-white/[0.08] font-semibold"
 : isHighlighted
 ? "bg-slate-50 dark:bg-white/[0.04]"
 : "hover:bg-slate-100 dark:hover:bg-white/[0.06]"
 }`}
 >
 <span className="flex items-center gap-2.5 min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
 <CountryFlag iso={c.iso} className="w-5 h-5 rounded-full overflow-hidden shrink-0" />
 <span className="font-medium text-slate-900 dark:text-zinc-100 truncate">
 {countryLabel}
 </span>
 </span>
 <span className="text-slate-500 dark:text-zinc-400 font-sans font-medium shrink-0 ms-2" dir="ltr">
 {c.code}
 </span>
 </button>
 );
 })}
 </>
 )}
 </div>
 </div>
 )}
 </div>

 <input
 ref={phoneInputRef}
 id="contact-phone"
 name="phone"
 type="tel"
 inputMode="tel"
 autoComplete="tel"
 dir="ltr"
 value={formData.phone}
 onChange={handlePhoneChange}
 onBlur={handleBlur}
 aria-invalid={!!errors.phone}
 aria-describedby={errors.phone ? "contact-phone-error" : undefined}
 placeholder={placeholderExample}
 className="contact-phone-input text-base sm:text-sm px-3 placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none text-start rtl:text-end w-full bg-transparent h-full rounded-e-[11px]"
 />
 </div>
 {errors.phone && (
 <p id="contact-phone-error" role="alert" className="text-xs text-rose-600 dark:text-rose-400 font-medium mt-0.5">
 {errors.phone}
 </p>
 )}
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
 className="contact-input min-h-[44px] h-11 sm:h-12 rounded-xl border border-slate-300 dark:border-[#27272A] px-3.5 text-base sm:text-sm bg-white dark:bg-[#0a0a0a] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 focus-visible:border-slate-400 focus-visible:ring-2 focus-visible:ring-brand/20 dark:focus-visible:border-zinc-500 outline-none w-full transition-colors duration-200"
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
 className={`contact-textarea rounded-xl border p-3.5 pb-8 text-base sm:text-sm bg-white dark:bg-[#0a0a0a] placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 outline-none w-full transition-colors duration-200 min-h-[144px] focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
 errors.message
 ? "border-rose-500 dark:border-rose-500/80 focus-visible:ring-rose-500/20"
 : "border-slate-300 dark:border-[#27272A] focus-visible:border-slate-400 focus-visible:ring-brand/20 dark:focus-visible:border-zinc-500"
 }`}
 />
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
 ? "بإرسالك لهذا النموذج، فإنك تقر بأن Di-Wrapp تعالج بياناتك الشخصية وفقاً لـ "
 : "By submitting this form, you acknowledge that Di-Wrapp processes your personal information in accordance with our ")}
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
