/**
 * Legal Configuration & Corporate Constants for DiWrapp
 *
 * NOTE FOR LEGAL REVIEW:
 * All values marked with `[TO CONFIRM: ...]` are provisional placeholders
 * based on current codebase implementation and footer information.
 * They must be confirmed by legal counsel and the project owner before production launch.
 */

export interface LegalConfig {
  company: {
    legalName: string;
    tradeName: string;
    parentGroup: string;
    commercialRegistrationNumber: string;
    taxIdentificationNumber: string;
    headquartersAddress: {
      street: string;
      district: string;
      city: string;
      country: string;
      postalCode: string;
      buildingNumber: string;
    };
  };
  contact: {
    generalEmail: string;
    legalEmail: string;
    privacyEmail: string;
    supportEmail: string;
    phone: string;
  };
  dates: {
    effectiveDateEn: string;
    effectiveDateAr: string;
    lastUpdatedEn: string;
    lastUpdatedAr: string;
  };
  jurisdiction: {
    governingLawEn: string;
    governingLawAr: string;
    disputeForumEn: string;
    disputeForumAr: string;
    prevailingLanguage: 'ar' | 'en' | '[TO CONFIRM: ar | en]';
  };
  operational: {
    minimumAge: number;
    authorizedCountries: string[];
    standardDataRetentionPeriod: string;
    financialDataRetentionPeriod: string;
    screenUptimeSlaTarget: string;
    campaignCancellationNoticeHours: number;
  };
}

export const LEGAL_CONFIG: LegalConfig = {
  company: {
    legalName: "[TO CONFIRM: Distin-Gui Information Technology Company / DiWrapp Co.]",
    tradeName: "DiWrapp",
    parentGroup: "Distin-Gui Group",
    commercialRegistrationNumber: "[TO CONFIRM: Saudi Commercial Registration (CR) Number]",
    taxIdentificationNumber: "[TO CONFIRM: ZATCA VAT / Tax ID Number]",
    headquartersAddress: {
      street: "Olaya Street",
      district: "Olaya District",
      city: "Riyadh",
      country: "Kingdom of Saudi Arabia",
      postalCode: "[TO CONFIRM: Postal Code, e.g. 12211]",
      buildingNumber: "[TO CONFIRM: Building Number]",
    },
  },
  contact: {
    generalEmail: "info@di-wrapp.com",
    legalEmail: "[TO CONFIRM: legal@di-wrapp.com]",
    privacyEmail: "[TO CONFIRM: privacy@di-wrapp.com]",
    supportEmail: "[TO CONFIRM: support@di-wrapp.com]",
    phone: "+966 00 000 0000",
  },
  dates: {
    effectiveDateEn: "May 1, 2026",
    effectiveDateAr: "1 مايو 2026",
    lastUpdatedEn: "October 5, 2026",
    lastUpdatedAr: "5 أكتوبر 2026",
  },
  jurisdiction: {
    governingLawEn: "[TO CONFIRM: Laws and regulations of the Kingdom of Saudi Arabia]",
    governingLawAr: "[TO CONFIRM: أنظمة ولوائح المملكة العربية السعودية]",
    disputeForumEn: "[TO CONFIRM: Competent courts of Riyadh, Kingdom of Saudi Arabia]",
    disputeForumAr: "[TO CONFIRM: المحاكم المختصة بمدينة الرياض، المملكة العربية السعودية]",
    prevailingLanguage: "[TO CONFIRM: ar | en]",
  },
  operational: {
    minimumAge: 18,
    authorizedCountries: [
      "Saudi Arabia (KSA)",
      "United Arab Emirates (UAE)",
      "Sudan (SD)",
      "United States (US)",
      "United Kingdom (UK)",
      "[TO CONFIRM: Complete list of launch countries]",
    ],
    standardDataRetentionPeriod: "[TO CONFIRM: Duration of active account plus 3 years after account closure, or as required by applicable law]",
    financialDataRetentionPeriod: "[TO CONFIRM: Minimum 5 to 10 years for tax and commercial records pursuant to applicable accounting laws]",
    screenUptimeSlaTarget: "[TO CONFIRM: e.g. 98.0% monthly uptime SLA for active displays]",
    campaignCancellationNoticeHours: 48, // [TO CONFIRM: Notice required before campaign launch for full or partial refund]
  },
};
