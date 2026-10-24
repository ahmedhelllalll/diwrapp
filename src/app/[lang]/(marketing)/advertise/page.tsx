import { constructMetadata } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import "../../../advertise.css";
import FeatureBentoGrid from "@/components/marketing/advertise/FeatureBentoGrid";
import AiCarouselSection from "@/components/marketing/advertise/AiCarouselSection";
import { RevealInit } from "@/components/common/Reveal";
import { Badge } from "@/components/ui/Badge";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const adv = dict.advertise as any;
  const meta = dict.metadata?.advertise;
  const title = meta?.title || (lang === 'ar' ? 'إعلانات الشاشات واللوحات الخارجية الرقمية DOOH' : 'Advertise on Digital Billboards & DOOH Screens');
  const description = meta?.description || `${adv?.heroTitleLight || ''} ${adv?.heroTitleBold || ''}`.trim();

  return constructMetadata({
    title,
    description,
    path: '/advertise',
    lang,
    ogImageAlt: lang === 'ar' ? 'إعلانات الشاشات الخارجية - Di-wrapp' : 'Advertise with Di-wrapp DOOH Network',
  });
}

export default async function AdvertisePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const adv = dict.advertise as any;

  return (
    <div className="advertise-scope">
      <main className="bg-[var(--background)] dark:bg-[var(--surface-1)] transition-colors duration-300 flex-grow">
          <div className="advertise-container">
            
            {/* Hero Section */}
            <section className="advertise-hero">
              <Badge variant="outline-sm" className="advertise-badge">
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="advertise-badge-icon"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                <span className="whitespace-nowrap">{adv?.heroBadge || "Bridging Vision with Functionality"}</span>
              </Badge>

              <h1 className="advertise-title">
                <span className="advertise-title-light">
                  {adv?.heroTitleLight || "Empowering Brands Through"}
                </span>
                <span className="advertise-title-bold">
                  {adv?.heroTitleBold || "Smart, Seamless Experiences"}
                </span>
              </h1>
            </section>

            {/* Banner Image Section */}
            <section className="advertise-image-section">
              <div className="advertise-image-wrapper">
                <Image 
                  src="/assets/advertise-image.jpg" 
                  alt={`${adv?.heroTitleLight || "Empowering Brands Through"} ${adv?.heroTitleBold || "Smart, Seamless Experiences"}`}
                  width={1920}
                  height={1080}
                  priority
                  className="advertise-hero-img"
                  sizes="(max-width: 1024px) 100vw, 1380px"
                />
              </div>
            </section>

            <RevealInit />

            {/* Feature Content Section ("All in One Place.") */}
            <section className="advertise-feature-section">
              <div className="advertise-feature-grid">
                
                {/* Left Column: Pill Badge */}
                <div className="advertise-feature-badge-col">
                  <div
                    className="advertise-feature-badge"
                    data-reveal="up"
                    style={{ '--i': 0 } as React.CSSProperties}
                  >
                    <svg 
                      className="advertise-feature-badge-icon" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path 
                        d="M8 1.5V3.5M8 12.5V14.5M1.5 8H3.5M12.5 8H14.5M3.4 3.4L4.818 4.818M11.182 11.182L12.6 12.6M3.4 12.6L4.818 11.182M11.182 4.818L12.6 3.4" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                      />
                    </svg>
                    <span>{adv?.featureBadge || "Plan, Launch, and Track With Confidence"}</span>
                  </div>
                </div>

                {/* Right Column: Title, Paragraph, Button */}
                <div className="advertise-feature-content">
                  <h2
                    className="advertise-feature-title"
                    data-reveal="up"
                    style={{ '--i': 1 } as React.CSSProperties}
                  >
                    {adv?.featureHeading || "All in One Place."}
                  </h2>
                  
                  <p
                    className="advertise-feature-desc"
                    data-reveal="up"
                    style={{ '--i': 2 } as React.CSSProperties}
                  >
                    <span>{adv?.featureDescLight || "From discovering media spaces to managing budgets and accessing reports — "}</span>
                    <strong className="advertise-feature-desc-bold">{adv?.featureDescBold || "everything is built to save time, boost impact, and deliver measurable value."}</strong>
                  </p>

                  <div
                    data-reveal="up"
                    style={{ '--i': 3 } as React.CSSProperties}
                  >
                    <Link 
                      href={`/${lang}/coming-soon`}
                      className="advertise-btn-primary"
                    >
                      {adv?.ctaButton || "Book Your Spot"}
                    </Link>
                  </div>
                </div>

              </div>

              {/* Bento Grid Feature Showcase */}
              <FeatureBentoGrid dict={adv?.bento} />

              {/* Wrapp AI Carousel Section */}
              <AiCarouselSection slides={adv?.aiCarousel?.slides} lang={lang} />
            </section>

          </div>
        </main>
      </div>
  );
}
