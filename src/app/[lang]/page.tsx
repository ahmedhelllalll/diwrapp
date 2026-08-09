import type { Metadata } from "next";
import { getDictionary } from "../../dictionaries";
import { Locale } from "../../i18n-config";
import Link from 'next/link';
import "../landing.css";
import LandingAnimations from "@/components/common/LandingAnimations";
import LandingHeader from "@/components/layout/LandingHeader";
import HeroVisual from "@/components/common/HeroVisual";
import Footer from "@/components/layout/Footer";
import FaqSection from "@/components/common/FaqSection";
import FeaturesSection from "@/components/common/FeaturesSection";
import NewsSection from "@/components/common/NewsSection";

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
          
          {/* --- Floating Assets Anchored to Hero Section Parent (1440px Canvas) --- */}
          {/* Background Grid Line Frame (Top Right) */}
          <img
            src="/assets/frame.png"
            alt="Grid Line Frame"
            className="absolute top-[15%] lg:top-[175px] right-[0%] lg:right-0 w-[250px] md:w-[300px] lg:w-[389px] z-0 opacity-100 pointer-events-none h-auto object-contain"
          />
          {/* Background Grid Line Frame Reversed (Bottom Left) */}
          <img
            src="/assets/frame.png"
            alt="Grid Line Frame Reversed"
            className="absolute top-[45%] lg:top-[510px] left-[-8%] lg:left-[-6%] w-[250px] md:w-[300px] lg:w-[389px] z-0 opacity-100 pointer-events-none h-auto object-contain -scale-x-100"
          />

          <img
            src="/assets/add-new.png"
            alt="Add New Glass"
            className="absolute top-[12%] lg:top-[131px] right-[0%] lg:right-[-6px] w-[280px] md:w-[400px] lg:w-[592px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain"
          />
          <img
            src="/assets/calendar.png"
            alt="Calendar Asset"
            className="absolute top-[40%] lg:top-[400px] left-[-5%] lg:left-[-6%] w-[350px] md:w-[500px] lg:w-[680px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain -scale-x-100"
          />
          <img
            src="/assets/random.png"
            alt="Random Floating Cluster"
            className="absolute top-[55%] lg:top-[500px] right-[-5%] lg:right-[-8%] w-[350px] md:w-[550px] lg:w-[850px] z-50 pointer-events-none drop-shadow-2xl h-auto object-contain"
          />
          <img
            src="/assets/dashboard.png"
            alt="iPad Mini Mockup"
            className="absolute top-[70%] lg:top-[580px] left-[40%] lg:left-[35%] z-[60] w-[110%] lg:w-[120%] max-w-[1400px] h-auto object-contain pointer-events-none drop-shadow-2xl"
            style={{ transform: 'translateX(-50%) rotate(25deg)' }}
          />
          <img
            src="/assets/image-80.png"
            alt="3D Decorative Element"
            className="absolute top-[115%] lg:top-[1140px] right-[0%] lg:right-[5%] z-[55] w-[300px] md:w-[450px] lg:w-[600px] h-auto object-contain pointer-events-none"
          />
          <img
            src="/assets/group-527.png"
            alt="Decorative Element 527"
            className="absolute top-[85%] lg:top-[820px] right-[2.5%] lg:right-[2.5%] z-10 w-[150px] md:w-[250px] lg:w-[350px] h-auto object-contain pointer-events-none drop-shadow-xl"
          />
          {/* -------------------------------------- */}

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

          {/* Graphics Showcase Container */}
          <HeroVisual />
          
          {/* Spacer to account for absolute dashboard image height */}
          <div className="h-[500px] lg:h-[950px] w-full pointer-events-none"></div>
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

      <Footer />
    </>
  );
}
