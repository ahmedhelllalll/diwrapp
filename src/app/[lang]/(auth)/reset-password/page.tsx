import type { Metadata } from "next";
import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import Link from 'next/link';
import Image from 'next/image';
import LanguageToggle from "@/components/common/LanguageToggle";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Input } from "@/components/ui/Input";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: dict.metadata.resetPassword.title,
    description: dict.metadata.resetPassword.description,
  };
}

export default async function ResetPassword(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-black overflow-hidden transition-colors duration-300 flex justify-center">
      <div className="w-full max-w-[1600px] px-4 lg:px-8 py-6 h-screen overflow-hidden flex flex-col lg:flex-row gap-6 items-stretch">

        {/* ─── LEFT: floating gradient card ─── */}
        <div
          className="hidden lg:flex w-1/2 h-full rounded-3xl overflow-hidden relative transition-all duration-300 dark:bg-[#0a0a0a] dark:border dark:border-zinc-800 shadow-sm p-10 lg:p-14 flex-col justify-between"
        >
          {/* Light Mode Gradient */}
          <div 
            className="absolute inset-0 z-0 dark:opacity-0 transition-opacity duration-300"
            style={{
              background: "radial-gradient(ellipse at 48% 52%, #1d4ed8 0%, #3b82f6 25%, #93bbfd 50%, #c7d9fe 65%, #dbeafe 78%, #eef2f7 100%)"
            }}
          />
          
          {/* Dark Mode Neon Glow */}
          <div 
            className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_48%_52%,rgba(37,99,235,0.08)_0%,transparent_70%)] blur-[40px]" 
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
          <div className="w-full max-w-sm flex flex-col justify-center my-auto">
            
            {/* Logo icon */}
            <div className="flex items-center justify-center mb-5">
              <Image src="/logo.png" alt="Di-wrapp" width={44} height={44} className="object-contain" />
            </div>

            {/* Welcome heading */}
            <h2 className="text-[21px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5 text-center tracking-tight">
              {dict.resetPassword.title}
            </h2>

            {/* Subtitle */}
            <p className="text-[12.5px] text-[#64748b] dark:text-zinc-400 text-center leading-snug mb-8 max-w-[270px] mx-auto">
              {dict.resetPassword.subtitle}
            </p>

            {/* Form */}
            <form className="w-full">
              
              <Input
                type="email"
                label={dict.auth.emailLabel}
                placeholder={dict.resetPassword.emailPlaceholder}
                iconLeft={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
                required
              />

              {/* Submit button */}
              <button
                type="submit"
                className="w-full min-h-[44px] rounded-xl text-[14px] font-bold text-white dark:text-slate-900 bg-slate-900 dark:bg-white transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0 mb-6 mt-4"
              >
                {dict.resetPassword.submit}
              </button>

              {/* Back to Login link */}
              <div className="flex justify-center">
                <Link
                  href={`/${lang}/login`}
                  className="flex items-center gap-2 text-[13px] font-semibold text-[#6b7280] dark:text-zinc-400 hover:text-[#111827] dark:hover:text-zinc-100 transition-colors duration-200 group"
                >
                  <i className="fa-solid fa-arrow-left transition-transform duration-200 group-hover:-translate-x-1"></i>
                  {dict.resetPassword.back}
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
