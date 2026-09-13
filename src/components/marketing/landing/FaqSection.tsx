'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FaqSection() {
  // Initialize with index 1 open (second item), just like the Figma screenshot
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const faqs = [
    { 
      question: 'What is Di_Wrapp and how does it work?', 
      answer: 'Di_Wrapp is a comprehensive advertising platform that bridges the gap between digital screen owners and advertisers, allowing seamless management and booking of digital out-of-home media.' 
    },
    { 
      question: 'How do I create an account?', 
      answer: (
        <>
          You can sign up easily by visiting <a href="#" className="underline font-medium hover:text-blue-600 transition-colors">Sign Up Link</a> and following the instructions.
        </>
      )
    },
    { 
      question: 'How can I reset my password?', 
      answer: 'If you forgot your password, you can click on the "Forgot Password" link on the login page and follow the emailed instructions to reset it.' 
    },
    { 
      question: 'How do I update my payment details?', 
      answer: 'You can securely update your payment details by navigating to the "Billing" or "Payment Methods" section within your account settings.' 
    },
    { 
      question: 'Can I integrate My Billboard With Di_Wrapp Sytem?', 
      answer: 'Yes, we provide robust APIs and integration tools for billboard owners to effortlessly connect and manage their screens within our system.' 
    },
  ];

  return (
    <section className="w-full py-24 px-4 bg-white dark:bg-transparent relative z-10">
      <div className="max-w-[760px] mx-auto flex flex-col items-center">
        
        {/* Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg shadow-sm mb-6 text-[12px] font-bold text-slate-700 dark:text-zinc-300">
          <i className="fa-solid fa-shield-halved"></i>
          FAQ
        </div>

        {/* Title */}
        <h2 className="text-[40px] md:text-[48px] font-bold text-center text-slate-900 dark:text-white leading-[1.1] mb-12 tracking-tight">
          Frequently<br />
          Asked Questions
        </h2>

        {/* Accordion Container */}
        <div className="w-full space-y-3 mb-12">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-slate-200 dark:border-zinc-800 rounded-[16px] bg-white dark:bg-[#0a0a0a] overflow-hidden"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)} 
                className="w-full p-4 flex items-center justify-between text-left transition-colors hover:bg-slate-50 dark:hover:bg-zinc-900/50"
              >
                <span className="text-[15px] font-semibold text-slate-900 dark:text-zinc-100">
                  {faq.question}
                </span>
                <div className="flex items-center justify-center text-slate-900 dark:text-zinc-300 w-6 h-6 shrink-0">
                  {openFaq === idx ? (
                    <i className="fa-solid fa-minus text-[15px]"></i>
                  ) : (
                    <i className="fa-solid fa-plus text-[15px]"></i>
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-5 pt-1 text-[13.5px] font-medium text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <button className="px-8 py-3 bg-[#0f172a] dark:bg-white text-white dark:text-black text-[14px] font-bold rounded-[12px] hover:bg-black dark:hover:bg-zinc-200 transition-all shadow-[0_4px_12px_rgba(15,23,42,0.15)] active:scale-[0.98]">
          View More
        </button>

      </div>
    </section>
  );
}
