import { getDictionary } from "../../../../dictionaries";
import { Locale } from "../../../../i18n-config";
import Link from 'next/link';
import LanguageToggle from "@/components/common/LanguageToggle";

export default async function ResetPassword(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const lang = params.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Left Section */}
        <div className="left-card left-card-blue">
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
        <div className="right-card right-card-reset">
          <LanguageToggle currentLang={lang} />
          
          <div className="right-card-header-wrapper right-card-header-wrapper-reset">
            <div className="form-header form-header-reset">
              <h2>{dict.resetPassword.title}</h2>
              <p>{dict.resetPassword.subtitle}</p>
            </div>
          </div>

          <form className="form">
            <div className="input-group input-group-reset">
              <label>{dict.auth.emailLabel}</label>
              <div className="input-wrapper input-wrapper-reset">
                <i className="fa-regular fa-envelope icon-left"></i>
                <input type="email" placeholder={dict.resetPassword.emailPlaceholder} required />
              </div>
            </div>

            <button type="submit" className="btn-submit btn-submit-reset">{dict.resetPassword.submit}</button>

            <Link href={`/${lang}/login`} className="btn-back">
              <i className="fa-solid fa-arrow-left"></i>
              {dict.resetPassword.back}
            </Link>
          </form>

        </div>

      </div>
    </div>
  );
}
