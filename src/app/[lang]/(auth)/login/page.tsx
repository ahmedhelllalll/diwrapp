import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import Link from 'next/link';
import Image from 'next/image';
import LanguageToggle from "@/components/common/LanguageToggle";
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Input } from "@/components/ui/Input";

export default async function Login(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="h-screen w-full flex gap-4 lg:gap-6 p-4 lg:p-6 overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>

      {/* ─── LEFT: floating gradient card ─── */}
      <div
        className="hidden lg:flex w-1/2 lg:w-[55%] h-full rounded-[24px] flex-col justify-between p-10 overflow-hidden shrink-0"
        style={{
          background: "radial-gradient(ellipse at 48% 52%, #1d4ed8 0%, #3b82f6 25%, #93bbfd 50%, #c7d9fe 65%, #dbeafe 78%, #eef2f7 100%)"
        }}
      >
          {/* Top: logo + brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-[32px] h-[32px] rounded-[8px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#111827' }}
            >
              <Image src="/logo.png" alt="Di-wrapp" width={18} height={18} className="object-contain" />
            </div>
            <div className="flex items-baseline">
              <span className="text-[14px] font-extrabold tracking-tight text-[#111827]">Di-wrapp</span>
              <span className="text-[7px] font-bold uppercase text-[#4b5563] relative -top-[5px] ml-[2px] tracking-wide">SD</span>
            </div>
          </div>

          {/* Bottom: tagline + heading */}
          <div>
            <p className="text-[13px] font-medium text-[#374151] mb-2.5">
              {dict.auth.leftSubTag}
            </p>
            <h1 className="text-[28px] font-bold text-[#111827] leading-[1.28] max-w-[370px]">
              {dict.auth.leftHeading}
            </h1>
          </div>
      </div>

      {/* ─── RIGHT: floating white card, vertically centered content ─── */}
      <div className="flex-1 h-full bg-white dark:bg-[#0a0a0a] rounded-[24px] shadow-sm flex flex-col items-center justify-center relative overflow-y-auto">

        {/* Toggles — top-right */}
        <div className="absolute top-5 rtl:left-5 ltr:right-5 flex items-center gap-2 z-10">
          <ThemeToggle />
          <LanguageToggle currentLang={lang} />
        </div>

        {/* Form content */}
        <div className="w-full max-w-[340px] flex flex-col items-center px-4">

          {/* Logo icon */}
          <div
            className="w-[48px] h-[48px] rounded-[13px] flex items-center justify-center mb-4"
            style={{ backgroundColor: '#111827' }}
          >
            <Image src="/logo.png" alt="Di-wrapp" width={26} height={26} className="object-contain" />
          </div>

          {/* Welcome heading */}
          <h2 className="text-[21px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5 text-center tracking-tight">
            {dict.login.title}
          </h2>

          {/* Subtitle */}
          <p className="text-[12.5px] text-[#64748b] dark:text-zinc-400 text-center leading-snug mb-6 max-w-[270px]">
            {dict.login.subtitle}
          </p>

          {/* Form */}
          <form className="w-full">

            <Input
              type="email"
              label={dict.auth.emailLabel}
              placeholder={dict.auth.emailPlaceholder}
              iconLeft={<i className="fa-regular fa-envelope" />}
              required
            />

            <Input
              type="password"
              label={dict.auth.passwordLabel}
              placeholder={dict.auth.passwordPlaceholder}
              iconLeft={<i className="fa-solid fa-lock" />}
              iconRight={<i className="fa-regular fa-eye-slash" />}
              required
              wrapperClassName="mb-1"
            />

            {/* Forgot password */}
            <div className="flex justify-end mb-4">
              <Link
                href={`/${lang}/reset-password`}
                className="text-[12px] text-[#6b7280] dark:text-zinc-400 hover:text-[#111827] dark:hover:text-zinc-200 transition-colors"
              >
                {dict.login.forgot}
              </Link>
            </div>

            {/* Log In button */}
            <button
              type="submit"
              className="w-full h-[44px] rounded-xl text-[14px] font-bold text-white transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0 mb-3"
              style={{ backgroundColor: '#0f172a' }}
            >
              {dict.login.submit}
            </button>

            {/* -or- */}
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-zinc-800" />
              <span className="text-[11px] text-[#9ca3af] dark:text-zinc-500">
                -{dict.auth.or}-
              </span>
              <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-zinc-800" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full h-[42px] flex items-center justify-center gap-2.5 rounded-xl border border-[#e5e7eb] dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-[13px] font-semibold text-[#111827] dark:text-zinc-100 mb-2.5 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#f9fafb] dark:hover:bg-zinc-800/70 active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              {dict.auth.google}
            </button>

            {/* Apple */}
            <button
              type="button"
              className="w-full h-[42px] flex items-center justify-center gap-2.5 rounded-xl border border-[#e5e7eb] dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-[13px] font-semibold text-[#111827] dark:text-zinc-100 mb-5 transition-all duration-200 ease-out hover:-translate-y-[1px] hover:bg-[#f9fafb] dark:hover:bg-zinc-800/70 active:scale-[0.98]"
            >
              <svg viewBox="0 0 170 170" fill="currentColor" className="w-[15px] h-[15px] shrink-0 text-[#111827] dark:text-white">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.37-6.08-3.32-2.73-7.23-7.46-11.73-14.19-6.3-9.43-11.16-19.86-14.59-31.29-3.42-11.43-5.14-22.38-5.14-32.85 0-14.07 3.51-25.81 10.53-35.22 7.03-9.41 16.02-14.23 26.98-14.46 4.67 0 9.87 1.15 15.61 3.45 5.74 2.3 9.77 3.45 12.09 3.45 1.8 0 5.92-1.22 12.36-3.66 6.44-2.44 11.75-3.53 15.93-3.28 11.83.92 21.03 5.48 27.6 13.68-10.37 6.27-15.42 15.01-15.16 26.22.26 8.81 3.55 16.28 9.87 22.4 6.32 6.12 13.9 9.81 22.75 11.07-2.3 6.84-5.2 13.79-8.7 20.84zM119.22 31.08c0-7.23 2.65-14.34 7.95-21.32 5.3-6.98 12.07-11.25 20.31-12.81.43 1.93.65 3.73.65 5.4 0 7.37-2.74 14.54-8.21 21.51-5.48 6.97-12.34 11.16-20.58 12.57-.12-1.8-.12-3.58-.12-5.35z" />
              </svg>
              {dict.auth.apple}
            </button>

            {/* Footer */}
            <p className="text-center text-[12.5px] text-[#6b7280] dark:text-zinc-500">
              {dict.login.noAccount}{" "}
              <Link
                href={`/${lang}/signup`}
                className="font-bold text-[#111827] dark:text-zinc-100 hover:underline"
              >
                {dict.login.register}
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}
