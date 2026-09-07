'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Link as LinkIcon } from 'iconoir-react';

export interface ClientProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  imageFileName: string;
  fallbackSrc: string;
}

export const CLIENT_PROFILES: ClientProfile[] = [
  // Col 1 (Far Left)
  {
    id: 'client-01',
    name: 'Alexander Wright',
    role: 'Managing Director',
    company: 'Nexus Media',
    imageFileName: 'client-01.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-02',
    name: 'Kenji Sato',
    role: 'Head of Operations',
    company: 'Aura Outdoors',
    imageFileName: 'client-02.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 2
  {
    id: 'client-03',
    name: 'Sarah Jenkins',
    role: 'VP of Marketing',
    company: 'Elevate Brand Group',
    imageFileName: 'client-03.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-04',
    name: 'Marcus Sterling',
    role: 'Chief Revenue Officer',
    company: 'Omni Media Global',
    imageFileName: 'client-04.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  },

  // Col 3 (Left Shoulder)
  {
    id: 'client-05',
    name: 'Tariq Al-Mansoor',
    role: 'CEO & Founder',
    company: 'Riyadh Advertising Co.',
    imageFileName: 'client-05.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
  },

  // Col 4 (Left Inner)
  {
    id: 'client-06',
    name: 'Elena Rostova',
    role: 'Director of Growth',
    company: 'Vanguard Media',
    imageFileName: 'client-06.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
  },

  // Col 5 (Center Apex)
  {
    id: 'client-07',
    name: 'Fahad Al-Husseini',
    role: 'Executive Director',
    company: 'Horizon Media Network',
    imageFileName: 'client-07.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
  },

  // Col 6 (Right Inner)
  {
    id: 'client-08',
    name: 'Nawaf Al-Sudairi',
    role: 'Managing Partner',
    company: 'Gulf City Displays',
    imageFileName: 'client-08.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80',
  },

  // Col 7 (Right Shoulder)
  {
    id: 'client-09',
    name: 'David Reynolds',
    role: 'Senior Media Buyer',
    company: 'Apex Ad Partners',
    imageFileName: 'client-09.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 8
  {
    id: 'client-10',
    name: 'Thomas Mueller',
    role: 'Chief Strategy Officer',
    company: 'Continental Media',
    imageFileName: 'client-10.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-11',
    name: 'Claire Dupont',
    role: 'VP of Client Success',
    company: 'Lumina Digital',
    imageFileName: 'client-11.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 9 (Far Right)
  {
    id: 'client-12',
    name: 'David Chen',
    role: 'Chief Commercial Officer',
    company: 'Zenith Outdoor',
    imageFileName: 'client-12.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-13',
    name: 'Rajesh Sharma',
    role: 'Head of Media Investments',
    company: 'Metropolis Digital',
    imageFileName: 'client-13.jpg',
    fallbackSrc: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
  },
];

interface CardItemProps {
  client: ClientProfile;
  fadeBottom?: boolean;
  fadeTop?: boolean;
  opacityClass?: string;
  className?: string;
}

function CardItem({
  client,
  fadeBottom = false,
  fadeTop = false,
  opacityClass = 'opacity-100',
  className = '',
}: CardItemProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/images/testimonials/${client.imageFileName}`);

  const maskClass = fadeBottom
    ? 'testimonials-card-fade-bottom [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]'
    : fadeTop
    ? 'testimonials-card-fade-top [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_60%,transparent_100%)]'
    : '';

  return (
    <div
      className={`testimonials-card bg-[#F9FAFB] rounded-2xl overflow-hidden ${opacityClass} ${maskClass} ${className}`}
    >
      <img
        src={imgSrc}
        alt={client.name}
        onError={() => setImgSrc(client.fallbackSrc)}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div className="testimonials-card-overlay">
        <span className="testimonials-card-name">{client.name}</span>
        <span className="testimonials-card-role">{client.company}</span>
      </div>
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
            DESKTOP (>= 1024px): 3-Part Proportional Arch Layout (2 : 5 : 2 = 9 cols)
            ========================================================================= */}
        <div className="testimonials-desktop-wrapper">
          <div className="testimonials-arch-layout">
            
            {/* Left Flank (Columns 1 & 2) */}
            <div className="testimonials-flank testimonials-flank-left">
              {/* Column 1: Far Left (Outer-most: ~20% opacity with organic bottom fade on edge card) */}
              <div className="testimonials-col testimonials-col-1">
                <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[0]} opacityClass="opacity-60 hover:opacity-100" />
                <CardItem client={CLIENT_PROFILES[1]} fadeBottom opacityClass="opacity-60 hover:opacity-100" />
              </div>

              {/* Column 2: Second Outer (50% - 60% opacity) */}
              <div className="testimonials-col testimonials-col-2">
                <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[2]} opacityClass="opacity-50 hover:opacity-100" />
                <CardItem client={CLIENT_PROFILES[3]} opacityClass="opacity-50 hover:opacity-100" />
              </div>
            </div>

            {/* Center Chamber (Arch Ceiling + Central Content) */}
            <div className="testimonials-center-chamber">
              {/* Arch Top (Columns 3, 4, 5, 6, 7: Inner / central 100% opacity) */}
              <div className="testimonials-arch-top">
                <div className="testimonials-col testimonials-col-3">
                  <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[4]} opacityClass="opacity-100" />
                </div>
                <div className="testimonials-col testimonials-col-4">
                  <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[5]} opacityClass="opacity-100" />
                </div>
                <div className="testimonials-col testimonials-col-5">
                  <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[6]} opacityClass="opacity-100" />
                </div>
                <div className="testimonials-col testimonials-col-6">
                  <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[7]} opacityClass="opacity-100" />
                </div>
                <div className="testimonials-col testimonials-col-7">
                  <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[8]} opacityClass="opacity-100" />
                </div>
              </div>

              {/* Central Content nestled right under the arch */}
              <div className="testimonials-center-content">
                <div className="testimonials-badge">
                  <LinkIcon width={14} height={14} className="testimonials-badge-icon" />
                  <span>{badgeText}</span>
                </div>

                <h2 className="testimonials-heading">
                  <span>{headingLine1}</span>
                  <span className="subtitle-line">{headingLine2}</span>
                </h2>

                <p className="testimonials-subtitle">
                  {subtitleText}
                </p>

                <Link href={ctaHref} className="testimonials-cta-btn">
                  <span>{ctaText}</span>
                </Link>
              </div>
            </div>

            {/* Right Flank (Columns 8 & 9) */}
            <div className="testimonials-flank testimonials-flank-right">
              {/* Column 8: Second Outer (50% - 60% opacity) */}
              <div className="testimonials-col testimonials-col-8">
                <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[9]} opacityClass="opacity-50 hover:opacity-100" />
                <CardItem client={CLIENT_PROFILES[10]} opacityClass="opacity-50 hover:opacity-100" />
              </div>

              {/* Column 9: Far Right (Outer-most: ~20% opacity with organic bottom fade on edge card) */}
              <div className="testimonials-col testimonials-col-9">
                <div className="testimonials-placeholder-card bg-[#F9FAFB] rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[11]} opacityClass="opacity-60 hover:opacity-100" />
                <CardItem client={CLIENT_PROFILES[12]} fadeBottom opacityClass="opacity-60 hover:opacity-100" />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET (< 1024px): Smooth Auto-Scrolling Ribbon + Content
            ========================================================================= */}
        <div className="testimonials-mobile-wrapper">
          <div className="testimonials-marquee-container">
            <div className="testimonials-marquee-track">
              {[...CLIENT_PROFILES, ...CLIENT_PROFILES].map((client, idx) => (
                <div key={`${client.id}-${idx}`} className="testimonials-marquee-card bg-[#F9FAFB]">
                  <img
                    src={`/images/testimonials/${client.imageFileName}`}
                    alt={client.name}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="testimonials-mobile-content">
            <div className="testimonials-badge">
              <LinkIcon width={14} height={14} className="testimonials-badge-icon" />
              <span>{badgeText}</span>
            </div>

            <h2 className="testimonials-heading">
              <span>{headingLine1}</span>
              <span className="subtitle-line">{headingLine2}</span>
            </h2>

            <p className="testimonials-subtitle">
              {subtitleText}
            </p>

            <Link href={ctaHref} className="testimonials-cta-btn">
              <span>{ctaText}</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
