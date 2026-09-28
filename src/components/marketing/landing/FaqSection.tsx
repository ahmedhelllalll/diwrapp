"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  hasLink?: boolean;
}

const appleEasing = [0.16, 1, 0.3, 1] as const;

export default function FaqSection({ lang }: { lang: "en" | "ar" }) {
  const isRtl = lang === "ar";
  const [openId, setOpenId] = useState<string | null>("q2"); // Default open second item matching Figma
  const shouldReduceMotion = useReducedMotion();

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
    <section id="faq" className="w-full py-20 sm:py-28 px-4 sm:px-6 relative z-10 overflow-visible">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        
        {/* Eyebrow Badge */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: appleEasing }}
        >
          <Badge className="gap-2 mb-6">
            <svg className="w-4 h-4 text-slate-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3" />
              <circle cx="12" cy="16" r="0.5" fill="currentColor" />
            </svg>
            <span className="tracking-wider">
              {isRtl ? "الأسئلة الشائعة" : "FAQ"}
            </span>
          </Badge>
        </motion.div>

        {/* Dual Line Heading */}
        <motion.h2
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, delay: shouldReduceMotion ? 0 : 0.08, ease: appleEasing }}
          className="text-3xl sm:text-5xl font-extrabold text-heading dark:text-white text-center leading-[1.15] mb-12 tracking-tight font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]"
        >
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
        </motion.h2>

        {/* Accordion List */}
        <div className="w-full flex flex-col gap-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : 0.16 + idx * 0.06,
                  ease: appleEasing,
                }}
                className={`w-full rounded-2xl sm:rounded-[22px] border transition-[border-color,background-color,box-shadow] duration-200 ${
                  isOpen
                    ? "bg-white dark:bg-surface-3 border-neutral-300 dark:border-white/[0.18] shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                    : "bg-white dark:bg-surface-2 border-neutral-200/80 dark:border-white/[0.07] hover:border-neutral-300 dark:hover:border-white/[0.14] dark:hover:bg-surface-3"
                }`}
              >
                <button
                  type="button"
                  id={`faq-question-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full py-4 sm:py-5 px-6 sm:px-7 flex items-center justify-between text-start gap-4 cursor-pointer select-none"
                >
                  <span className="text-sm sm:text-base font-bold text-heading dark:text-white leading-snug font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
                    {faq.question}
                  </span>
                  
                  {/* Plus / Minus indicator matching Figma with zero font-light dependency */}
                  <span 
                    className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-700 dark:text-neutral-300 transition-colors" 
                    aria-hidden="true"
                  >
                    <svg 
                      className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M12 5v14" 
                        className={`transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                          isOpen ? "opacity-0 scale-y-0" : "opacity-100 scale-y-100"
                        }`} 
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                  </span>
                </button>

                {/* Hardware-accelerated CSS Grid Accordion Expansion (Zero Layout Thrashing) */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                  className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className={`px-6 sm:px-7 pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1 leading-relaxed font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? "opacity-100" : "opacity-0"
                    }`}>
                      {faq.hasLink ? (
                        isRtl ? (
                          <>
                            يمكنك التسجيل بكل سهولة عبر زيارة{" "}
                            <Link 
                              aria-label="التسجيل في منصة دي راب وإنشاء حساب جديد"
                              className="font-semibold text-slate-900 dark:text-blue-400 underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" 
                              href={`/${lang}/signup`}
                            >
                              رابط التسجيل
                            </Link>{" "}
                            واتباع الخطوات البسيطة.
                          </>
                        ) : (
                          <>
                            You can sign up easily by visiting{" "}
                            <Link 
                              aria-label="Sign up for a new Diwrapp account"
                              className="font-semibold text-slate-900 dark:text-blue-400 underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-300 transition-colors" 
                              href={`/${lang}/signup`}
                            >
                              Sign Up Link
                            </Link>{" "}
                            and following the instructions.
                          </>
                        )
                      ) : (
                        faq.answer
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More CTA Button */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: shouldReduceMotion ? 0 : 0.48, ease: appleEasing }}
          className="mt-10 sm:mt-12"
        >
          <Link
            href={`/${lang}/contact`}
            aria-label={isRtl ? "عرض المزيد من الأسئلة الشائعة أو التواصل معنا" : "View more frequently asked questions or contact us"}
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/[0.05] hover:bg-slate-50 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-sm transition-all duration-200 active:scale-[0.98] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] cursor-pointer"
          >
            {isRtl ? "عرض المزيد" : "View More"}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
