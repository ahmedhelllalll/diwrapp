"use client";

import React, { useState } from "react";
import {
  BoxIso,
  Tv,
  UserScan,
  Laptop,
  Check,
  XmarkCircle,
  Plus,
  NavArrowUp,
  NavArrowDown,
  ArrowLeftCircle,
  ArrowRightCircle,
  FloppyDisk,
} from "iconoir-react";
import { Select } from "@/components/ui/Select";

export interface Step2Dict {
  stepBadge?: string;
  title?: string;
  subtitle?: string;
  inventoryOverview?: string;
  numberOfInventories?: string;
  inventoriesTag?: string;
  inventoryType?: string;
  types?: {
    activationSpace?: string;
    advertisingDisplay?: string;
    influencer?: string;
    digitalChannels?: string;
  };
  operatingCountry?: string;
  countryLabel?: string;
  countryPlaceholder?: string;
  cityLabel?: string;
  cityPlaceholder?: string;
  addCountries?: string;
  previous?: string;
  saveAndExit?: string;
  next?: string;
  countries?: { value: string; label: string }[];
  cities?: Record<string, { value: string; label: string }[]>;
  vendorOnboarding?: {
    step2?: Step2Dict;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface VendorOnboardingStep2Props {
  lang: string;
  dict?: Step2Dict;
  onPrevious?: () => void;
  onSaveAndExit?: () => void;
  onNext?: () => void;
}

interface CountryRow {
  id: string;
  country: string;
  city: string;
}

export default function VendorOnboardingStep2({
  lang,
  dict: dictProp,
  onPrevious: onPreviousProp,
  onSaveAndExit: onSaveAndExitProp,
  onNext: onNextProp,
}: VendorOnboardingStep2Props) {
  const isRtl = lang === "ar";

  // Normalize dictionary so dict.vendorOnboarding.step2.* and direct dict.* both resolve seamlessly
  const step2Data = (dictProp?.vendorOnboarding?.step2 || dictProp || {}) as Step2Dict;
  const dict: Step2Dict & {
    vendorOnboarding: {
      step2: Step2Dict;
      [key: string]: any;
    };
  } = {
    ...step2Data,
    vendorOnboarding: {
      step2: {
        saveAndExit: step2Data?.saveAndExit || (isRtl ? "حفظ وخروج" : "Save & Exit"),
        next: step2Data?.next || (isRtl ? "التالي" : "Next"),
        previous: step2Data?.previous || (isRtl ? "السابق" : "Previous"),
        ...step2Data,
      },
      ...dictProp?.vendorOnboarding,
    },
  };

  // State: Number of inventories
  const [inventoryCount, setInventoryCount] = useState<number | string>("00");

  // State: Inventory Types (Multiple selection - defaults matching Figma screenshot)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "activation_space",
    "advertising_display",
  ]);

  // State: Country & City dynamic rows
  const [countryRows, setCountryRows] = useState<CountryRow[]>([
    { id: "1", country: "", city: "" },
  ]);

  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  // Fallback countries and cities
  const defaultCountries = [
    { value: "sa", label: isRtl ? "المملكة العربية السعودية" : "Saudi Arabia" },
    { value: "ae", label: isRtl ? "الإمارات العربية المتحدة" : "United Arab Emirates" },
    { value: "qa", label: isRtl ? "قطر" : "Qatar" },
    { value: "kw", label: isRtl ? "الكويت" : "Kuwait" },
    { value: "bh", label: isRtl ? "البحرين" : "Bahrain" },
    { value: "om", label: isRtl ? "عُمان" : "Oman" },
    { value: "eg", label: isRtl ? "مصر" : "Egypt" },
  ];

  const defaultCities: Record<string, { value: string; label: string }[]> = {
    sa: [
      { value: "riyadh", label: isRtl ? "الرياض" : "Riyadh" },
      { value: "jeddah", label: isRtl ? "جدة" : "Jeddah" },
      { value: "dammam", label: isRtl ? "الدمام" : "Dammam" },
      { value: "khobar", label: isRtl ? "الخبر" : "Khobar" },
      { value: "mecca", label: isRtl ? "مكة المكرمة" : "Mecca" },
      { value: "medina", label: isRtl ? "المدينة المنورة" : "Medina" },
    ],
    ae: [
      { value: "dubai", label: isRtl ? "دبي" : "Dubai" },
      { value: "abu_dhabi", label: isRtl ? "أبو ظبي" : "Abu Dhabi" },
      { value: "sharjah", label: isRtl ? "الشارقة" : "Sharjah" },
    ],
    qa: [
      { value: "doha", label: isRtl ? "الدوحة" : "Doha" },
      { value: "al_rayyan", label: isRtl ? "الريان" : "Al Rayyan" },
    ],
    kw: [
      { value: "kuwait_city", label: isRtl ? "مدينة الكويت" : "Kuwait City" },
      { value: "hawalli", label: isRtl ? "حولي" : "Hawalli" },
    ],
    bh: [
      { value: "manama", label: isRtl ? "المنامة" : "Manama" },
      { value: "riffa", label: isRtl ? "الرفاع" : "Riffa" },
    ],
    om: [
      { value: "muscat", label: isRtl ? "مسقط" : "Muscat" },
      { value: "salalah", label: isRtl ? "صلالة" : "Salalah" },
    ],
    eg: [
      { value: "cairo", label: isRtl ? "القاهرة" : "Cairo" },
      { value: "alexandria", label: isRtl ? "الإسكندرية" : "Alexandria" },
      { value: "giza", label: isRtl ? "الجيزة" : "Giza" },
    ],
  };

  const countries = dict?.countries && dict.countries.length > 0 ? dict.countries : defaultCountries;
  const citiesMap = dict?.cities || defaultCities;

  // Toggle inventory type
  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add country row
  const addCountryRow = () => {
    const newId = (Date.now() + Math.random()).toString();
    setCountryRows((prev) => [...prev, { id: newId, country: "", city: "" }]);
  };

  // Remove country row
  const removeCountryRow = (id: string) => {
    if (countryRows.length === 1) {
      setCountryRows([{ id: countryRows[0].id, country: "", city: "" }]);
      return;
    }
    setCountryRows((prev) => prev.filter((row) => row.id !== id));
  };

  // Update country row value
  const updateCountryRow = (id: string, field: "country" | "city", value: string) => {
    setCountryRows((prev) =>
      prev.map((row) => {
        if (row.id === id) {
          if (field === "country") {
            return { ...row, country: value, city: "" }; // Reset city when country changes
          }
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  };

  // Number input increment/decrement
  const handleIncrement = () => {
    const current = typeof inventoryCount === "string" ? parseInt(inventoryCount, 10) || 0 : inventoryCount;
    setInventoryCount(current + 1);
  };

  const handleDecrement = () => {
    const current = typeof inventoryCount === "string" ? parseInt(inventoryCount, 10) || 0 : inventoryCount;
    setInventoryCount(Math.max(0, current - 1));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setInventoryCount("");
      return;
    }
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setInventoryCount(parsed);
    }
  };

  // Actions
  const handleSaveAndExit = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleNext = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handlePrevious = () => {
    // Default fallback
  };

  const onSaveAndExit = onSaveAndExitProp || handleSaveAndExit;
  const onNext = onNextProp || handleNext;
  const onPrevious = onPreviousProp || handlePrevious;

  // The 4 inventory cards
  const inventoryCards = [
    {
      id: "activation_space",
      label: dict?.types?.activationSpace || (isRtl ? "مساحات التفعيل" : "Activation Space"),
      icon: BoxIso,
    },
    {
      id: "advertising_display",
      label: dict?.types?.advertisingDisplay || (isRtl ? "شاشات الإعلانات" : "Advertising Display"),
      icon: Tv,
    },
    {
      id: "influencer",
      label: dict?.types?.influencer || (isRtl ? "المؤثرين" : "Influencer"),
      icon: UserScan,
    },
    {
      id: "digital_channels",
      label: dict?.types?.digitalChannels || (isRtl ? "القنوات الرقمية" : "Digital Channels"),
      icon: Laptop,
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      {/* Main Centered Content */}
      <div className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 pt-10 pb-6">
        {/* Stepper Header with Bottom Divider */}
        <div className="border-b border-[#EAECF0] dark:border-neutral-800 pb-8 mb-10 text-left rtl:text-right">
          {/* Step Badge */}
          <span className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-normal text-[#667085] dark:text-neutral-400 mb-2">
            {dict?.stepBadge || (isRtl ? "الخطوة 2" : "Step 2")}
          </span>

          {/* Title */}
          <h1 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[24px] leading-[32px] tracking-[-1%] text-[#101828] dark:text-white mb-3">
            {dict?.title || (isRtl ? "ما هو نوع المساحات الإعلانية التي تمتلكها؟" : "What type of Inventory you own?")}
          </h1>

          {/* 3 Sleek Progress Segments */}
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3.5" aria-label="Step progress">
            {/* Segment 1: Fully filled solid blue */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#0066FF]"
              aria-label="Step 1 completed"
            />
            {/* Segment 2: Active dot/indicator (blue pill dot leading on inactive track) */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#EAECF0] dark:bg-neutral-800 relative overflow-hidden flex items-center"
              aria-current="step"
            >
              <div className="h-full w-5 sm:w-6 bg-[#0066FF] rounded-full rtl:mr-0 rtl:ml-auto" />
            </div>
            {/* Segment 3: Inactive */}
            <div
              style={{ height: "3px" }}
              className="w-20 sm:w-24 rounded-full bg-[#EAECF0] dark:bg-neutral-800"
            />
          </div>

          {/* Subtitle */}
          <p className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[22px] text-[#667085] dark:text-neutral-400 max-w-[620px]">
            {dict?.subtitle ||
              (isRtl
                ? "أدخل معلومات المساحات الإعلانية المستخدمة لتحديد هوية منظمتك"
                : "Enter your inventory information used to identify your organization")}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
          {/* Section 1: Inventory Overview */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10 pb-10">
            {/* Left Column Label */}
            <div className="w-full md:w-[220px] shrink-0">
              <h2 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[15px] text-[#101828] dark:text-white">
                {dict?.inventoryOverview || (isRtl ? "نظرة عامة على المساحات الإعلانية" : "Inventory Overview")}
              </h2>
            </div>

            {/* Right Column Content */}
            <div className="flex-1 w-full max-w-[760px]">
              {/* Number of Inventories */}
              <div>
                <label className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] text-[#344054] dark:text-neutral-300 mb-2">
                  {dict?.numberOfInventories || (isRtl ? "عدد المساحات الإعلانية" : "Number Of Inventories")}
                </label>

                {/* Composite Input */}
                <div className="max-w-[280px] h-[44px] rounded-[10px] border border-[#D0D5DD] dark:border-neutral-700 bg-white dark:bg-neutral-900 flex items-center overflow-hidden focus-within:ring-2 focus-within:ring-[#0066FF]/20 focus-within:border-[#0066FF] transition-all">
                  {/* Left Static Tag */}
                  <span className="bg-transparent px-3.5 text-[#667085] dark:text-neutral-400 text-[14px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] border-r border-[#D0D5DD] dark:border-neutral-700 rtl:border-r-0 rtl:border-l select-none shrink-0">
                    {dict?.inventoriesTag || (isRtl ? "المساحات" : "Inventories")}
                  </span>

                  {/* Number Input Field */}
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={inventoryCount}
                    onChange={handleInputChange}
                    placeholder="00"
                    className="px-3 text-[14px] w-full bg-transparent text-[#101828] dark:text-white font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] focus:outline-none placeholder:text-[#98A2B3]"
                  />

                  {/* Up / Down Stepper Arrows */}
                  <div className="flex flex-col items-center justify-center px-2 border-l border-[#D0D5DD] dark:border-neutral-700 rtl:border-l-0 rtl:border-r h-full shrink-0">
                    <button
                      type="button"
                      onClick={handleIncrement}
                      aria-label="Increment inventories"
                      className="text-[#667085] hover:text-[#101828] dark:hover:text-white p-0.5 transition-colors cursor-pointer"
                    >
                      <NavArrowUp width={12} height={12} strokeWidth={2.2} />
                    </button>
                    <button
                      type="button"
                      onClick={handleDecrement}
                      aria-label="Decrement inventories"
                      className="text-[#667085] hover:text-[#101828] dark:hover:text-white p-0.5 transition-colors cursor-pointer"
                    >
                      <NavArrowDown width={12} height={12} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Inventory Type */}
              <div className="mt-8">
                <label className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] text-[#344054] dark:text-neutral-300 mb-3">
                  {dict?.inventoryType || (isRtl ? "نوع المساحة الإعلانية" : "Inventory Type")}
                </label>

                {/* 2x2 Interactive Selection Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inventoryCards.map((card) => {
                    const isSelected = selectedTypes.includes(card.id);
                    const CardIcon = card.icon;

                    return (
                      <div
                        key={card.id}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => toggleType(card.id)}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            toggleType(card.id);
                          }
                        }}
                        className={`min-h-[68px] px-4 py-3 rounded-[12px] border transition-all flex items-center justify-between cursor-pointer select-none ${
                          isSelected
                            ? "border-[#0066FF] bg-[#0066FF]/[0.02] dark:bg-[#0066FF]/10 ring-1 ring-[#0066FF]"
                            : "border-[#E4E7EC] dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900"
                        }`}
                      >
                        {/* Left: Icon Box + Title */}
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-[8px] border border-[#EAECF0] dark:border-neutral-800 flex items-center justify-center shrink-0 text-[#344054] dark:text-neutral-300 bg-[#F9FAFB] dark:bg-neutral-800/60">
                            <CardIcon width={18} height={18} strokeWidth={1.8} />
                          </div>
                          <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[15px] text-[#101828] dark:text-white">
                            {card.label}
                          </span>
                        </div>

                        {/* Right: Check Indicator */}
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#0066FF] flex items-center justify-center text-white shrink-0">
                            <Check width={12} height={12} strokeWidth={3} />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#D0D5DD] dark:border-neutral-700 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Operating Country */}
          <div className="border-t border-[#EAECF0] dark:border-neutral-800 pt-8 mt-2 flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10 pb-6">
            {/* Left Column Label */}
            <div className="w-full md:w-[220px] shrink-0">
              <h2 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-medium text-[15px] text-[#101828] dark:text-white">
                {dict?.operatingCountry || (isRtl ? "بلد التشغيل" : "Operating Country")}
              </h2>
            </div>

            {/* Right Column Dynamic Rows */}
            <div className="flex-1 w-full max-w-[760px]">
              {countryRows.map((row) => {
                const rowCityOptions = row.country ? citiesMap[row.country] || [] : [];

                return (
                  <div key={row.id} className="flex items-center gap-3 mb-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                      {/* Country Dropdown */}
                      <div>
                        <label className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] text-[#344054] dark:text-neutral-300 mb-1.5 font-normal">
                          {dict?.countryLabel || (isRtl ? "الدولة" : "Country")}
                        </label>
                        <Select
                          options={countries}
                          value={row.country}
                          placeholder={dict?.countryPlaceholder || (isRtl ? "اختر الدولة" : "Select Country")}
                          onChange={(val) => updateCountryRow(row.id, "country", val)}
                        />
                      </div>

                      {/* City Dropdown */}
                      <div>
                        <label className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] text-[#344054] dark:text-neutral-300 mb-1.5 font-normal">
                          {dict?.cityLabel || (isRtl ? "المدينة" : "City")}
                        </label>
                        <Select
                          options={rowCityOptions}
                          value={row.city}
                          placeholder={dict?.cityPlaceholder || (isRtl ? "اختر المدينة" : "Select City")}
                          onChange={(val) => updateCountryRow(row.id, "city", val)}
                          disabled={!row.country}
                        />
                      </div>
                    </div>

                    {/* Delete Action Button */}
                    <button
                      type="button"
                      onClick={() => removeCountryRow(row.id)}
                      aria-label="Remove country"
                      className="text-[#98A2B3] hover:text-red-500 transition-colors p-1 self-end mb-2.5 cursor-pointer shrink-0"
                    >
                      <XmarkCircle width={20} height={20} strokeWidth={1.8} />
                    </button>
                  </div>
                );
              })}

              {/* Add Countries Button */}
              <button
                type="button"
                onClick={addCountryRow}
                className="h-[36px] px-4 rounded-[8px] bg-[#0066FF] hover:bg-blue-600 text-white text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors mt-2 cursor-pointer select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
              >
                <Plus width={14} height={14} strokeWidth={2.5} />
                <span>{dict?.addCountries || (isRtl ? "+ إضافة دول" : "+ Add Countries")}</span>
              </button>
            </div>
          </div>

          {/* Notice of Save */}
          {savedNotice && (
            <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-800 dark:text-emerald-300 text-[13px] text-center font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-all">
              {isRtl ? "تم حفظ التغييرات بنجاح" : "Progress saved successfully"}
            </div>
          )}

          {/* Navigation Actions Footer */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-[#EAECF0] dark:border-neutral-800">
            {/* Left Action: Previous Button */}
            <button
              type="button"
              onClick={onPrevious}
              className="h-[42px] px-5 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer select-none"
            >
              <ArrowLeftCircle className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8] rtl:rotate-180" />
              <span>{dict?.previous || (isRtl ? "السابق" : "Previous")}</span>
            </button>

            {/* Right Actions: Save & Exit + Next */}
            <div className="flex items-center gap-3">
              {/* Save & Exit Button */}
              <button
                type="button"
                onClick={onSaveAndExit}
                className="h-[42px] px-5 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer select-none"
              >
                <FloppyDisk className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8]" />
                <span>{dict?.saveAndExit || (isRtl ? "حفظ وخروج" : "Save & Exit")}</span>
              </button>

              {/* Next Button (Outline matching Save & Exit) */}
              <button
                type="button"
                onClick={onNext}
                className="h-[42px] px-6 rounded-[12px] border border-[#E4E7EC] dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-[#F9FAFB] dark:hover:bg-neutral-800 text-[#344054] dark:text-neutral-200 font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2 transition-colors cursor-pointer select-none"
              >
                <span>{dict?.next || (isRtl ? "التالي" : "Next")}</span>
                <ArrowRightCircle className="w-4 h-4 text-[#344054] dark:text-neutral-300 stroke-[1.8] rtl:rotate-180" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
