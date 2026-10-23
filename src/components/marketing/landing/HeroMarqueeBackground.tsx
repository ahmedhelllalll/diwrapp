import React from "react";
import {
  Calendar,
  Sparks,
  ShoppingBag,
  CardWallet,
  BrainElectricity,
  CoinsSwap,
  GraphUp,
  CreditCard,
  Spark,
} from "iconoir-react";

export interface MarqueeBadge {
  id: string;
  label: string;
}

export interface HeroMarqueeBackgroundProps {
  lang?: string;
  badges?: {
    row1?: MarqueeBadge[];
    row2?: MarqueeBadge[];
    row3?: MarqueeBadge[];
  };
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  // Row 1 - Advertisers & Brands Key Highlights
  "realtime-booking": Calendar,
  "ai-campaigns": Sparks,

  // Row 2 - Platform Core & Ecosystem
  "unified-marketplace": ShoppingBag,
  "smart-wallet": CardWallet,
  "iot-hardware": BrainElectricity,

  // Row 3 - Display Owners & Inventory Monetization
  "screen-monetization": CoinsSwap,
  "timely-payouts": CreditCard,
  "occupancy-optimization": GraphUp,
};

const DEFAULT_BADGES_EN = {
  row1: [
    { id: "realtime-booking", label: "Real-Time DOOH Booking" },
    { id: "ai-campaigns", label: "AI Campaign Optimizer" },
  ],
  row2: [
    { id: "unified-marketplace", label: "Unified Ad Marketplace" },
    { id: "smart-wallet", label: "Di_Wrapp Smart Wallet" },
    { id: "iot-hardware", label: "Smart Hardware & AI Sensors" },
  ],
  row3: [
    { id: "screen-monetization", label: "24/7 Screen Monetization" },
    { id: "timely-payouts", label: "Guaranteed Timely Payouts" },
    { id: "occupancy-optimization", label: "99.8% Occupancy Optimization" },
  ],
};

const DEFAULT_BADGES_AR = {
  row1: [
    { id: "realtime-booking", label: "حجز فوري للشاشات الرقمية" },
    { id: "ai-campaigns", label: "تحسين الحملات بالذكاء الاصطناعي" },
  ],
  row2: [
    { id: "unified-marketplace", label: "سوق إعلاني رقمي موحد" },
    { id: "smart-wallet", label: "محفظة Di_Wrapp الذكية" },
    { id: "iot-hardware", label: "أجهزة ذكية ومستشعرات AI" },
  ],
  row3: [
    { id: "screen-monetization", label: "تحقيق عوائد للشاشات 24/7" },
    { id: "timely-payouts", label: "دفعات مالية مضمونة ومباشرة" },
    { id: "occupancy-optimization", label: "تحسين معدلات الإشغال 99.8%" },
  ],
};

function getRepeatedBadges(badges: MarqueeBadge[], minCount = 10): MarqueeBadge[] {
  if (!badges || badges.length === 0) return [];
  const repetitions = Math.ceil(minCount / badges.length);
  const result: MarqueeBadge[] = [];
  for (let i = 0; i < repetitions; i++) {
    result.push(...badges);
  }
  return result;
}

function MarqueeRow({
  badges,
  animationClass,
  isRtl,
}: {
  badges: MarqueeBadge[];
  animationClass: string;
  isRtl: boolean;
}) {
  // Multiply items so track segment is wide enough (~2800px+) for seamless rendering on ultrawide & 4K screens
  const segmentBadges = getRepeatedBadges(badges, 10);

  return (
    <div
      dir="ltr"
      className="flex w-full overflow-hidden select-none pointer-events-none py-1"
      aria-hidden="true"
    >
      <div className={`flex shrink-0 items-center transform-gpu ${animationClass}`}>
        {/* Track Segment 1 */}
        <div className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8">
          {segmentBadges.map((badge, idx) => {
            const Icon = ICON_MAP[badge.id] || Spark;
            return (
              <div
                key={`seg1-${badge.id}-${idx}`}
                dir={isRtl ? "rtl" : "ltr"}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-surface-2/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm pointer-events-none select-none shrink-0 transition-colors"
              >
                <div className="flex items-center justify-center text-slate-500 dark:text-neutral-400 shrink-0 bg-transparent">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200 whitespace-nowrap tracking-[-0.01em] font-sans">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Track Segment 2 (Exact duplicate for 100% seamless, mathematically stutter-free loop) */}
        <div
          className="flex shrink-0 items-center gap-6 sm:gap-8 pe-6 sm:pe-8"
          aria-hidden="true"
        >
          {segmentBadges.map((badge, idx) => {
            const Icon = ICON_MAP[badge.id] || Spark;
            return (
              <div
                key={`seg2-${badge.id}-${idx}`}
                dir={isRtl ? "rtl" : "ltr"}
                className="inline-flex items-center gap-2.5 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl bg-white/80 dark:bg-surface-2/80 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-sm pointer-events-none select-none shrink-0 transition-colors"
              >
                <div className="flex items-center justify-center text-slate-500 dark:text-neutral-400 shrink-0 bg-transparent">
                  <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.8]" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-neutral-200 whitespace-nowrap tracking-[-0.01em] font-sans">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HeroMarqueeBackground({
  lang = "en",
  badges,
  className = "",
}: HeroMarqueeBackgroundProps) {
  const isRtl = lang === "ar";
  const defaultBadges = isRtl ? DEFAULT_BADGES_AR : DEFAULT_BADGES_EN;

  const row1 = badges?.row1?.length ? badges.row1 : defaultBadges.row1;
  const row2 = badges?.row2?.length ? badges.row2 : defaultBadges.row2;
  const row3 = badges?.row3?.length ? badges.row3 : defaultBadges.row3;

  return (
    <div
      className={`hero-marquee-wrapper relative w-full h-full overflow-hidden flex flex-col justify-between gap-8 sm:gap-12 py-2 sm:py-4 pointer-events-none select-none ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        contain: "paint layout",
      }}
      aria-hidden="true"
    >
      {/* Row 1: Flowing Left (85s) - Fewer items, generous spacing */}
      <MarqueeRow badges={row1} animationClass="animate-marquee-left-row1" isRtl={isRtl} />

      {/* Row 2: Flowing Right (100s) - Positioned behind center of phone mockup */}
      <MarqueeRow badges={row2} animationClass="animate-marquee-right-row2" isRtl={isRtl} />

      {/* Row 3: Flowing Left (90s) - Lower mockup span */}
      <MarqueeRow badges={row3} animationClass="animate-marquee-left-row3" isRtl={isRtl} />
    </div>
  );
}
