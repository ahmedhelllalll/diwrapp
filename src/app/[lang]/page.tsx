import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { Locale } from "../../i18n-config";
import Link from 'next/link';
import "../landing.css";
import LandingAnimations from "@/components/marketing/landing/LandingAnimations";
import LandingHeader from "@/components/layout/LandingHeader";
import FloatingHeroAssets from "@/components/marketing/landing/FloatingHeroAssets";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/marketing/landing/FaqSection";
import FeaturesSection from "@/components/marketing/landing/FeaturesSection";
import NewsSection from "@/components/marketing/landing/NewsSection";

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const dict = await getDictionary(params.lang as Locale);
  return {
    title: { absolute: dict.metadata.defaultTitle },
    description: dict.metadata.landing.description,
  };
}

export default async function LandingPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);
  const l = dict.landing;

  // For the language switcher
  const nextLang = lang === 'en' ? 'ar' : 'en';
  const langLabel = lang === 'en' ? 'عربي' : 'English';

  return (
    <>
      <div className="landing-scope">
        <LandingAnimations />

        {/* Navigation */}
        <LandingHeader 
          lang={lang} 
          nextLang={nextLang} 
          langLabel={langLabel} 
          dictNav={l.nav} 
        />

        {/* Hero Section */}
      <main className="bg-white dark:bg-[#080808] transition-colors duration-300">
        <section className="hero-section">
          
          {/* Floating Hero Background and Foreground Assets */}
          <FloatingHeroAssets />

          <div className="hero-content min-h-[calc(100vh-80px)] flex flex-col justify-center pb-12 w-full relative z-10">
            <div className="w-full max-w-[900px] mx-auto flex flex-col items-center">

              <div className="badge bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300">
                <i className="fa-regular fa-star" style={{ fontSize: '11px' }}></i>
                {l.hero.badge}
              </div>

              <h1 className="hero-title text-slate-900 dark:text-white font-bold tracking-tight relative z-40" dangerouslySetInnerHTML={{ __html: l.hero.title }} />

              <p className="hero-subtitle text-slate-600 dark:text-zinc-400 relative z-40">
                {l.hero.subtitle}
              </p>

              <Link href="#" className="btn-discover shadow-lg shadow-blue-500/20 dark:shadow-blue-600/30 relative z-40">{l.hero.discover}</Link>
            </div>
          </div>
          
          {/* Spacer to account for absolute dashboard image height */}
          <div className="h-[500px] lg:h-[950px] w-full pointer-events-none" aria-hidden="true"></div>
        </section>

        {/* How It Works Section */}
        <section className="works-section">
          <span className="badge-user-guide bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200">{l.works.badge}</span>
          <h2 className="works-title text-slate-900 dark:text-white">{l.works.title}</h2>
          <p className="works-subtitle text-slate-600 dark:text-zinc-400">
            {l.works.subtitle}
          </p>

          <div className="works-toggle-container">
            <button className="toggle-btn active">{l.works.forBrands}</button>
            <button className="toggle-btn">{l.works.forVendors}</button>
          </div>

          <div className="works-cards-grid">
            <div className="work-card">
              <div className="card-icon">
                <i className="fa-regular fa-map"></i>
              </div>
              <h3 className="card-title text-slate-900 dark:text-white">{l.works.step1Title}</h3>
              <p className="card-desc text-slate-600 dark:text-zinc-400">
                {l.works.step1Desc}
              </p>
            </div>

            <div className="work-card">
              <div className="card-icon">
                <i className="fa-regular fa-calendar"></i>
              </div>
              <h3 className="card-title text-slate-900 dark:text-white">{l.works.step2Title}</h3>
              <p className="card-desc text-slate-600 dark:text-zinc-400">
                {l.works.step2Desc}
              </p>
            </div>

            <div className="work-card">
              <div className="card-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h3 className="card-title text-slate-900 dark:text-white">{l.works.step3Title}</h3>
              <p className="card-desc text-slate-600 dark:text-zinc-400">
                {l.works.step3Desc}
              </p>
            </div>
          </div>

          <div className="works-image-showcase">
            <img src="/assets/fleet.png" alt="Di-Wrapp Fleet Showcase" />
          </div>
        </section>

        {/* Pioneering Accessibility Section */}
        <section className="pioneering-section">
          
          {/* Left Copywriting Block */}
          <div className="pioneering-left">
            <span className="badge-subtle bg-slate-100/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200">{l.pioneering.badge}</span>
            <h2 className="pioneering-title text-slate-900 dark:text-white">{l.pioneering.title}</h2>
            <p className="pioneering-desc text-slate-600 dark:text-zinc-400">
              {l.pioneering.desc}
            </p>

            <ul className="feature-list text-slate-600 dark:text-zinc-400">
              <li>
                <span className="check-circle"><i className="fa-solid fa-check"></i></span>
                {l.pioneering.feature1}
              </li>
              <li>
                <span className="check-circle"><i className="fa-solid fa-check"></i></span>
                {l.pioneering.feature2}
              </li>
              <li>
                <span className="check-circle"><i className="fa-solid fa-check"></i></span>
                {l.pioneering.feature3}
              </li>
            </ul>

            <div className="pioneering-actions">
              <Link href="#" className="btn-outline text-slate-900 dark:text-white border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-900">{l.pioneering.learnMore}</Link>
              <Link href="#" className="btn-primary-blue shadow-lg shadow-blue-500/20 dark:shadow-blue-600/30">{l.pioneering.bookSpot}</Link>
            </div>
          </div>

          {/* Right Map & Figma Cards Showcase */}
          <div className="pioneering-right">
            
            <div className="world-map-bg"></div>

          <div className="map-tag tag-us">US</div>
          <div className="map-tag tag-europe">Europe</div>
          <div className="map-tag tag-africa">Africa</div>
          <div className="map-tag tag-mena">Mena</div>
          <div className="map-tag tag-apac">APAC</div>

          <div className="figma-cards-wrapper">
            
            <div className="cards-top-row">
              
              <div className="ui-card-calendar">
                <img src="/assets/calendar-ui.png" alt="August Calendar UI" />
              </div>

              <div className="ui-card-developer">
                <img src="/assets/developer-ui.jpg" alt="Developer UI" />
                <div className="dev-status-pill">
                  <span className="dot-active"></span>
                  <div className="dev-status-text">
                    <h5>Publish New Listing</h5>
                    <span>Due Today</span>
                  </div>
                </div>
              </div>

              <div className="ui-card-listing">
                <div className="listing-image-wrap">
                  <img src="/assets/kingdom-tower.png" alt="Kingdom Tower" />
                  <div className="listing-overlay-badge">
                    <span>Impressions Reach</span>
                    <strong>49% <span className="growth">↑ 9%</span></strong>
                  </div>
                </div>

                <div className="listing-details">
                  <h4>Kingdom Tower</h4>
                  <p>Olaya District, Riyadh Saudi Arabia</p>
                  
                  <div className="listing-meta-row">
                    <div className="price-text">Sar 1,500,000 <span>Daily</span></div>
                    <span className="rotana-tag">Rotana Signs</span>
                  </div>

                  <button className="btn-book-channel">
                    Book Channel <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              </div>

            </div>

            <div className="productivity-banner">
              <div className="five-x">5x</div>
              <div className="banner-text">
                Fasten your Business Productivity<br/>with our cutting edge-solutions
              </div>
              <div className="banner-watermark">⚡</div>
            </div>

          </div>

        </div>

      </section>
      </main>
      </div>
      
      {/* FAQ Section */}
      <FaqSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* News Section */}
      <NewsSection />

      <Footer lang={lang} dict={(dict as any).footer} />
    </>
  );
}
