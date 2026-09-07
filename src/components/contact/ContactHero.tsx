import React from "react";
import Link from "next/link";
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
      <nav aria-label="Breadcrumb" className="contact-breadcrumb">
        <Link href={`/${lang}`} className="contact-breadcrumb-brand">
          <HomeSimple width={16} height={16} strokeWidth={1.75} className="contact-breadcrumb-icon" aria-hidden="true" />
          <span>{breadcrumbHome}</span>
        </Link>

        {isRtl ? (
          <NavArrowLeft width={14} height={14} strokeWidth={1.5} className="contact-breadcrumb-sep" aria-hidden="true" />
        ) : (
          <NavArrowRight width={14} height={14} strokeWidth={1.5} className="contact-breadcrumb-sep" aria-hidden="true" />
        )}

        <span className="contact-breadcrumb-current" aria-current="page">
          {breadcrumbCurrent}
        </span>
      </nav>

      {/* Page Title (H1) */}
      <h1 id="contact-heading" className="contact-title">
        {title}
      </h1>

      {/* Hero Subtitle */}
      <p className="contact-subtitle">
        {subtitle}
      </p>
    </section>
  );
}
