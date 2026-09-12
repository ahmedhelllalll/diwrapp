import Image from "next/image";
import {
  UploadDataWindow,
  Brain,
  Camera,
  CardWallet,
  BadgeCheck,
  BellNotification,
} from "iconoir-react";

interface BentoDict {
  card2Title?: string;
  card2Desc?: string;
  card3Title?: string;
  card3Desc?: string;
  card4Title?: string;
  card4Desc?: string;
  card5Title?: string;
  card5Desc?: string;
  card7Title?: string;
  card7Desc?: string;
  card8Title?: string;
  card8Desc?: string;
}

interface FeatureBentoGridProps {
  dict?: BentoDict;
  className?: string;
}

export default function FeatureBentoGrid({ dict, className = "" }: FeatureBentoGridProps) {
  return (
    <section className={`bento-section ${className}`} aria-label="Feature Showcase">
      <div className="bento-grid">
        {/* =================================================================
            ROW 1
            ================================================================= */}
        {/* Card 1: Tablet Showcase */}
        <div className="bento-card bento-card-tablet">
          <div className="bento-tablet-inner">
            <Image
              src="/assets/table.webp"
              alt="Di_Wrapp Tablet Booking Showcase"
              width={640}
              height={480}
              className="bento-tablet-img"
              priority
            />
          </div>
        </div>

        {/* Card 2: Instant Browse & Book */}
        <div className="bento-card">
          <div className="bento-icon-box" aria-hidden="true">
            <UploadDataWindow width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card2Title || "Instant Browse & Book"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card2Desc || "— no delays, no back-and-forth. Just select, schedule, and go live."}
            </p>
          </div>
        </div>

        {/* Card 3: Smart Dashboard */}
        <div className="bento-card">
          <div className="bento-icon-box" aria-hidden="true">
            <Brain width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card3Title || "Smart Dashboard"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card3Desc || "A fully customizable dashboard that highlights the data that matters most"}
            </p>
          </div>
        </div>

        {/* =================================================================
            ROW 2
            ================================================================= */}
        {/* Card 4: Booking Proof & Reporting */}
        <div className="bento-card">
          <div className="bento-icon-box" aria-hidden="true">
            <Camera width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card4Title || "Booking Proof & Reporting"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card4Desc || "Get visual confirmation when your Booking goes live, along with detailed reports"}
            </p>
          </div>
        </div>

        {/* Card 5: Wallet Top-Ups & Payouts */}
        <div className="bento-card">
          <div className="bento-icon-box" aria-hidden="true">
            <CardWallet width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card5Title || "Wallet Top-Ups & Payouts"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card5Desc || "Securely Fund your account and track every transaction"}
            </p>
          </div>
        </div>

        {/* Card 6: Illuminated Doorway Image Visual */}
        <div className="bento-card bento-card-image">
          <Image
            src="/assets/digital-door.png"
            alt="Di_Wrapp Illuminated Digital Doorway Visual"
            fill
            className="bento-door-img"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
          />
        </div>

        {/* =================================================================
            ROW 3
            ================================================================= */}
        {/* Card 7: Streamlined approval Workflows (Wide Card, col-span-2) */}
        <div className="bento-card bento-card-wide">
          <div className="bento-icon-box" aria-hidden="true">
            <BadgeCheck width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card7Title || "Streamlined approval Workflows"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card7Desc || "— ensuring quality, compliance, and control across the board."}
            </p>
          </div>
        </div>

        {/* Card 8: Stay instantly updated */}
        <div className="bento-card">
          <div className="bento-icon-box" aria-hidden="true">
            <BellNotification width={20} height={20} strokeWidth={1.75} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">
              {dict?.card8Title || "Stay instantly updated"}
            </h3>
            <p className="bento-card-desc">
              {dict?.card8Desc || "— right when it happens."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
