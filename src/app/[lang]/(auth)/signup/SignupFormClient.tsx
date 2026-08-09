"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";

type Dict = any; // You can type this better based on your setup

export default function SignupFormClient({ dict, lang }: { dict: Dict; lang: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // "advertiser" or "vendor"
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRoleSelect = (role: string) => {
    setFormData({ ...formData, role });
    setErrors({ ...errors, role: "" });
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = dict.signup.validationName;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = dict.signup.validationEmail;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.password.length < 6) newErrors.password = dict.signup.validationPassword;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = dict.signup.validationMatch;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.role) newErrors.role = dict.signup.validationRole;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3 && validateStep3()) {
      localStorage.setItem("diwrapp_user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: formData.role
      }));
      router.push(`/${lang}/${formData.role}`);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-sm flex flex-col justify-center my-auto">
      {/* Step Indicator */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-between text-[11px] font-bold text-[#64748b] dark:text-zinc-500 uppercase tracking-wider mb-2">
          <span>{step === 1 ? dict.signup.step1 : step === 2 ? dict.signup.step2 : dict.signup.step3}</span>
          <span>{step === 1 ? dict.signup.basicInfo : step === 2 ? dict.signup.security : dict.signup.selectRole}</span>
        </div>
        <div className="w-full h-1 bg-[#e2e8f0] dark:bg-zinc-800 rounded-full overflow-hidden flex">
          <motion.div 
            className="h-full bg-orange-500 rounded-full"
            initial={{ width: "33%" }}
            animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Content */}
      <div className="relative min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <h2 className="text-[21px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5 text-center tracking-tight">
                {dict.signup.title}
              </h2>
              <p className="text-[12.5px] text-[#64748b] dark:text-zinc-400 text-center leading-snug mb-6 max-w-[270px] mx-auto">
                {dict.signup.subtitle}
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  label={dict.signup.nameLabel}
                  placeholder={dict.signup.namePlaceholder}
                  iconLeft={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 mb-3 -mt-2">{errors.name}</p>}

                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  label={dict.auth.emailLabel}
                  placeholder={dict.auth.emailPlaceholder}
                  iconLeft={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 mb-3 -mt-2">{errors.email}</p>}

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full min-h-[44px] rounded-xl text-[14px] font-bold text-white dark:text-slate-900 bg-slate-900 dark:bg-white transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98] active:translate-y-0 mb-3 mt-4"
                >
                  {dict.signup.next}
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-zinc-800" />
                  <span className="text-[11px] text-[#9ca3af] dark:text-zinc-500">-{dict.auth.or}-</span>
                  <div className="h-px flex-1 bg-[#e5e7eb] dark:bg-zinc-800" />
                </div>

                <div className="flex flex-col gap-3">
                  {/* Google */}
                  <button
                    type="button"
                    className="w-full min-h-[44px] flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-[#111827] dark:text-zinc-100 hover:bg-gray-50 dark:bg-[#111111] dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
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
                    className="w-full min-h-[44px] flex items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-[#111827] dark:text-zinc-100 hover:bg-gray-50 dark:bg-[#111111] dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98] mb-2"
                  >
                    <svg viewBox="0 0 170 170" fill="currentColor" className="w-5 h-5 shrink-0 text-[#111827] dark:text-white">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.37-6.08-3.32-2.73-7.23-7.46-11.73-14.19-6.3-9.43-11.16-19.86-14.59-31.29-3.42-11.43-5.14-22.38-5.14-32.85 0-14.07 3.51-25.81 10.53-35.22 7.03-9.41 16.02-14.23 26.98-14.46 4.67 0 9.87 1.15 15.61 3.45 5.74 2.3 9.77 3.45 12.09 3.45 1.8 0 5.92-1.22 12.36-3.66 6.44-2.44 11.75-3.53 15.93-3.28 11.83.92 21.03 5.48 27.6 13.68-10.37 6.27-15.42 15.01-15.16 26.22.26 8.81 3.55 16.28 9.87 22.4 6.32 6.12 13.9 9.81 22.75 11.07-2.3 6.84-5.2 13.79-8.7 20.84zM119.22 31.08c0-7.23 2.65-14.34 7.95-21.32 5.3-6.98 12.07-11.25 20.31-12.81.43 1.93.65 3.73.65 5.4 0 7.37-2.74 14.54-8.21 21.51-5.48 6.97-12.34 11.16-20.58 12.57-.12-1.8-.12-3.58-.12-5.35z" />
                    </svg>
                    {dict.auth.apple}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <h2 className="text-[21px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5 text-center tracking-tight">
                {dict.signup.security}
              </h2>
              <p className="text-[12.5px] text-[#64748b] dark:text-zinc-400 text-center leading-snug mb-6 max-w-[270px] mx-auto">
                Secure your account with a strong password.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="w-full">
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  label={dict.auth.passwordLabel}
                  placeholder={dict.auth.passwordPlaceholder}
                  iconLeft={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1 mb-3 -mt-2">{errors.password}</p>}

                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label={dict.signup.confirmPasswordLabel}
                  placeholder={dict.auth.passwordPlaceholder}
                  iconLeft={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 mb-3 -mt-2">{errors.confirmPassword}</p>}

                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 min-h-[44px] rounded-xl border border-gray-200 dark:border-zinc-800 text-[14px] font-semibold text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    {dict.signup.back}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-1 min-h-[44px] rounded-xl text-[14px] font-bold text-white dark:text-slate-900 bg-slate-900 dark:bg-white transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    {dict.signup.next}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <h2 className="text-[21px] font-bold text-[#0f172a] dark:text-zinc-100 mb-1.5 text-center tracking-tight">
                {dict.signup.selectRole}
              </h2>
              <p className="text-[12.5px] text-[#64748b] dark:text-zinc-400 text-center leading-snug mb-6 max-w-[270px] mx-auto">
                Choose how you want to use the platform.
              </p>

              <form onSubmit={handleSubmit} className="w-full space-y-4">
                
                {/* Advertiser Card */}
                <div 
                  onClick={() => handleRoleSelect('advertiser')}
                  className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    formData.role === 'advertiser' 
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-500/10' 
                      : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.role === 'advertiser' ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'}`}>
                      <i className="fa-solid fa-bullhorn text-sm"></i>
                    </div>
                    <div>
                      <h3 className={`text-[15px] font-bold mb-1 transition-colors ${formData.role === 'advertiser' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-zinc-100'}`}>
                        {dict.signup.advertiserTitle}
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-zinc-400 leading-relaxed">
                        {dict.signup.advertiserSubtitle}
                      </p>
                    </div>
                  </div>
                  {formData.role === 'advertiser' && (
                    <div className="absolute top-4 end-4 text-orange-500">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  )}
                </div>

                {/* Vendor Card */}
                <div 
                  onClick={() => handleRoleSelect('vendor')}
                  className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    formData.role === 'vendor' 
                      ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-500/10' 
                      : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-900/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${formData.role === 'vendor' ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400'}`}>
                      <i className="fa-solid fa-display text-sm"></i>
                    </div>
                    <div>
                      <h3 className={`text-[15px] font-bold mb-1 transition-colors ${formData.role === 'vendor' ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-zinc-100'}`}>
                        {dict.signup.vendorTitle}
                      </h3>
                      <p className="text-[12px] text-gray-500 dark:text-zinc-400 leading-relaxed">
                        {dict.signup.vendorSubtitle}
                      </p>
                    </div>
                  </div>
                  {formData.role === 'vendor' && (
                    <div className="absolute top-4 end-4 text-orange-500">
                      <i className="fa-solid fa-circle-check"></i>
                    </div>
                  )}
                </div>

                {errors.role && <p className="text-red-500 text-xs mt-1 text-center">{errors.role}</p>}

                <div className="flex items-center gap-3 mt-6 pt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 min-h-[44px] rounded-xl border border-gray-200 dark:border-zinc-800 text-[14px] font-semibold text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    {dict.signup.back}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 min-h-[44px] rounded-xl text-[14px] font-bold text-white bg-orange-600 hover:bg-orange-700 transition-all duration-200 ease-out hover:-translate-y-[1px] active:scale-[0.98]"
                  >
                    {dict.signup.createAccount}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer */}
      {step === 1 && (
        <p className="text-center text-[12.5px] text-[#6b7280] dark:text-zinc-500 mt-5">
          {dict.signup.hasAccount}{" "}
          <Link
            href={`/${lang}/login`}
            className="font-bold text-[#111827] dark:text-zinc-100 hover:underline"
          >
            {dict.signup.login}
          </Link>
        </p>
      )}
    </div>
  );
}
