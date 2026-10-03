import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import "../../../about.css";
import TestimonialsSection from "@/components/marketing/about/TestimonialsSection";
import { Badge } from "@/components/ui/Badge";
import { RevealInit } from "@/components/common/Reveal";
import { EmojiSingRight, Planet, Key, PlanetSat, ScaleFrameEnlarge, SystemRestart } from "iconoir-react";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  return {
    title: dict.about?.badge || 'About Us',
    description: dict.about?.title?.replace(/<[^>]*>?/gm, ''), // strip html tags for meta
    alternates: {
      canonical: `/${lang}/about`,
      languages: {
        en: '/en/about',
        ar: '/ar/about',
        'x-default': '/en/about',
      },
    },
  };
}

export default async function AboutPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const about = dict.about;
  const features = about?.features;
  const testimonials = about?.testimonials;

  return (
    <div className="about-scope">
      <main className="bg-[var(--background)] dark:bg-[var(--surface-1)] transition-colors duration-300 flex-grow">
          
          <section className="about-hero">
            <Badge variant="outline-sm" className="about-badge">
              <EmojiSingRight width={16} height={16} strokeWidth={1.5} className="about-badge-icon rtl:-scale-x-100" />
              <span>{about?.badge}</span>
            </Badge>

            <h1 
              className="about-title"
              dangerouslySetInnerHTML={{ __html: about?.title || '' }}
            />
          </section>

          <section className="about-cards-container">
            {/* Left Column */}
            <div className="about-left-col">
              
              <div className="about-image-card">
                <Image 
                  src="/assets/about-bus-stop.webp" 
                  alt="Bus Stop Advertisement" 
                  width={790}
                  height={460}
                  priority
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 640px"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="about-info-card">
                <div className="about-pill">
                  <div className="pill-icon">
                    <Image 
                      src="/assets/logo-icon-white.png" 
                      alt="Di-wrapp Logo" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6 object-contain" 
                    />
                  </div>
                  <span>{about?.leftPill}</span>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="about-tall-card">
              <div className="tall-card-image">
                <Image 
                  src="/assets/about-ipad.webp" 
                  alt="iPad Dashboard Interface" 
                  width={1200}
                  height={900}
                  priority
                  sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) calc(100vw - 48px), 700px"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="tall-card-content">
                <Image 
                  src="/assets/logo-icon-white.png" 
                  alt="Di-wrapp Logo" 
                  width={36} 
                  height={18} 
                  className="object-contain" 
                />
                <p dangerouslySetInnerHTML={{ __html: about?.rightText || '' }} />
              </div>
            </div>
          </section>

          <RevealInit />

          {/* Overview Section */}
          <section className="about-overview-section">
            <div className="about-overview-container">
              <div
                className="overview-divider"
                data-reveal="line"
                style={{ '--i': 0 } as React.CSSProperties}
              />
              <Badge
                variant="brand-solid"
                className="overview-badge"
                data-reveal="up"
                style={{ '--i': 1 } as React.CSSProperties}
              >
                <Planet width={16} height={16} strokeWidth={1.75} className="overview-badge-icon" />
                <span>{about?.overview?.badge}</span>
              </Badge>

              <div className="overview-grid">
                <div className="overview-left">
                  <h2 
                    className="overview-heading"
                    data-reveal="up"
                    style={{ '--i': 2 } as React.CSSProperties}
                    dangerouslySetInnerHTML={{ __html: about?.overview?.heading || '' }}
                  />
                  <p
                    className="overview-desc"
                    data-reveal="up"
                    style={{ '--i': 3 } as React.CSSProperties}
                  >
                    {about?.overview?.description}
                  </p>
                </div>

                <div className="overview-right">
                  <div
                    className="overview-card-item"
                    data-reveal="up"
                    style={{ '--i': 3 } as React.CSSProperties}
                  >
                    <h3 className="overview-item-title">{about?.overview?.visionTitle}</h3>
                    <p className="overview-item-desc">{about?.overview?.visionText}</p>
                  </div>

                  <div
                    className="overview-card-item"
                    data-reveal="up"
                    style={{ '--i': 4 } as React.CSSProperties}
                  >
                    <h3 className="overview-item-title">{about?.overview?.missionTitle}</h3>
                    <p className="overview-item-desc">{about?.overview?.missionText}</p>
                  </div>
                </div>
              </div>

              <div
                className="overview-divider overview-divider-bottom"
                data-reveal="line"
                style={{ '--i': 4 } as React.CSSProperties}
              />
            </div>
          </section>

          {/* Key Features / What Makes Di_Wrapp Different Section */}
          <section className="about-features-section">
            <div className="about-features-container">
              {/* Top Header */}
              <div className="features-header">
                <div className="features-header-left">
                  <Badge
                    variant="pill"
                    className="features-badge"
                    data-reveal="up"
                    style={{ '--i': 0 } as React.CSSProperties}
                  >
                    <Key width={16} height={16} strokeWidth={1.75} className="features-badge-icon" />
                    <span>{features?.badge}</span>
                  </Badge>
                </div>

                <div className="features-header-right">
                  <h2 
                    className="features-title"
                    data-reveal="up"
                    style={{ '--i': 1 } as React.CSSProperties}
                    dangerouslySetInnerHTML={{ __html: features?.title || '' }}
                  />
                  <p
                    className="features-subtitle"
                    data-reveal="up"
                    style={{ '--i': 2 } as React.CSSProperties}
                  >
                    {features?.subtitle}
                  </p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="features-grid">
                {/* Column 1: Tall Tablet Card */}
                <div
                  className="features-tall-card"
                  data-reveal="fade"
                  style={{ '--i': 0 } as React.CSSProperties}
                >
                  <div className="features-tablet-wrap">
                    <Image 
                      src="/assets/tablet-image.webp" 
                      alt="Di_Wrapp Tablet Interface" 
                      width={960}
                      height={720}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 420px"
                      className="features-tablet-img" 
                    />
                  </div>

                  <div className="features-tall-footer">
                    <div className="features-card-info">
                      <h3 className="features-card-title">{features?.card1Title}</h3>
                      <p className="features-card-desc">{features?.card1Desc}</p>
                    </div>

                    <Link 
                      href={`/${lang}/coming-soon?feature=marketplace`} 
                      className="features-card-btn"
                      aria-label={`${features?.card1Btn || 'Read More'}: ${features?.card1Title || 'Di_Wrapp Media Player'}`}
                    >
                      <span>{features?.card1Btn}</span>
                      <span className="sr-only"> - {features?.card1Title}</span>
                    </Link>
                  </div>
                </div>

                {/* Column 2 & 3: Right Column Grid */}
                <div className="features-right-col">
                  {/* Top Row: Two Cards */}
                  <div className="features-right-top">
                    {/* Card 2: Enterprise Platform */}
                    <div
                      className="features-card"
                      data-reveal="fade"
                      style={{ '--i': 1 } as React.CSSProperties}
                    >
                      <div className="features-icon-box">
                        <PlanetSat width={22} height={22} strokeWidth={1.5} />
                      </div>
                      <div className="features-card-body">
                        <h3 className="features-card-title">{features?.card2Title}</h3>
                        <p className="features-card-desc">{features?.card2Desc}</p>
                      </div>
                    </div>

                    {/* Card 3: Scalable Infrastructure */}
                    <div
                      className="features-card"
                      data-reveal="fade"
                      style={{ '--i': 2 } as React.CSSProperties}
                    >
                      <div className="features-icon-box">
                        <ScaleFrameEnlarge width={22} height={22} strokeWidth={1.5} />
                      </div>
                      <div className="features-card-body">
                        <h3 className="features-card-title">{features?.card3Title}</h3>
                        <p className="features-card-desc">{features?.card3Desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Row: Wide Card */}
                  <div
                    className="features-card features-wide-card"
                    data-reveal="fade"
                    style={{ '--i': 3 } as React.CSSProperties}
                  >
                    <div className="features-icon-box">
                      <SystemRestart width={22} height={22} strokeWidth={1.5} />
                    </div>

                    <div className="features-wide-bottom">
                      <div className="features-card-info">
                        <h3 className="features-card-title">{features?.card4Title}</h3>
                        <p className="features-card-desc">{features?.card4Desc}</p>
                      </div>

                      <Link 
                        href={`/${lang}/coming-soon?feature=commercial-models`} 
                        className="features-card-btn"
                        aria-label={`${features?.card4Btn || 'Read More'}: ${features?.card4Title || 'Flexible Commercial Models'}`}
                      >
                        <span>{features?.card4Btn}</span>
                        <span className="sr-only"> - {features?.card4Title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials / Social Proof Section */}
          <TestimonialsSection
            lang={lang}
            badgeText={testimonials?.badge}
            headingLine1={testimonials?.headingLine1}
            headingLine2={testimonials?.headingLine2}
            subtitleText={testimonials?.subtitle}
            ctaText={testimonials?.cta}
            ctaHref={`/${lang}/advertise`}
          />

        </main>
    </div>
  );
}
