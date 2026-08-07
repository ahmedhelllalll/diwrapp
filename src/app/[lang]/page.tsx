import { getDictionary } from "../../dictionaries";
import { Locale } from "../../i18n-config";
import Link from 'next/link';
import "../landing.css";
import LandingAnimations from "@/components/common/LandingAnimations";
import LandingHeader from "@/components/layout/LandingHeader";

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
      <LandingAnimations />

      {/* Navigation */}
      <LandingHeader 
        lang={lang} 
        nextLang={nextLang} 
        langLabel={langLabel} 
        dictNav={l.nav} 
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid-bg"></div>

        <div className="hero-content">
          <div className="badge">
            <i className="fa-regular fa-star" style={{ fontSize: '11px' }}></i>
            {l.hero.badge}
          </div>

          <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: l.hero.title }} />

          <p className="hero-subtitle">
            {l.hero.subtitle}
          </p>

          <Link href="#" className="btn-discover">{l.hero.discover}</Link>
        </div>

        {/* Graphics Showcase Container */}
        <div className="showcase-container">
          <img src="/assets/calendar.png" alt="Calendar and Credit Card 3D" className="float-asset asset-calendar" />
          <img src="/assets/add-new.png" alt="Add New Glass" className="float-asset asset-add-new" />
          <img src="/assets/campaign.png" alt="My Campaign UI" className="float-asset asset-campaign" />
          <img src="/assets/dashboard.png" alt="Platform Dashboard" className="tablet-mockup" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="works-section">
        <span className="badge-user-guide">{l.works.badge}</span>
        <h2 className="works-title">{l.works.title}</h2>
        <p className="works-subtitle">
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
            <h3 className="card-title">{l.works.step1Title}</h3>
            <p className="card-desc">
              {l.works.step1Desc}
            </p>
          </div>

          <div className="work-card">
            <div className="card-icon">
              <i className="fa-regular fa-calendar"></i>
            </div>
            <h3 className="card-title">{l.works.step2Title}</h3>
            <p className="card-desc">
              {l.works.step2Desc}
            </p>
          </div>

          <div className="work-card">
            <div className="card-icon">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h3 className="card-title">{l.works.step3Title}</h3>
            <p className="card-desc">
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
          <span className="badge-subtle">{l.pioneering.badge}</span>
          <h2 className="pioneering-title">{l.pioneering.title}</h2>
          <p className="pioneering-desc">
            {l.pioneering.desc}
          </p>

          <ul className="feature-list">
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
            <Link href="#" className="btn-outline">{l.pioneering.learnMore}</Link>
            <Link href="#" className="btn-primary-blue">{l.pioneering.bookSpot}</Link>
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
    </>
  );
}
