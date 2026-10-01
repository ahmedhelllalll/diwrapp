"use client";

import React from "react";
import { Reveal, RevealGroup, RevealVariant } from "@/components/common/Reveal";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  delayIndex?: number;
  variant?: RevealVariant;
}

export function OverviewMotion({ children, className = "" }: MotionSectionProps) {
  return (
    <RevealGroup className={className}>
      {children}
    </RevealGroup>
  );
}

export function FeaturesHeaderMotion({ children, className = "" }: MotionSectionProps) {
  return (
    <RevealGroup className={className}>
      {children}
    </RevealGroup>
  );
}

export function FeaturesCardMotion({
  children,
  className = "",
  delay,
  delayIndex,
  variant = "fade",
}: MotionSectionProps) {
  return (
    <Reveal
      variant={variant}
      delayIndex={delayIndex}
      delayMs={delay !== undefined ? Math.round(delay * 1000) : undefined}
      className={className}
    >
      {children}
    </Reveal>
  );
}

export { Reveal, RevealGroup, RevealInit } from "@/components/common/Reveal";
