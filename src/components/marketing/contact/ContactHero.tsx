'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavArrowRight, NavArrowLeft, HomeSimple } from "iconoir-react";

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

  return (
    <section className="contact-hero-section" aria-labelledby="contact-heading">
      {/* Breadcrumb Header */}
      <nav aria-label="Breadcrumb" className="contact-breadcrumb inline-flex flex-row items-center gap-2">
        <Link href={`/${lang}`} className="contact-breadcrumb-brand inline-flex flex-row items-center gap-1.5 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <HomeSimple width={16} height={16} strokeWidth={1.75} className="contact-breadcrumb-icon shrink-0 text-slate-500 dark:text-zinc-400" aria-hidden="true" />
          <span dir="ltr" className="inline-block" style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}>{breadcrumbHome}</span>
        </Link>

        {isRtl ? (
          <NavArrowLeft width={14} height={14} strokeWidth={1.5} className="contact-breadcrumb-sep shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden="true" />
        ) : (
          <NavArrowRight width={14} height={14} strokeWidth={1.5} className="contact-breadcrumb-sep shrink-0 text-slate-400 dark:text-zinc-500" aria-hidden="true" />
        )}

        <span className="contact-breadcrumb-current inline-block text-slate-900 dark:text-white font-semibold" aria-current="page">
          {breadcrumbCurrent}
        </span>
      </nav>

      {/* Page Title & Subtitle with Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 id="contact-heading" className="contact-title text-slate-950 dark:text-white font-bold">
          {title}
        </h1>

        <p className="contact-subtitle text-slate-600 dark:text-zinc-300 font-normal leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
}
