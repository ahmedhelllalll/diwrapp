import type { Metadata } from "next";
import { getDictionary } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import "../../../landing.css";
import "../../../about.css";
import LandingHeader from "@/components/layout/LandingHeader";
import Footer from "@/components/layout/Footer";
import TestimonialsSection from "@/components/common/TestimonialsSection";
import { EmojiSingRight, Planet, Key, PlanetSat, ScaleFrameEnlarge, SystemRestart } from "iconoir-react";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: `${dict.about?.badge || 'About Us'} - Di-Wrapp`,
    description: dict.about?.title?.replace(/<[^>]*>?/gm, ''), // strip html tags for meta
  };
}

export default async function AboutPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;
  const about = dict.about;
  const features = about?.features;
  const testimonials = (about as any)?.testimonials;

  // For the language switcher
  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <>
      <div className="about-scope">
        {/* Navigation */}
        <LandingHeader 
          lang={lang} 
          nextLang={nextLang} 
          langLabel={langLabel} 
          dictNav={l.nav} 
        />

        <main className="bg-white dark:bg-[#080808] transition-colors duration-300 flex-grow">
          
          <section className="about-hero">
            <div className="about-badge">
              <EmojiSingRight width={16} height={16} strokeWidth={1.5} className="about-badge-icon" />
              <span>{about?.badge}</span>
            </div>

            <h1 
              className="about-title text-slate-900 dark:text-white"
              dangerouslySetInnerHTML={{ __html: about?.title || '' }}
            />
          </section>

          <section className="about-cards-container">
            {/* Left Column */}
            <div className="about-left-col">
              
              <div className="about-image-card">
                {/* INSTRUCTION: Place the bus stop advertisement image here */}
                {/* Recommended path: /public/assets/about-bus-stop.png */}
                <img src="/assets/about-bus-stop.png" alt="Bus Stop Advertisement" />
              </div>

              <div className="about-info-card">
                <div className="about-pill">
                  <div className="pill-icon">
                    {/* INSTRUCTION: Replace this with the actual logo icon if needed */}
                    <img src="/assets/logo-icon-white.png" alt="Logo" className="w-6 h-6 object-contain" />
                  </div>
                  <span>{about?.leftPill}</span>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="about-tall-card">
              <div className="tall-card-image">
                {/* INSTRUCTION: Place the iPad dashboard mockup image here */}
                {/* Recommended path: /public/assets/about-ipad.png */}
                <img src="/assets/about-ipad.png" alt="iPad Dashboard Interface" />
              </div>

              <div className="tall-card-content">
                <img src="/assets/logo-icon-white.png" alt="Di-wrapp Logo" />
                <p dangerouslySetInnerHTML={{ __html: about?.rightText || '' }} />
              </div>
            </div>
          </section>

          {/* Overview Section */}
          <section className="about-overview-section">
            <div className="about-overview-container">
              <div className="overview-divider" />
              <div className="overview-badge">
                <Planet width={16} height={16} strokeWidth={1.75} className="overview-badge-icon" />
                <span>{about?.overview?.badge}</span>
              </div>

              <div className="overview-grid">
                <div className="overview-left">
                  <h2 
                    className="overview-heading"
                    dangerouslySetInnerHTML={{ __html: about?.overview?.heading || '' }}
                  />
                  <p className="overview-desc">{about?.overview?.description}</p>
                </div>

                <div className="overview-right">
                  <div className="overview-card-item">
                    <h3 className="overview-item-title">{about?.overview?.visionTitle}</h3>
                    <p className="overview-item-desc">{about?.overview?.visionText}</p>
                  </div>

                  <div className="overview-card-item">
                    <h3 className="overview-item-title">{about?.overview?.missionTitle}</h3>
                    <p className="overview-item-desc">{about?.overview?.missionText}</p>
                  </div>
                </div>
              </div>

              <div className="overview-divider overview-divider-bottom" />
            </div>
          </section>

          {/* Key Features / What Makes Di_Wrapp Different Section */}
          <section className="about-features-section">
            <div className="about-features-container">
              {/* Top Header */}
              <div className="features-header">
                <div className="features-header-left">
                  <div className="features-badge">
                    <Key width={16} height={16} strokeWidth={1.75} className="features-badge-icon" />
                    <span>{features?.badge}</span>
                  </div>
                </div>

                <div className="features-header-right">
                  <h2 
                    className="features-title"
                    dangerouslySetInnerHTML={{ __html: features?.title || '' }}
                  />
                  <p className="features-subtitle">{features?.subtitle}</p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="features-grid">
                {/* Column 1: Tall Tablet Card */}
                <div className="features-tall-card">
                  <div className="features-tablet-wrap">
                    <img 
                      src="/assets/tablet-image.png" 
                      alt="Di_Wrapp Tablet Interface" 
                      className="features-tablet-img" 
                    />
                  </div>

                  <div className="features-tall-footer">
                    <div className="features-card-info">
                      <h3 className="features-card-title">{features?.card1Title}</h3>
                      <p className="features-card-desc">{features?.card1Desc}</p>
                    </div>

                    <a href={`/${lang}/marketplace`} className="features-card-btn">
                      <span>{features?.card1Btn}</span>
                    </a>
                  </div>
                </div>

                {/* Column 2 & 3: Right Column Grid */}
                <div className="features-right-col">
                  {/* Top Row: Two Cards */}
                  <div className="features-right-top">
                    {/* Card 2: Enterprise Platform */}
                    <div className="features-card">
                      <div className="features-icon-box">
                        <PlanetSat width={22} height={22} strokeWidth={1.5} />
                      </div>
                      <div className="features-card-body">
                        <h3 className="features-card-title">{features?.card2Title}</h3>
                        <p className="features-card-desc">{features?.card2Desc}</p>
                      </div>
                    </div>

                    {/* Card 3: Scalable Infrastructure */}
                    <div className="features-card">
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
                  <div className="features-card features-wide-card">
                    <div className="features-icon-box">
                      <SystemRestart width={22} height={22} strokeWidth={1.5} />
                    </div>

                    <div className="features-wide-bottom">
                      <div className="features-card-info">
                        <h3 className="features-card-title">{features?.card4Title}</h3>
                        <p className="features-card-desc">{features?.card4Desc}</p>
                      </div>

                      <a href={`/${lang}/commercial-models`} className="features-card-btn">
                        <span>{features?.card4Btn}</span>
                      </a>
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
            ctaHref={`/${lang}/booking`}
          />

        </main>
      </div>

      <Footer />
    </>
  );
}
