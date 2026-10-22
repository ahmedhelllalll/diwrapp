"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Cart, User } from "iconoir-react";
import { CountryBadgeSkeleton } from "@/components/common/CountryBadgeSkeleton";

export interface VendorOnboardingHeaderProps {
  lang: string;
  dict?: {
    userName?: string;
    cartAriaLabel?: string;
    userBadgeAriaLabel?: string;
    switchLang?: string;
  };
  cartBadge?: number | string;
  showLanguageSwitcher?: boolean;
  countryCode?: string;
  countryBadge?: React.ReactNode;
}

export default function VendorOnboardingHeader({
  lang,
  dict,
  cartBadge,
  showLanguageSwitcher = true,
  countryCode: _initialCountryCode,
  countryBadge,
}: VendorOnboardingHeaderProps) {
  const pathname = usePathname();
  const isRtl = lang === "ar";
  const targetLang = isRtl ? "en" : "ar";
  const switchLabel = dict?.switchLang || (isRtl ? "English" : "عربي");
  const userName = dict?.userName || "Omar AL-Dimassi";

  // Build target URL preserving current subpath
  const targetHref = pathname
    ? pathname.replace(new RegExp(`^/${lang}`), `/${targetLang}`)
    : `/${targetLang}/vendor/onboarding`;

  return (
    <header className="w-full bg-white dark:bg-[#080808] border-b border-[#EAECF0] dark:border-neutral-800 sticky top-0 z-[1000] transition-colors">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Start: Logo */}
        <Link
          href={`/${lang}`}
          className="brand-logo inline-flex items-center gap-2 shrink-0 select-none group"
          aria-label="Di-wrapp Home"
        >
          <div className="w-8 h-8 shrink-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Di-wrapp Logo"
              width={32}
              height={32}
              priority
              className="object-contain w-full h-full"
            />
          </div>
          <span className="font-semibold text-xl tracking-tight leading-none text-[#101828] dark:text-white flex items-center">
            Di-wrapp
            {countryBadge ?? <CountryBadgeSkeleton key="country-badge-skeleton" />}
          </span>
        </Link>

        {/* End: Cart, User Badge, Language Switcher */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon Button */}
          <button
            type="button"
            aria-label={dict?.cartAriaLabel || "Cart"}
            className="relative w-10 h-10 rounded-[10px] border border-[#EAECF0] dark:border-neutral-800 flex items-center justify-center text-[#344054] dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <Cart width={20} height={20} strokeWidth={1.8} />
            {cartBadge !== undefined && cartBadge !== null && (
              <span className="bg-[#0066FF] text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center absolute -top-1.5 -right-1.5 shadow-xs font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                {cartBadge}
              </span>
            )}
          </button>

          {/* User Badge Pill */}
          <div
            role="button"
            tabIndex={0}
            aria-label={dict?.userBadgeAriaLabel || "User profile"}
            className="h-10 px-3 sm:px-4 rounded-[10px] border border-[#EAECF0] dark:border-neutral-800 flex items-center gap-2 text-[#344054] dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors cursor-pointer select-none font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
          >
            <User width={18} height={18} strokeWidth={1.8} className="shrink-0 text-[#344054] dark:text-neutral-300" />
            <span className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium whitespace-nowrap">
              {userName}
            </span>
          </div>

          {/* Language Switcher */}
          {showLanguageSwitcher && (
            <Link
              href={targetHref}
              className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium text-[#344054] dark:text-neutral-300 hover:text-[#0066FF] dark:hover:text-blue-400 transition-colors px-2 py-1 select-none"
            >
              {switchLabel}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
