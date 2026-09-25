"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, FloppyDisk, ArrowRightCircle, Xmark, Check } from "iconoir-react";
import { Select } from "@/components/ui/Select";

export interface Step1Dict {
  stepBadge?: string;
  title?: string;
  subtitle?: string;
  logoLabel?: string;
  uploadTitle?: string;
  uploadFormats?: string;
  ownershipTypeLabel?: string;
  ownershipTypePlaceholder?: string;
  ownershipOptions?: { value: string; label: string }[];
  orgNameLabel?: string;
  orgNamePlaceholder?: string;
  websiteLabel?: string;
  websitePlaceholder?: string;
  websitePrefix?: string;
  aboutLabel?: string;
  aboutPlaceholder?: string;
  companyProfileLabel?: string;
  saveAndExit?: string;
  next?: string;
  vendorOnboarding?: {
    step1?: Step1Dict;
    [key: string]: any;
  };
  [key: string]: any;
}

interface VendorOnboardingStep1Props {
  lang: string;
  dict?: Step1Dict;
  onSaveAndExit?: () => void;
  onNext?: () => void;
}

export default function VendorOnboardingStep1({
  lang,
  dict: dictProp,
  onSaveAndExit: onSaveAndExitProp,
  onNext: onNextProp,
}: VendorOnboardingStep1Props) {
  const isRtl = lang === "ar";

  // Normalize dictionary so dict.vendorOnboarding.step1.* and legacy dict.* both resolve seamlessly
  const step1Data = (dictProp?.vendorOnboarding?.step1 || dictProp || {}) as Step1Dict;
  const dict: Step1Dict & {
    vendorOnboarding: {
      step1: Step1Dict;
      [key: string]: any;
    };
  } = {
    ...step1Data,
    vendorOnboarding: {
      step1: {
        saveAndExit: step1Data?.saveAndExit || (isRtl ? "حفظ وخروج" : "Save & Exit"),
        next: step1Data?.next || (isRtl ? "التالي" : "Next"),
        ...step1Data,
      },
      ...dictProp?.vendorOnboarding,
    },
  };

  // Form states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLogoDragging, setIsLogoDragging] = useState<boolean>(false);

  const [ownershipType, setOwnershipType] = useState<string>("");
  const [orgName, setOrgName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [aboutOrg, setAboutOrg] = useState<string>("");

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [isProfileDragging, setIsProfileDragging] = useState<boolean>(false);

  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  // Fallback options
  const defaultOwnershipOptions = [
    { value: "sole_proprietorship", label: isRtl ? "مؤسسة فردية" : "Sole Proprietorship" },
    { value: "partnership", label: isRtl ? "شراكة" : "Partnership" },
    { value: "corporation", label: isRtl ? "شركة مساهمة" : "Corporation" },
    { value: "llc", label: isRtl ? "شركة ذات مسؤولية محدودة (LLC)" : "LLC (Limited Liability Company)" },
  ];

  const ownershipOptions = dict?.ownershipOptions || defaultOwnershipOptions;

  // Logo file handlers
  const handleLogoChange = (file: File | null) => {
    if (!file) return;
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileChange = (file: File | null) => {
    if (!file) return;
    setProfileFile(file);
  };

  const removeLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoFile(null);
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const removeProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileFile(null);
    if (profileInputRef.current) profileInputRef.current.value = "";
  };

  const handleSaveAndExit = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleNext = (e?: React.FormEvent | React.MouseEvent) => {
    if (e && "preventDefault" in e) {
      e.preventDefault();
    }
    // Step 1 progression placeholder
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const onSaveAndExit = onSaveAndExitProp || handleSaveAndExit;
  const onNext = onNextProp || handleNext;

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Main Centered Content */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Stepper Header with Bottom Divider */}
        <div className="border-b border-[#EAECF0] dark:border-neutral-800 pb-8 mb-8 text-left rtl:text-right">
          {/* Step Badge */}
          <span className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal text-[#667085] dark:text-neutral-400 mb-2">
            {dict?.stepBadge || (isRtl ? "الخطوة 1" : "Step 1")}
          </span>

          {/* Title */}
          <h1 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[24px] leading-[32px] tracking-[-1%] text-[#101828] dark:text-white mb-3">
            {dict?.title || (isRtl ? "أخبرنا عن منظمتك" : "Tell us about your Organization")}
          </h1>

          {/* 3 Sleek Progress Segments */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5" aria-label="Step progress">
            {/* Segment 1: Active */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#0066FF]"
              aria-current="step"
            />
            {/* Segment 2: Inactive */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#EAECF0] dark:bg-neutral-800"
            />
            {/* Segment 3: Inactive */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#EAECF0] dark:bg-neutral-800"
            />
          </div>

          {/* Subtitle */}
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#667085] dark:text-neutral-400 max-w-xl">
            {dict?.subtitle ||
              (isRtl
                ? "أدخل المعلومات والبيانات الأساسية المستخدمة لتحديد هوية منظمتك"
                : "Enter essential information & details used to identify your organization")}
          </p>
        </div>

        {/* Success Notification Feedback */}
        {savedSuccess && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[14px] flex items-center gap-2">
            <Check width={18} height={18} strokeWidth={2.5} className="shrink-0" />
            <span>
              {isRtl
                ? "تم حفظ البيانات بنجاح!"
                : "Information saved successfully!"}
            </span>
          </div>
        )}

        {/* Form Area */}
        <form onSubmit={handleNext} noValidate className="space-y-6">
          {/* Top Row: Two Columns with Equal Height Footprint */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Left Column: Organization Logo */}
            <div className="flex flex-col h-full">
              <label
                htmlFor="organization-logo"
                className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2 block text-left rtl:text-right"
              >
                {dict?.logoLabel || (isRtl ? "شعار المنظمة" : "Organization Logo")}
              </label>

              <div
                tabIndex={0}
                role="button"
                id="organization-logo"
                aria-label={dict?.logoLabel || "Organization Logo"}
                onClick={() => logoInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    logoInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsLogoDragging(true);
                }}
                onDragLeave={() => setIsLogoDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsLogoDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleLogoChange(e.dataTransfer.files[0]);
                  }
                }}
                className={`flex-1 rounded-[16px] border ${
                  isLogoDragging
                    ? "border-[#0066FF] bg-blue-50/20 dark:bg-blue-950/20"
                    : "border-[#D0D5DD] dark:border-neutral-800 bg-white dark:bg-[#0a0a0a]/50"
                } p-6 flex flex-col items-center justify-center text-center min-h-[164px] cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors relative group select-none`}
              >
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleLogoChange(e.target.files[0]);
                    }
                  }}
                />

                {logoPreview ? (
                  <div className="relative flex flex-col items-center">
                    <div className="w-20 h-20 relative rounded-xl overflow-hidden border border-[#EAECF0] dark:border-neutral-700 shadow-sm mb-2">
                      <Image
                        src={logoPreview}
                        alt="Logo preview"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <span className="text-[13px] text-[#101828] dark:text-white font-medium truncate max-w-[200px]">
                      {logoFile?.name}
                    </span>
                    <button
                      type="button"
                      onClick={removeLogo}
                      className="mt-2 text-[12px] text-rose-500 hover:text-rose-600 flex items-center gap-1"
                    >
                      <Xmark width={14} height={14} />
                      <span>{isRtl ? "إزالة" : "Remove"}</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-[#F2F4F7] dark:bg-neutral-800 flex items-center justify-center mb-3 text-[#344054] dark:text-neutral-300 group-hover:bg-[#EAECF0] dark:group-hover:bg-neutral-700 transition-colors">
                      <Upload width={20} height={20} strokeWidth={1.8} />
                    </div>
                    <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium text-[#101828] dark:text-white">
                      {dict?.uploadTitle || (isRtl ? "اسحب وأفلت أو اختر ملفات للتحميل" : "Drag & drop or choose files to upload")}
                    </span>
                    <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[12px] text-[#667085] dark:text-neutral-400 mt-1">
                      {dict?.uploadFormats || (isRtl ? "صيغة الملف - Jpeg, Jpg." : "File Format - Jpeg, Jpg.")}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Ownership Dropdown + Sub-row (Org Name & Website) */}
            <div className="flex flex-col gap-4">
              {/* Business Ownership Type */}
              <div>
                <Select
                  id="ownership-type"
                  label={dict?.ownershipTypeLabel || (isRtl ? "نوع ملكية العمل" : "Business Ownership Type")}
                  placeholder={dict?.ownershipTypePlaceholder || (isRtl ? "اختر النوع" : "Select Type")}
                  options={ownershipOptions}
                  value={ownershipType}
                  onChange={setOwnershipType}
                />
              </div>

              {/* Sub-row: Organization Name & Website */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {/* Organization Name */}
                <div className="w-full">
                  <label
                    htmlFor="org-name"
                    className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2 block text-left rtl:text-right"
                  >
                    {dict?.orgNameLabel || (isRtl ? "اسم المنظمة" : "Organization Name")}
                  </label>
                  <input
                    id="org-name"
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={dict?.orgNamePlaceholder || (isRtl ? "أدخل اسم الشركة" : "Enter Company Name")}
                    className="h-[46px] w-full px-3.5 rounded-[10px] border border-[#D0D5DD] dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] text-[14px] text-[#101828] dark:text-white placeholder-[#98A2B3] dark:placeholder-neutral-500 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 transition-all font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-left rtl:text-right"
                  />
                </div>

                {/* Website with grouped prefix */}
                <div className="w-full">
                  <label
                    htmlFor="org-website"
                    className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2 block text-left rtl:text-right"
                  >
                    {dict?.websiteLabel || (isRtl ? "الموقع الإلكتروني" : "Website")}
                  </label>
                  <div className="flex items-center h-[46px] w-full rounded-[10px] border border-[#D0D5DD] dark:border-neutral-800 bg-white dark:bg-[#0a0a0a] overflow-hidden focus-within:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/10 transition-all">
                    <span
                      className="h-full px-3 flex items-center bg-[#F9FAFB] dark:bg-neutral-800/60 border-r rtl:border-r-0 rtl:border-l border-[#D0D5DD] dark:border-neutral-800 text-[14px] text-[#667085] dark:text-neutral-400 select-none font-['Lufga',sans-serif] shrink-0"
                      dir="ltr"
                    >
                      {dict?.websitePrefix || "https://"}
                    </span>
                    <input
                      id="org-website"
                      type="text"
                      dir="ltr"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={dict?.websitePlaceholder || "www.oculusmedia.com"}
                      className="flex-1 min-w-0 h-full px-3 text-[14px] bg-transparent text-[#101828] dark:text-white placeholder-[#98A2B3] dark:placeholder-neutral-500 outline-none font-['Lufga',sans-serif]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle: About your Organization Textarea */}
          <div className="mt-6">
            <label
              htmlFor="about-organization"
              className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2 block text-left rtl:text-right"
            >
              {dict?.aboutLabel || (isRtl ? "نبذة عن منظمتك" : "About your Organization")}
            </label>
            <textarea
              id="about-organization"
              rows={4}
              value={aboutOrg}
              onChange={(e) => setAboutOrg(e.target.value)}
              placeholder={dict?.aboutPlaceholder || (isRtl ? "صف منظمتك" : "Describe your organization")}
              className="w-full min-h-[140px] rounded-[12px] border border-[#D0D5DD] dark:border-neutral-800 p-4 text-[14px] bg-white dark:bg-[#0a0a0a] text-[#101828] dark:text-white placeholder-[#98A2B3] dark:placeholder-neutral-500 outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/10 resize-none transition-all font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-left rtl:text-right"
            />
          </div>

          {/* Bottom: Upload Company Profile */}
          <div className="mt-6">
            <label
              htmlFor="company-profile"
              className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2 block text-left rtl:text-right"
            >
              {dict?.companyProfileLabel || (isRtl ? "تحميل الملف التعريفي للشركة" : "Upload Company Profile")}
            </label>

            <div
              tabIndex={0}
              role="button"
              id="company-profile"
              aria-label={dict?.companyProfileLabel || "Upload Company Profile"}
              onClick={() => profileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  profileInputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsProfileDragging(true);
              }}
              onDragLeave={() => setIsProfileDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsProfileDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleProfileChange(e.dataTransfer.files[0]);
                }
              }}
              className={`w-full rounded-[16px] border ${
                isProfileDragging
                  ? "border-[#0066FF] bg-blue-50/20 dark:bg-blue-950/20"
                  : "border-[#D0D5DD] dark:border-neutral-800 bg-white dark:bg-[#0a0a0a]/50"
              } p-8 flex flex-col items-center justify-center text-center min-h-[160px] cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-700 transition-colors relative group select-none`}
            >
              <input
                ref={profileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleProfileChange(e.target.files[0]);
                  }
                }}
              />

              {profileFile ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-[#0066FF] dark:text-blue-400">
                    <Check width={20} height={20} strokeWidth={2.5} />
                  </div>
                  <div className="text-left rtl:text-right">
                    <p className="text-[14px] font-medium text-[#101828] dark:text-white truncate max-w-[240px]">
                      {profileFile.name}
                    </p>
                    <p className="text-[12px] text-[#667085] dark:text-neutral-400">
                      {(profileFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeProfile}
                    className="p-1 rounded-md text-neutral-400 hover:text-rose-500 transition-colors"
                  >
                    <Xmark width={16} height={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#F2F4F7] dark:bg-neutral-800 flex items-center justify-center mb-3 text-[#344054] dark:text-neutral-300 group-hover:bg-[#EAECF0] dark:group-hover:bg-neutral-700 transition-colors">
                    <Upload width={20} height={20} strokeWidth={1.8} />
                  </div>
                  <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium text-[#101828] dark:text-white">
                    {dict?.uploadTitle || (isRtl ? "اسحب وأفلت أو اختر ملفات للتحميل" : "Drag & drop or choose files to upload")}
                  </span>
                  <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[12px] text-[#667085] dark:text-neutral-400 mt-1">
                    {dict?.uploadFormats || (isRtl ? "صيغة الملف - Jpeg, Jpg." : "File Format - Jpeg, Jpg.")}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Footer Actions Row */}
          <div className="flex items-center justify-end gap-3 mt-8 mb-12">
            {/* Save & Exit Button */}
            <button
              type="button"
              onClick={onSaveAndExit}
              className="h-[42px] px-5 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <FloppyDisk className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8]"/>
              <span>{dict.vendorOnboarding.step1.saveAndExit || "Save & Exit"}</span>
            </button>

            {/* Next Button (Outline matching Save & Exit) */}
            <button
              type="button"
              onClick={onNext}
              className="h-[42px] px-6 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>{dict.vendorOnboarding.step1.next || "Next"}</span>
              <ArrowRightCircle className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8] rtl:rotate-180"/>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
