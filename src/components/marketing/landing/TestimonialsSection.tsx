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
    imageFileName: 'client-01.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-02',
    name: 'Kenji Sato',
    role: 'Head of Operations',
    company: 'Aura Outdoors',
    imageFileName: 'client-02.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 2
  {
    id: 'client-03',
    name: 'Sarah Jenkins',
    role: 'VP of Marketing',
    company: 'Elevate Brand Group',
    imageFileName: 'client-03.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-04',
    name: 'Marcus Sterling',
    role: 'Chief Revenue Officer',
    company: 'Omni Media Global',
    imageFileName: 'client-04.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
  },

  // Col 3 (Left Shoulder)
  {
    id: 'client-05',
    name: 'Tariq Al-Mansoor',
    role: 'CEO & Founder',
    company: 'Riyadh Advertising Co.',
    imageFileName: 'client-05.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80',
  },

  // Col 4 (Left Inner)
  {
    id: 'client-06',
    name: 'Elena Rostova',
    role: 'Director of Growth',
    company: 'Vanguard Media',
    imageFileName: 'client-06.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
  },

  // Col 5 (Center Apex)
  {
    id: 'client-07',
    name: 'Fahad Al-Husseini',
    role: 'Executive Director',
    company: 'Horizon Media Network',
    imageFileName: 'client-07.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80',
  },

  // Col 6 (Right Inner)
  {
    id: 'client-08',
    name: 'Nawaf Al-Sudairi',
    role: 'Managing Partner',
    company: 'Gulf City Displays',
    imageFileName: 'client-08.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=80',
  },

  // Col 7 (Right Shoulder)
  {
    id: 'client-09',
    name: 'David Reynolds',
    role: 'Senior Media Buyer',
    company: 'Apex Ad Partners',
    imageFileName: 'client-09.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 8
  {
    id: 'client-10',
    name: 'Thomas Mueller',
    role: 'Chief Strategy Officer',
    company: 'Continental Media',
    imageFileName: 'client-10.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-11',
    name: 'Claire Dupont',
    role: 'VP of Client Success',
    company: 'Lumina Digital',
    imageFileName: 'client-11.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=80',
  },

  // Col 9 (Far Right)
  {
    id: 'client-12',
    name: 'David Chen',
    role: 'Chief Commercial Officer',
    company: 'Zenith Outdoor',
    imageFileName: 'client-12.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'client-13',
    name: 'Rajesh Sharma',
    role: 'Head of Media Investments',
    company: 'Metropolis Digital',
    imageFileName: 'client-13.png',
    fallbackSrc: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=80',
  },
];

interface CardItemProps {
  client: ClientProfile;
  className?: string;
}

function CardItem({
  client,
  className = '',
}: CardItemProps) {
  const [imgSrc, setImgSrc] = useState<string>(`/images/testimonials/${client.imageFileName}`);

  return (
    <div
      className={`testimonials-card rounded-2xl overflow-hidden opacity-100 ${className}`}
    >
      <img
        src={imgSrc}
        alt={client.name}
        onError={() => setImgSrc(client.fallbackSrc)}
        loading="lazy"
        className="w-full h-full object-cover opacity-100"
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
  const [isTouchPaused, setIsTouchPaused] = useState(false);

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
              {/* Column 1: Far Left */}
              <div className="testimonials-col testimonials-col-1">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[0]} />
                <CardItem client={CLIENT_PROFILES[1]} />
              </div>

              {/* Column 2: Second Outer */}
              <div className="testimonials-col testimonials-col-2">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[2]} />
                <CardItem client={CLIENT_PROFILES[3]} />
              </div>
            </div>

            {/* Center Chamber (Arch Ceiling + Central Content) */}
            <div className="testimonials-center-chamber">
              {/* Arch Top (Columns 3, 4, 5, 6, 7: Inner / central 100% opacity) */}
              <div className="testimonials-arch-top">
                <div className="testimonials-col testimonials-col-3">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[4]} />
                </div>
                <div className="testimonials-col testimonials-col-4">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[5]} />
                </div>
                <div className="testimonials-col testimonials-col-5">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[6]} />
                </div>
                <div className="testimonials-col testimonials-col-6">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[7]} />
                </div>
                <div className="testimonials-col testimonials-col-7">
                  <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                  <CardItem client={CLIENT_PROFILES[8]} />
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
              {/* Column 8: Second Outer */}
              <div className="testimonials-col testimonials-col-8">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[9]} />
                <CardItem client={CLIENT_PROFILES[10]} />
              </div>

              {/* Column 9: Far Right */}
              <div className="testimonials-col testimonials-col-9">
                <div className="testimonials-placeholder-card rounded-2xl overflow-hidden" />
                <CardItem client={CLIENT_PROFILES[11]} />
                <CardItem client={CLIENT_PROFILES[12]} />
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET (< 1024px): Smooth Auto-Scrolling Ribbon + Content
            ========================================================================= */}
        <div className="testimonials-mobile-wrapper">
          <div 
            className="testimonials-marquee-container"
            onTouchStart={() => setIsTouchPaused(true)}
            onTouchEnd={() => setIsTouchPaused(false)}
            onTouchCancel={() => setIsTouchPaused(false)}
          >
            <div className={`testimonials-marquee-track ${isTouchPaused ? 'is-paused' : ''}`}>
              {CLIENT_PROFILES.map((client) => (
                <div key={`client-primary-${client.id}`} className="testimonials-marquee-card">
                  <img
                    src={`/images/testimonials/${client.imageFileName}`}
                    alt={client.name}
                    width={115}
                    height={144}
                    sizes="(max-width: 639px) 96px, 115px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
              {CLIENT_PROFILES.map((client) => (
                <div key={`client-dup-${client.id}`} className="testimonials-marquee-card" aria-hidden="true">
                  <img
                    src={`/images/testimonials/${client.imageFileName}`}
                    alt=""
                    width={115}
                    height={144}
                    sizes="(max-width: 639px) 96px, 115px"
                    loading="lazy"
                    decoding="async"
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
