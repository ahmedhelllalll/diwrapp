'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Two disjoint photo sets: 7 photos in Row A, 6 photos in Row B
const ROW_A_IMAGES = [
  'client-01.png',
  'client-03.png',
  'client-05.png',
  'client-07.png',
  'client-09.png',
  'client-11.png',
  'client-13.png',
];

const ROW_B_IMAGES = [
  'client-02.png',
  'client-04.png',
  'client-06.png',
  'client-08.png',
  'client-10.png',
  'client-12.png',
];

interface AboutTestimonialsMarqueeProps {
  className?: string;
  fadeWidth?: string;
}

export default function AboutTestimonialsMarquee({
  className = '',
  fadeWidth,
}: AboutTestimonialsMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`about-wall-container ${className}`}
      data-in-view={isInView}
      style={fadeWidth ? ({ '--about-wall-fade': fadeWidth } as React.CSSProperties) : undefined}
    >
      {/* Row A: Track 1 */}
      <div
        className="about-wall-track about-wall-track-1"
        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
      >
        {ROW_A_IMAGES.map((img, idx) => (
          <div key={`wall-a-p-${idx}`} className="about-wall-card">
            <Image
              src={`/images/testimonials/${img}`}
              alt=""
              width={96}
              height={120}
              sizes="96px"
              quality={85}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
        {ROW_A_IMAGES.map((img, idx) => (
          <div key={`wall-a-d-${idx}`} className="about-wall-card" aria-hidden="true">
            <Image
              src={`/images/testimonials/${img}`}
              alt=""
              width={96}
              height={120}
              sizes="96px"
              quality={85}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>

      {/* Row B: Track 2 */}
      <div
        className="about-wall-track about-wall-track-2"
        style={{ animationPlayState: isInView ? 'running' : 'paused' }}
      >
        {ROW_B_IMAGES.map((img, idx) => (
          <div key={`wall-b-p-${idx}`} className="about-wall-card">
            <Image
              src={`/images/testimonials/${img}`}
              alt=""
              width={96}
              height={120}
              sizes="96px"
              quality={85}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
        {ROW_B_IMAGES.map((img, idx) => (
          <div key={`wall-b-d-${idx}`} className="about-wall-card" aria-hidden="true">
            <Image
              src={`/images/testimonials/${img}`}
              alt=""
              width={96}
              height={120}
              sizes="96px"
              quality={85}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
