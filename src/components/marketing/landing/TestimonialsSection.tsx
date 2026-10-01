'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as LinkIcon } from 'iconoir-react';
import AboutTestimonialsMarquee from '@/components/marketing/about/AboutTestimonialsMarquee';

const DESKTOP_IMAGES = [
  'client-01.png', 'client-02.png',
  'client-03.png', 'client-04.png',
  'client-05.png', 'client-06.png', 'client-07.png', 'client-08.png', 'client-09.png',
  'client-10.png', 'client-11.png',
  'client-12.png', 'client-13.png',
];

function DesktopCardItem({
  fileName,
  className = '',
}: {
  fileName: string;
  className?: string;
}) {
  return (
    <div className={`testimonials-card rounded-2xl overflow-hidden opacity-100 ${className}`}>
      <Image
        src={`/images/testimonials/${fileName}`}
        alt=""
        width={160}
        height={200}
        sizes="(max-width: 768px) 68px, (max-width: 1024px) 94px, (max-width: 1280px) 120px, 130px"
        quality={85}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover opacity-100 block"
      />
    </div>
  );
}

interface TestimonialsSectionProps {
  lang?: string;
  badgeText?: string;
  headingLine1?: string;
  headingLine2?: string;
  subtitleText?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function TestimonialsSection({
  lang = 'en',
  badgeText = 'Testimonials',
  headingLine1 = 'Trusted by leaders',
  headingLine2 = 'from various industries',
  subtitleText = 'Discover why they rely on Di_Wrapp to power every step of their Booking journey',
  ctaText = 'Book Your Spot Now',
  ctaHref = `/${lang}/booking`,
}: TestimonialsSectionProps) {
  return (
    <section className="about-testimonials-section">
      <div className="testimonials-container">
        
        {/* =========================================================================
            DESKTOP (>= 768px): 3-Part Proportional Arch Layout (2 : 5 : 2 = 9 cols)
            ========================================================================= */}
        <div className="testimonials-desktop-wrapper">
          <div className="testimonials-arch-layout">
            
            {/* Left Flank (Columns 1 & 2) */}
            <div className="testimonials-flank testimonials-flank-left">
              {/* Column 1: Far Left */}
              <div className="testimonials-col testimonials-col-1">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <DesktopCardItem fileName={DESKTOP_IMAGES[0]} />
                <DesktopCardItem fileName={DESKTOP_IMAGES[1]} />
              </div>

              {/* Column 2: Second Outer */}
              <div className="testimonials-col testimonials-col-2">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <DesktopCardItem fileName={DESKTOP_IMAGES[2]} />
                <DesktopCardItem fileName={DESKTOP_IMAGES[3]} />
              </div>
            </div>

            {/* Center Chamber (Arch Ceiling + Central Content) */}
            <div className="testimonials-center-chamber">
              {/* Arch Top (Columns 3, 4, 5, 6, 7: Inner / central 100% opacity) */}
              <div className="testimonials-arch-top">
                <div className="testimonials-col testimonials-col-3">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <DesktopCardItem fileName={DESKTOP_IMAGES[4]} />
                </div>
                <div className="testimonials-col testimonials-col-4">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <DesktopCardItem fileName={DESKTOP_IMAGES[5]} />
                </div>
                <div className="testimonials-col testimonials-col-5">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <DesktopCardItem fileName={DESKTOP_IMAGES[6]} />
                </div>
                <div className="testimonials-col testimonials-col-6">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <DesktopCardItem fileName={DESKTOP_IMAGES[7]} />
                </div>
                <div className="testimonials-col testimonials-col-7">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <DesktopCardItem fileName={DESKTOP_IMAGES[8]} />
                </div>
              </div>

              {/* Central Content nestled right under the arch */}
              <div className="testimonials-center-content">
                <div
                  className="testimonials-badge"
                  data-reveal="pop"
                  style={{ '--i': 0 } as React.CSSProperties}
                >
                  <LinkIcon width={14} height={14} className="testimonials-badge-icon" />
                  <span>{badgeText}</span>
                </div>

                <h2
                  className="testimonials-heading"
                  data-reveal="up"
                  style={{ '--i': 1 } as React.CSSProperties}
                >
                  <span>{headingLine1}</span>
                  <span className="subtitle-line">{headingLine2}</span>
                </h2>

                <p
                  className="testimonials-subtitle"
                  data-reveal="up"
                  style={{ '--i': 2 } as React.CSSProperties}
                >
                  {subtitleText}
                </p>

                <div
                  data-reveal="up"
                  style={{ '--i': 3 } as React.CSSProperties}
                  className="inline-flex"
                >
                  <Link href={ctaHref} className="testimonials-cta-btn">
                    <span>{ctaText}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Flank (Columns 8 & 9) */}
            <div className="testimonials-flank testimonials-flank-right">
              {/* Column 8: Second Outer */}
              <div className="testimonials-col testimonials-col-8">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <DesktopCardItem fileName={DESKTOP_IMAGES[9]} />
                <DesktopCardItem fileName={DESKTOP_IMAGES[10]} />
              </div>

              {/* Column 9: Far Right */}
              <div className="testimonials-col testimonials-col-9">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <DesktopCardItem fileName={DESKTOP_IMAGES[11]} />
                <DesktopCardItem fileName={DESKTOP_IMAGES[12]} />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            MOBILE (< 768px): Two-Row Smooth Wall of Faces + Content
            ========================================================================= */}
        <div className="testimonials-mobile-wrapper">
          <AboutTestimonialsMarquee />

          <div className="testimonials-mobile-content">
            <div
              className="testimonials-badge"
              data-reveal="pop"
              style={{ '--i': 0 } as React.CSSProperties}
            >
              <LinkIcon width={14} height={14} className="testimonials-badge-icon" />
              <span>{badgeText}</span>
            </div>

            <h2
              className="testimonials-heading"
              data-reveal="up"
              style={{ '--i': 1 } as React.CSSProperties}
            >
              <span>{headingLine1}</span>
              <span className="subtitle-line">{headingLine2}</span>
            </h2>

            <p
              className="testimonials-subtitle"
              data-reveal="up"
              style={{ '--i': 2 } as React.CSSProperties}
            >
              {subtitleText}
            </p>

            <div
              data-reveal="up"
              style={{ '--i': 3 } as React.CSSProperties}
              className="inline-flex"
            >
              <Link href={ctaHref} className="testimonials-cta-btn">
                <span>{ctaText}</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
