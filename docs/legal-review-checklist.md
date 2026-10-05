# DiWrapp Legal Review & Policy Checklist

> **Notice for Project Owner & Legal Counsel:**
> This document accompanies the draft Privacy Policy, Terms & Conditions, and Cookie Policy implemented for DiWrapp. It identifies every placeholder, assumption, and key operational decision embedded in the draft texts.
>
> Each question below is formulated to be answerable in a single line. Once answers are confirmed, corresponding placeholders marked with `[TO CONFIRM: ...]` in `src/config/legal.ts` and the legal content files will be replaced with final corporate and contractual terms.

---

## 1. Corporate Identity & Legal Registration

1. **What is the exact registered legal entity name of the company operating DiWrapp?**  
   *Current draft assumption:* `Distin-Gui Information Technology Company` (under Distin-Gui Group).
2. **What is the official Commercial Registration (CR) number in Saudi Arabia?**  
   *Current draft assumption:* Placeholder `[TO CONFIRM: Saudi Commercial Registration Number]`.
3. **What is the company's ZATCA Tax / VAT identification number?**  
   *Current draft assumption:* Placeholder `[TO CONFIRM: ZATCA VAT / Tax ID Number]`.
4. **What is the precise National Address (building number, postal code, secondary number) in Riyadh?**  
   *Current draft assumption:* Olaya Street - Olaya District, Riyadh, Saudi Arabia (`[TO CONFIRM: Building number & Postal Code, e.g. 12211]`).

---

## 2. Governing Law, Jurisdiction & Language Precedence

5. **Which country and municipal laws govern the DiWrapp platform, user contracts, and campaign orders?**  
   *Current draft assumption:* Laws and regulations of the Kingdom of Saudi Arabia (KSA).
6. **Which specific judicial forum holds exclusive jurisdiction to resolve formal disputes?**  
   *Current draft assumption:* The competent courts of Riyadh, Kingdom of Saudi Arabia.
7. **In the event of a discrepancy or conflict between the English and Arabic versions of the legal policies, which language text legally prevails?**  
   *Current draft assumption:* Arabic prevails (standard regulatory practice in Saudi Arabia).

---

## 3. Scope of Operations & Cross-Border Data Transfers

8. **Which countries constitute the authorized commercial operating footprint at initial launch?**  
   *Current draft assumption:* Saudi Arabia (KSA), United Arab Emirates (UAE), Sudan (SD), United Kingdom (UK), United States (US) (derived from active telephone picker codes and geolocation cookies).
9. **Does DiWrapp transfer or store personal data outside Saudi Arabia, and are standard contractual clauses (SCCs) in place with cloud processors (e.g. Vercel Inc.)?**  
   *Current draft assumption:* Yes; edge routing and cloud compute occur on Vercel servers with encrypted transit conforming to applicable cross-border data transfer rules under the Saudi Personal Data Protection Law (PDPL).

---

## 4. User Eligibility & Minimum Age

10. **What is the minimum age required to register an account or book advertising campaigns on DiWrapp?**  
    *Current draft assumption:* 18 years of age (age of legal majority for B2B commercial contracting).

---

## 5. Data Retention & Archival Policies

11. **How long will general user accounts and marketing inquiry data be retained after account deactivation or dormancy?**  
    *Current draft assumption:* Duration of active account plus 3 years following deactivation, unless a statutory exception applies.
12. **What is the statutory retention duration for invoices, financial transactions, and billing records?**  
    *Current draft assumption:* 5 to 10 years in compliance with ZATCA tax rules and Saudi commercial regulations.

---

## 6. Supplier Onboarding & Display Service Level Agreements (SLAs)

13. **What minimum display uptime SLA percentage are screen suppliers contractually required to maintain for booked campaigns?**  
    *Current draft assumption:* 98.0% monthly uptime target across active digital displays.
14. **What specific licenses or documents must a screen supplier upload before inventory approval (e.g. municipal permit, lease agreement, commercial license)?**  
    *Current draft assumption:* Proof of legal authority to host displays, municipal advertising permit, and valid commercial registration.
15. **What form of proof-of-play (e.g., electronic playback logs, camera snapshots, or third-party telemetry) must suppliers provide to verify campaign delivery?**  
    *Current draft assumption:* Automated electronic player logs or photographic verification within 24 hours of broadcast.

---

## 7. Advertising Content Standards & Regulatory Approvals

16. **Must advertisers upload official media regulatory permits (e.g. GAMR advertising licenses in Saudi Arabia) prior to campaign broadcasting?**  
    *Current draft assumption:* Yes; advertisers bear full legal responsibility for securing and providing municipal/national advertising approvals.
17. **What specific advertising content categories are strictly prohibited on DiWrapp screens?**  
    *Current draft assumption:* Materials violating public order or religious sensibilities, unauthorized pharmaceuticals, narcotics, unlicensed gambling, political campaigning without statutory permit, hate speech, and intellectual property infringement.

---

## 8. Bookings, Payments, Cancellations & Refund Policies

18. **How many hours prior to scheduled campaign launch may an advertiser cancel a booking to receive a refund or wallet credit?**  
    *Current draft assumption:* At least 48 hours notice prior to scheduled launch for partial or full platform credit; no refund once live broadcast begins or within 24 hours of launch.
19. **What remedy is provided if a screen suffers an unexpected technical failure or power blackout during a scheduled campaign?**  
    *Current draft assumption:* A rescheduled broadcast make-good or pro-rata wallet balance credit.
20. **What is the agreed cap on DiWrapp's aggregate commercial liability in legal disputes?**  
    *Current draft assumption:* The total fees paid by the advertiser for the specific disputed campaign in the preceding 3 months, or $100 USD (whichever is greater).

---

## 9. Payment Gateways & Digital Wallet Operations

21. **Which payment service providers (PSPs) or merchant aggregators will process live transactions upon full launch?**  
    *Current draft assumption:* Corporate wire transfer, approved enterprise payment gateways (e.g. Moyasar, Checkout.com, or HyperPay), and platform wallet balances.
22. **Are wallet funds withdrawable by advertisers, or can they only be redeemed for future screen inventory bookings?**  
    *Current draft assumption:* Wallet balances are non-transferable credits redeemable against platform bookings unless account termination is approved by finance.

---

## 10. Legal Notice & Communications

23. **What are the designated official email addresses for formal legal notices and privacy requests?**  
    *Current draft assumption:* `legal@di-wrapp.com` and `privacy@di-wrapp.com` (general fallback: `info@di-wrapp.com`).
24. **Will DiWrapp appoint an official Data Protection Officer (DPO) under Saudi PDPL regulations?**  
    *Current draft assumption:* Yes; privacy communications are routed to the designated Privacy Team / DPO at `privacy@di-wrapp.com`.

---

## Summary of Placeholders in Code

| Identifier in Code | File Location | Topic / Context |
| :--- | :--- | :--- |
| `[TO CONFIRM: Distin-Gui Information Technology Company...]` | `src/config/legal.ts` | Corporate legal entity name |
| `[TO CONFIRM: Saudi Commercial Registration Number]` | `src/config/legal.ts` | Commercial Registration number |
| `[TO CONFIRM: ZATCA VAT / Tax ID Number]` | `src/config/legal.ts` | VAT identification number |
| `[TO CONFIRM: Building number & Postal Code]` | `src/config/legal.ts` | Detailed physical address |
| `[TO CONFIRM: legal@di-wrapp.com / privacy@di-wrapp.com]` | `src/config/legal.ts` | Official legal/privacy emails |
| `[TO CONFIRM: Complete list of launch countries]` | `src/config/legal.ts` | Commercial operating jurisdictions |
| `[TO CONFIRM: standardDataRetentionPeriod]` | `src/config/legal.ts` | User data retention timeframe |
| `[TO CONFIRM: screenUptimeSlaTarget]` | `src/config/legal.ts` | Screen supplier uptime SLA |
| `[TO CONFIRM: campaignCancellationNoticeHours]` | `src/config/legal.ts` | Cancellation notice window (48h) |
| `[TO CONFIRM: ar \| en prevailing language]` | `src/config/legal.ts` | Language precedence in disputes |
| `[TO CONFIRM: Specific regulatory approval upload requirements]` | `src/content/legal/terms.ts` | Regulatory upload verification |
| `[TO CONFIRM: Liability cap formula]` | `src/content/legal/terms.ts` | Commercial liability limitation |
