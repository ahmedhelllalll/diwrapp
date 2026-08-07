"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LandingAnimations() {
  useGSAP(() => {
    // Hero Section
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      ".btn-discover",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 }
    );
    gsap.fromTo(
      ".showcase-container",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
    );
    
    // Float assets slight parallax
    gsap.to(".float-asset", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    // Works Section
    gsap.fromTo(
      ".works-title",
      { opacity: 0, y: 20 },
      { 
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-section",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      ".work-card",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-cards-grid",
          start: "top 85%",
        }
      }
    );

    gsap.fromTo(
      ".works-image-showcase",
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, scale: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: ".works-image-showcase",
          start: "top 80%",
        }
      }
    );

    // Pioneering Section
    gsap.fromTo(
      ".pioneering-left",
      { opacity: 0, x: -30 },
      { 
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".pioneering-section",
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(
      ".pioneering-right",
      { opacity: 0, x: 30 },
      { 
        opacity: 1, x: 0, duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: ".pioneering-section",
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(
      ".map-tag",
      { opacity: 0, scale: 0.5 },
      { 
        opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".world-map-bg",
          start: "top 80%",
        }
      }
    );
  }, []);

  return null;
}
