"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle, ArrowRightCircle } from "iconoir-react";

export interface SuccessDict {
  title?: string;
  dear?: string;
  userName?: string;
  emailNotice?: string;
  supportNotice?: string;
  trackSubmission?: string;
  backHome?: string;
  [key: string]: any;
}

export interface VendorOnboardingSuccessProps {
  lang: string;
  dict?: SuccessDict;
  userName?: string;
}

export default function VendorOnboardingSuccess({
  lang,
  dict,
  userName: userNameProp,
}: VendorOnboardingSuccessProps) {
  const isRtl = lang === "ar";
  const userName = dict?.userName || userNameProp || (isRtl ? "عمر الديماسي" : "Omar AL-Dimassi");

  return (
    <div className="w-full flex-1 flex flex-col justify-center">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[520px]">
          {/* Left Column: 7 cols (Submission Confirmation) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right">
            {/* Success Status Icon */}
            <CheckCircle width={32} height={32} strokeWidth={1.5} className="w-8 h-8 text-[#101828] dark:text-white stroke-[1.5] mb-6" />

            {/* Main Headline */}
            <h1 className="font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[32px] sm:text-[40px] font-semibold text-[#101828] dark:text-white leading-[1.15] tracking-[-0.02em] mb-8">
              {dict?.title ||
                (isRtl
                  ? "تم تقديم طلبك بنجاح للمراجعة!"
                  : "Your Application is Submitted Successfully For Review!")}
            </h1>

            {/* Descriptive Body Text */}
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#475467] dark:text-neutral-400 font-normal leading-[1.6] max-w-[500px] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif]">
              <p>
                {dict?.dear || (isRtl ? "عزيزنا" : "Dear")}{" "}
                <span className="font-semibold text-[#101828] dark:text-white">
                  {userName}
                </span>
                {isRtl ? "،" : ","}
              </p>
              <p>
                {dict?.emailNotice ||
                  (isRtl
                    ? "سيتم إرسال بريد إلكتروني لتأكيد عملية التقديم، ويمكنك متابعة طلبك من خلال لوحة تحكم Di-Wrapp."
                    : "an email will be sent to confirm the application process, and you can track your Submission through Di-Wrapp Dashboard.")}
              </p>
              <p>
                {dict?.supportNotice ||
                  (isRtl
                    ? "يسعد فريق الدعم لدينا بمراجعة طلبك."
                    : "Our Support Team will have the pleasure to review your submission.")}
              </p>
            </div>

            {/* Call to Action Buttons Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {/* Track My Submission Button */}
              <Link
                href={`/${lang}/dashboard`}
                className="h-[46px] px-6 rounded-[12px] bg-[#101828] hover:bg-[#1D2939] dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-[#101828] font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] font-medium inline-flex items-center gap-2.5 transition-all shadow-xs cursor-pointer select-none"
              >
                <span>{dict?.trackSubmission || (isRtl ? "متابعة طلبي" : "Track My Submission")}</span>
                <ArrowRightCircle className="w-4 h-4 text-current rtl:rotate-180 stroke-[1.8]" />
              </Link>

              {/* Back To Homepage Link */}
              <Link
                href={`/${lang}`}
                className="text-[14px] font-medium text-[#344054] dark:text-neutral-300 hover:text-[#101828] dark:hover:text-white transition-colors cursor-pointer font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] select-none"
              >
                {dict?.backHome || (isRtl ? "العودة للرئيسية" : "Back To Homepage")}
              </Link>
            </div>
          </div>

          {/* Right Column: 5 cols (Visual Showcase Box) */}
          <div className="lg:col-span-5 w-full h-full min-h-[380px] sm:min-h-[480px] rounded-[28px] sm:rounded-[36px] bg-[#F2F4F7] dark:bg-neutral-900 border border-[#EAECF0] dark:border-neutral-800 relative overflow-hidden flex items-center justify-center shadow-xs">
            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-[#F9FAFB]/60 via-[#F2F4F7] to-[#EAECF0]/40 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800/40 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
