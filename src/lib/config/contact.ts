/**
 * Single Source of Truth for DiWrapp Contact Information and Social Profiles.
 * Centralized configuration to prevent hardcoding across components, pages, and metadata.
 */
export const CONTACT_CONFIG = {
  phone: {
    /** Formatted display number with spaces */
    display: "+966 50 572 2153",
    /** Clean RFC 3966 / E.164 tel link value without spaces */
    tel: "+966505722153",
    /** Digits only */
    raw: "966505722153",
  },
  socials: {
    linkedin: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/di-wrapp",
      ariaLabel: "LinkedIn",
    },
    instagram: {
      name: "Instagram",
      url: "https://www.instagram.com/di_wrapp/",
      ariaLabel: "Instagram",
    },
    tiktok: {
      name: "TikTok",
      url: "https://www.tiktok.com/@di_wrapp",
      ariaLabel: "TikTok",
    },
  },
  emails: {
    general: "info@di-wrapp.com",
    sales: "sales@di-wrapp.com",
    support: "support@di-wrapp.com",
  },
  address: {
    en: "Olaya Street - Olaya District,\nRiyadh, Saudi Arabia.",
    ar: "طريق العليا - حي العليا،\nالرياض، المملكة العربية السعودية.",
    mapsUrl: "https://maps.google.com/?q=Olaya+Street+Olaya+District+Riyadh+Saudi+Arabia",
  },
} as const;

export type ContactConfig = typeof CONTACT_CONFIG;
