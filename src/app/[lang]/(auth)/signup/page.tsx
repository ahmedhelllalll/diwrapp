import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import Link from 'next/link';
import LanguageToggle from "@/components/common/LanguageToggle";

export default async function Signup(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Left Section */}
        <div className="left-card left-card-orange">
          <div className="left-header">
            <div className="logo-box-left">
              <img src="/logo.png" alt="Di-wrapp Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div className="brand-title">
              Di-wrapp <span>SD</span>
            </div>
          </div>

          <div className="left-content">
            <div className="sub-tag">{dict.auth.leftSubTag}</div>
            <h1 className="main-heading">
              {dict.auth.leftHeading}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-card">
          <LanguageToggle currentLang={lang} />
          
          <div className="right-card-header-wrapper">
            <div className="form-logo">
              <img src="/logo.png" alt="Di-wrapp Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div className="form-header">
              <h2>{dict.signup.title}</h2>
              <p>{dict.signup.subtitle}</p>
            </div>
          </div>

          <form className="form">
            <div className="input-group">
              <label>{dict.signup.nameLabel}</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-user icon-left"></i>
                <input type="text" placeholder={dict.signup.namePlaceholder} required />
              </div>
            </div>

            <div className="input-group">
              <label>{dict.auth.emailLabel}</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope icon-left"></i>
                <input type="email" placeholder={dict.auth.emailPlaceholder} required />
              </div>
            </div>

            <div className="input-group">
              <label>{dict.signup.confirmPasswordLabel}</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock icon-left"></i>
                <input type="password" placeholder={dict.auth.passwordPlaceholder} required />
                <i className="fa-regular fa-eye-slash eye-icon"></i>
              </div>
            </div>

            <button type="submit" className="btn-submit btn-submit-signup">{dict.signup.submit}</button>

            <div className="divider">
              <span>{dict.auth.or}</span>
            </div>

            <button type="button" className="social-btn">
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              {dict.auth.google}
            </button>

            <button type="button" className="social-btn">
              <svg viewBox="0 0 170 170" fill="#000000">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.37-6.08-3.32-2.73-7.23-7.46-11.73-14.19-6.3-9.43-11.16-19.86-14.59-31.29-3.42-11.43-5.14-22.38-5.14-32.85 0-14.07 3.51-25.81 10.53-35.22 7.03-9.41 16.02-14.23 26.98-14.46 4.67 0 9.87 1.15 15.61 3.45 5.74 2.3 9.77 3.45 12.09 3.45 1.8 0 5.92-1.22 12.36-3.66 6.44-2.44 11.75-3.53 15.93-3.28 11.83.92 21.03 5.48 27.6 13.68-10.37 6.27-15.42 15.01-15.16 26.22.26 8.81 3.55 16.28 9.87 22.4 6.32 6.12 13.9 9.81 22.75 11.07-2.3 6.84-5.2 13.79-8.7 20.84zM119.22 31.08c0-7.23 2.65-14.34 7.95-21.32 5.3-6.98 12.07-11.25 20.31-12.81.43 1.93.65 3.73.65 5.4 0 7.37-2.74 14.54-8.21 21.51-5.48 6.97-12.34 11.16-20.58 12.57-.12-1.8-.12-3.58-.12-5.35z"/>
              </svg>
              {dict.auth.apple}
            </button>

            <div className="login-footer">
              {dict.signup.hasAccount} <Link href={`/${lang}/login`}>{dict.signup.login}</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
