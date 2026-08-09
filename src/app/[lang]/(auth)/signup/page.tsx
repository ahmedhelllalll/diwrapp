import type { Metadata } from "next";
import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import Link from 'next/link';
import Image from 'next/image';
import LanguageToggle from "@/components/common/LanguageToggle";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import SignupFormClient from "./SignupFormClient";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.metadata.signup.title,
    description: dict.metadata.signup.description,
  };
}

export default async function Signup(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="flex min-h-screen w-full justify-center bg-gray-100 dark:bg-black overflow-hidden" suppressHydrationWarning>
      <div className="flex w-full max-w-[1600px] flex-col lg:flex-row gap-6 items-stretch px-4 lg:px-8 py-6 min-h-screen overflow-hidden">

        {/* ─── LEFT: floating gradient card ─── */}
        <div
          className="hidden lg:flex w-1/2 h-full rounded-3xl overflow-hidden relative transition-all duration-300 dark:bg-[#0a0a0a] dark:border dark:border-orange-500/10 shadow-sm p-10 lg:p-14 flex-col justify-between"
        >
          {/* Light Mode Gradient */}
          <div 
            className="absolute inset-0 z-0 dark:opacity-0 transition-opacity duration-300"
            style={{
              background: "radial-gradient(ellipse at 48% 52%, #ea580c 0%, #f97316 25%, #fdba74 50%, #fed7aa 65%, #ffedd5 78%, #fff7ed 100%)"
            }}
          />
          
          {/* Dark Mode Neon Glow */}
          <div 
            className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_48%_52%,rgba(234,88,12,0.18)_0%,transparent_70%)] blur-[40px]" 
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between w-full h-full">
            {/* Top: logo + brand */}
            <div className="flex items-center gap-2">
              <div
                className="w-[32px] h-[32px] flex items-center justify-center shrink-0"
              >
                <Image src="/logo.png" alt="Di-wrapp" width={22} height={22} className="object-contain" />
              </div>
              <div className="flex items-baseline">
                <span className="text-[14px] font-extrabold tracking-tight text-[#111827] dark:text-white transition-colors duration-300">Di-wrapp</span>
                <span className="text-[7px] font-bold uppercase text-[#4b5563] dark:text-zinc-400 relative -top-[5px] ml-[2px] tracking-wide transition-colors duration-300">SD</span>
              </div>
            </div>

            {/* Bottom: tagline + heading */}
            <div>
              <p className="text-[13px] font-medium text-[#374151] dark:text-zinc-400 mb-2.5 transition-colors duration-300">
                {dict.auth.leftSubTag}
              </p>
              <h1 className="text-[28px] font-bold text-[#111827] dark:text-white leading-[1.28] max-w-[370px] transition-colors duration-300">
                {dict.auth.leftHeading}
              </h1>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: floating white card, vertically centered content ─── */}
        <div className="w-full lg:w-1/2 h-full rounded-3xl bg-white dark:bg-[#0a0a0a] dark:border dark:border-zinc-800 relative flex flex-col justify-center items-center p-8 lg:p-12 shadow-sm transition-all duration-300">

          {/* Toggles — top-right */}
          <div className="absolute top-6 end-6 flex items-center gap-2 z-20">
            <ThemeToggle />
            <LanguageToggle currentLang={lang} />
          </div>

          {/* Form content */}
          <SignupFormClient dict={dict} lang={lang} />
        </div>
      </div>
    </div>
  );
}
