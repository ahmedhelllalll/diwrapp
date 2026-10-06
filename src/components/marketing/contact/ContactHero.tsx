'use client';

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { NavArrowRight, HomeSimple } from "iconoir-react";

interface ContactHeroProps {
  lang: string;
  breadcrumbHome?: string;
  breadcrumbCurrent?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactHero({
  lang,
  breadcrumbHome = "Di-Wrapp",
  breadcrumbCurrent = "Contact",
  title = "Let’s Get Connected",
  subtitle = "Whether you have a question about our services, need assistance, or just want to connect, our team is ready to help.",
}: ContactHeroProps) {
  const isRtl = lang === "ar";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="contact-hero-section pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 text-center flex flex-col items-center" aria-labelledby="contact-heading">
      {/* Breadcrumb Header */}
      <nav aria-label={isRtl ? "مسار التنقل" : "Breadcrumb"} className="contact-breadcrumb inline-flex items-center gap-2 mb-6 text-sm">
        <Link
          href={`/${lang}`}
          aria-label={isRtl ? "الصفحة الرئيسية" : "Homepage"}
          className="contact-breadcrumb-brand inline-flex items-center gap-1.5 p-1 rounded-sm text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <HomeSimple width={16} height={16} strokeWidth={1.75} className="contact-breadcrumb-icon shrink-0" aria-hidden="true" />
          <span dir="ltr" className="font-medium font-sans">{breadcrumbHome}</span>
        </Link>

        <NavArrowRight
          width={14}
          height={14}
          strokeWidth={1.5}
          className="contact-breadcrumb-sep shrink-0 text-slate-400 dark:text-zinc-500 rtl:rotate-180"
          aria-hidden="true"
        />

        <span className="contact-breadcrumb-current text-slate-900 dark:text-white font-medium" aria-current="page">
          {breadcrumbCurrent}
        </span>
      </nav>

      {/* Page Title & Subtitle with Entrance Animation */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl mx-auto"
      >
        <h1 id="contact-heading" className="contact-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mb-4">
          {title}
        </h1>

        <p className="contact-subtitle text-base sm:text-lg text-slate-600 dark:text-zinc-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}

