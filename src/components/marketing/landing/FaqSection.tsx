"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  hasLink?: boolean;
}

export default function FaqSection({ lang }: { lang: "en" | "ar" }) {
  const isRtl = lang === "ar";
  const [openId, setOpenId] = useState<string | null>("q2"); // Default open second item matching Figma

  const faqs: FaqItem[] = [
    {
      id: "q1",
      question: isRtl ? "ما هو Di_Wrapp وكيف يعمل؟" : "What is Di_Wrapp and how does it work?",
      answer: isRtl 
        ? "منصة Di_Wrapp هي شبكة وسائط ذكية تربط بين مساحات الإعلانات والمعلنين بكل سلاسة وسرعة."
        : "Di_Wrapp is an advanced media network platform that streamlines outdoor and digital advertising across diverse channels."
    },
    {
      id: "q2",
      question: isRtl ? "كيف يمكنني إنشاء حساب؟" : "How do I create an account?",
      answer: isRtl 
        ? "يمكنك التسجيل بكل سهولة عبر زيارة رابط التسجيل واتباع الخطوات البسيطة."
        : "You can sign up easily by visiting Sign Up Link and following the instructions.",
      hasLink: true
    },
    {
      id: "q3",
      question: isRtl ? "كيف يمكنني إعادة تعيين كلمة المرور؟" : "How can I reset my password?",
      answer: isRtl 
        ? "اضغط على نسيت كلمة المرور في صفحة تسجيل الدخول واتبع التعليمات المرسلة لبريدك."
        : "Click on 'Forgot Password' on the sign in page and follow the email verification instructions."
    },
    {
      id: "q4",
      question: isRtl ? "كيف يمكنني تحديث بيانات الدفع؟" : "How do I update my payment details?",
      answer: isRtl 
        ? "يمكنك إدارة وتحديث طرق الدفع مباشرة من إعدادات حسابك ولوحة التحكم."
        : "Navigate to your billing settings inside your dashboard to add or update your payment methods."
    },
    {
      id: "q5",
      question: isRtl ? "هل يمكنني دمج لوحتي الإعلانية بنظام Di_Wrapp؟" : "Can I integrate My Billboard With Di_Wrapp Sytem?",
      answer: isRtl 
        ? "نعم، يمكنك تقديم طلب انضمام الشركاء وربط لوحاتك بالنظام الذكي بسهولة."
        : "Yes, billboard owners can easily connect their inventories and launch smart programmatic booking."
    }
  ];

  return (
    <section id="faq" className="w-full py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-transparent dark:bg-white/[0.02] mb-6">
          <svg className="w-4 h-4 text-slate-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3" />
            <circle cx="12" cy="16" r="0.5" fill="currentColor" />
          </svg>
          <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300 tracking-wider font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
            {isRtl ? "الأسئلة الشائعة" : "FAQ"}
          </span>
        </div>

        {/* Dual Line Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] dark:text-white text-center leading-[1.15] mb-12 tracking-tight font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
          {isRtl ? (
            <>
              الأسئلة
              <br />
              الأكثر شيوعاً
            </>
          ) : (
            <>
              Frequently
              <br />
              Asked Questions
            </>
          )}
        </h2>

        {/* Accordion List */}
        <div className="w-full flex flex-col gap-3.5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`w-full rounded-2xl sm:rounded-[22px] border transition-all duration-300 ${
                  isOpen
                    ? "bg-white dark:bg-white/[0.05] backdrop-blur-md border-neutral-300 dark:border-white/[0.18] shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                    : "bg-white/80 dark:bg-white/[0.025] backdrop-blur-md border-neutral-200/80 dark:border-white/[0.07] hover:border-neutral-300 dark:hover:border-white/[0.14] dark:hover:bg-white/[0.04]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-7 flex items-center justify-between text-start gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0F172A] dark:text-white leading-snug font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                    {faq.question}
                  </span>
                  
                  {/* Plus / Minus indicator matching Figma */}
                  <span className="text-xl sm:text-2xl font-light text-slate-700 dark:text-neutral-300 shrink-0 w-6 h-6 flex items-center justify-center transition-colors">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1 leading-relaxed font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                        {faq.hasLink ? (
                          isRtl ? (
                            <>
                              يمكنك التسجيل بكل سهولة عبر زيارة{" "}
                              <Link className="font-semibold text-slate-900 dark:text-blue-400 underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href={`/${lang}/signup`}>
                                رابط التسجيل
                              </Link>{" "}
                              واتباع الخطوات البسيطة.
                            </>
                          ) : (
                            <>
                              You can sign up easily by visiting{" "}
                              <Link className="font-semibold text-slate-900 dark:text-blue-400 underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" href={`/${lang}/signup`}>
                                Sign Up Link
                              </Link>{" "}
                              and following the instructions.
                            </>
                          )
                        ) : (
                          faq.answer
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* View More CTA Button */}
        <div className="mt-10 sm:mt-12">
          <button
            type="button"
            className="px-8 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] cursor-pointer"
          >
            {isRtl ? "عرض المزيد" : "View More"}
          </button>
        </div>

      </div>
    </section>
  );
}
