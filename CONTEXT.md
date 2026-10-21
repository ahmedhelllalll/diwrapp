# DiWrapp Project Context & Architecture Guide

> **Generated**: October 2026  
> **Source of Truth**: Extracted directly from codebase analysis of `e:\Diwrapp\diwrapp`.

---

## 1. What the Project Does and Who It's For

**DiWrapp** (also associated with **Distin-Gui Group** / **Di-wrapp SD**) is a modern, bilingual (English and Arabic) digital out-of-home (DOOH) smart advertising and media platform.

The platform serves two primary user segments:
1. **Advertisers**: Brands, agencies, and businesses looking to discover, plan, book, and track outdoor and transit media advertising inventory (billboards, bus stops, digital displays, and fleet branding), supported by AI-driven tools (e.g., the *Ask_Di* assistant).
2. **Vendors (Property & Media Inventory Owners)**: Owners and operators of physical advertising assets (billboard structures, digital screens, transit fleets, retail/commercial spaces) who want to monetize their inventory by listing display spaces, managing bookings, and receiving payouts via the DiWrapp smart network.

### Current Product Phase
The project is currently in a high-fidelity marketing, onboarding, legal compliance, and pre-launch showcase phase. Full transactional dashboard operations and interactive blogs point to structured "Coming Soon" states (`/:lang/coming-soon`) or multi-step onboarding wizards (`/:lang/vendor/onboarding`), while the core application architecture is designed to interface with an external ASP.NET Core REST backend.

---

## 2. Stack and Architecture

### Core Technologies and Versions
- **Framework**: **Next.js 16.2.12** (App Router with `[lang]` dynamic route segment, `cacheComponents: true` in `next.config.ts`, and async params handling).
- **Runtime & UI**: **React 19.2.4** and **React DOM 19.2.4**.
- **Language**: **TypeScript 5** (`strict: true`, path alias `@/*` -> `./src/*`).
- **Styling**:
  - **Tailwind CSS v4** (`tailwindcss@^4`, `@tailwindcss/postcss@^4`, inline theme configuration in `src/app/globals.css`).
  - Scoped standalone CSS modules for specific page experiences (`about.css`, `advertise.css`, `contact.css`, `vendor.css`, `wallet.css`).
  - **Dark Mode**: Managed via `next-themes` (`attribute="class"`), tailored with CSS custom properties (`--surface-1`, `--surface-2`, `--surface-3`, `--card-surface`, `--card-border`) and `@custom-variant dark (&:is(.dark *));`.
  - **RTL / LTR**: Full bidirectional support dynamically driven by `dir="rtl"` / `dir="ltr"` on `<html>` and CSS logical properties (`ps-*`, `pe-*`, `start-*`, `end-*`, `rtl:`, `ltr:`).
- **Fonts & Typography**:
  - **Lufga**: Custom local font loaded via `next/font/local` in `src/app/[lang]/layout.tsx` (using WOFF2 assets in `src/fonts/`).
  - **Cairo**: Google Arabic font loaded via `next/font/google` for Arabic (`dir="rtl"`) typography.
  - **Geist Mono**: Google Mono font loaded via `next/font/google` for monospace data displays.
- **Motion & Smooth Scrolling**:
  - **Framer Motion 13.0.0** (`framer-motion`) with standardized Apple easing curves (`appleEasing = [0.16, 1, 0.3, 1]`) and strict `prefers-reduced-motion` compliance.
  - **Lenis 1.1.13** (`lenis`) for momentum smooth scrolling, managed through `src/components/common/SmoothScroll.tsx`.
- **Utilities & Libraries**:
  - Phone formatting & validation: `libphonenumber-js@^1.13.15`
  - Country flags: `country-flag-icons@^1.6.20`
  - Localization matching: `@formatjs/intl-localematcher@^0.5.4` and `negotiator@^0.6.3`
  - Geolocation detection: `@vercel/functions@^3.9.9`
  - Functional utilities: `es-toolkit@^1.50.0`
  - Icons: `iconoir-react@^7.12.1` and custom inline SVGs

---

### Architecture & Routing Setup

```
Incoming HTTP Request
        │
        ▼
┌────────────────────────────────────────────────────────┐
│  src/proxy.ts (Next.js 16 Request Proxy)               │
│  • Matches all routes except static assets & api       │
│  • Detects / negotiates locale (redirects to /:lang)   │
│  • Applies security headers                            │
│  • Detects visitor country code (Vercel geo / headers) │
│  • Evaluates lightweight UX session token checks       │
└───────────────────────┬────────────────────────────────┘
                        │
                        ▼
┌────────────────────────────────────────────────────────┐
│  src/app/[lang]/layout.tsx (Root Layout)               │
│  • Injects <html> lang & dir ('ar' -> rtl, 'en' -> ltr)│
│  • Injects Lufga & Cairo & Geist Mono fonts            │
│  • Injects Schema.org JSON-LD structured data          │
│  • Mounts ThemeProvider, Progress Bar, SmoothScroll    │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
            ▼                                ▼
┌────────────────────────┐      ┌────────────────────────┐
│ (marketing)/layout.tsx │      │ (auth)/layout.tsx      │
│ • Mounts Global Header │      │ • Minimal auth layout  │
│ • Yields {children}    │      │ • Split-view container │
│ • Mounts Global Footer │      │ • Yields auth pages    │
└────────────────────────┘      └────────────────────────┘
```

#### Route Inventory
All public routes exist under the `[lang]` dynamic segment (`/en` or `/ar`):

| URL Pattern | Source File | Route Group | Description |
| :--- | :--- | :--- | :--- |
| `/:lang` | `src/app/[lang]/page.tsx` | Root | Interactive Landing page with floating hero assets and FAQ |
| `/:lang/about` | `src/app/[lang]/(marketing)/about/page.tsx` | `(marketing)` | About DiWrapp, story, vision, and client testimonials |
| `/:lang/advertise` | `src/app/[lang]/(marketing)/advertise/page.tsx` | `(marketing)` | Advertising portal, AI carousel, feature bento grid |
| `/:lang/ask-di` | `src/app/[lang]/(marketing)/ask-di/page.tsx` | `(marketing)` | AI media planning assistant showcase |
| `/:lang/blog` | `src/app/[lang]/(marketing)/blog/page.tsx` | `(marketing)` | Blog index (renders Coming Soon state) |
| `/:lang/coming-soon` | `src/app/[lang]/(marketing)/coming-soon/page.tsx` | `(marketing)` | Pre-launch feature placeholder and notification signup |
| `/:lang/contact` | `src/app/[lang]/(marketing)/contact/page.tsx` | `(marketing)` | Contact info, interactive cards, validated contact form |
| `/:lang/cookie-policy` | `src/app/[lang]/(marketing)/cookie-policy/page.tsx` | `(marketing)` | Structured Cookie Policy via `LegalArticle` |
| `/:lang/culture` | `src/app/[lang]/(marketing)/culture/page.tsx` | `(marketing)` | Company culture, life at DiWrapp, careers bento |
| `/:lang/join-us` | `src/app/[lang]/(marketing)/join-us/page.tsx` | `(marketing)` | Partner & career opportunities, platform showcase |
| `/:lang/privacy-policy` | `src/app/[lang]/(marketing)/privacy-policy/page.tsx` | `(marketing)` | Structured Privacy Policy via `LegalArticle` |
| `/:lang/terms-and-conditions` | `src/app/[lang]/(marketing)/terms-and-conditions/page.tsx` | `(marketing)` | Structured Terms of Service via `LegalArticle` |
| `/:lang/vendor` | `src/app/[lang]/(marketing)/vendor/page.tsx` | `(marketing)` | Vendor portal overview and inventory benefits |
| `/:lang/vendor/onboarding` | `src/app/[lang]/(marketing)/vendor/onboarding/page.tsx` | `(marketing)` | 3-step vendor onboarding registration wizard |
| `/:lang/wallet` | `src/app/[lang]/(marketing)/wallet/page.tsx` | `(marketing)` | DiWrapp digital wallet feature showcase |
| `/:lang/login` | `src/app/[lang]/(auth)/login/page.tsx` | `(auth)` | User login interface |
| `/:lang/signup` | `src/app/[lang]/(auth)/signup/page.tsx` | `(auth)` | Multi-step user registration wizard (`SignupFormClient`) |
| `/:lang/reset-password` | `src/app/[lang]/(auth)/reset-password/page.tsx` | `(auth)` | Account password recovery |
| `/:lang/design-system` | `src/app/[lang]/(internal)/design-system/page.tsx` | `(internal)` | Comprehensive internal UI design system explorer |
| `/:lang/[...notFound]` | `src/app/[lang]/[...notFound]/page.tsx` | Root | Localized 404 handler mounting `NotFoundView` |

---

### Authentication and Security Model

- **Single Source of Truth**: The Backend (**ASP.NET Core**) is the sole authoritative system for authentication, cryptographic JWT signature verification, password hashing, and role-based access control.
- **Frontend Role**: Strictly UX-level helpers:
  - `AUTH_COOKIE_NAME`: `diwrapp_session` (defined in `src/lib/auth/config.ts`).
  - `src/lib/auth/session.ts`: Contains `decodeSessionToken<T>()` which parses Base64Url JWT payloads (client, edge, and node compatible) without signature validation. `isSessionExpired()` checks the `exp` claim against local timestamp.
  - `src/proxy.ts`: Contains `PROTECTED_PATH_PREFIXES` array to intercept unauthorized visits and redirect to `/:lang/login`.
  - In `src/app/[lang]/(auth)/signup/SignupFormClient.tsx`, completed signups currently record a temporary profile object `{ name, email, role }` in browser `localStorage` under `diwrapp_user` and redirect to `/:lang/coming-soon`.

---

### Main Data Flow & External Backend Integration

1. **Localization Data**:
   - Dictionaries are static JSON files located in `src/dictionaries/en.json` and `src/dictionaries/ar.json`.
   - `src/dictionaries.ts` exposes `getDictionary(locale)` marked with `import 'server-only'`.
   - Page Server Components load the dictionary asynchronously and pass relevant sections to Client Components as props.
2. **Backend Communication**:
   - Centralized HTTP client in `src/lib/api/client.ts` (`apiClient<T>()`).
   - Default backend URL: `http://localhost:5000/api` (overridden via `process.env.NEXT_PUBLIC_API_BASE_URL`).
   - Automatically injects `Authorization: Bearer <token>` and `Content-Type: application/json`.
   - Parses ASP.NET Core `ProblemDetails` or standard `{ message, title }` error objects and throws a typed `ApiError`.
3. **Contact & Form Submissions**:
   - `ContactForm.tsx`: Performs full client-side validation (phone parsed into E.164 via `libphonenumber-js`). If `NEXT_PUBLIC_API_BASE_URL` is set, issues a `POST /contact`. If unconfigured or unreachable, it activates a mailto fallback instead of faking delivery.
   - `VendorOnboardingWizard.tsx`: Manages multi-step state with URL parameter synchronization (`?step=1..4`) and smooth scroll handling via `lenis`.

---

## 3. Folder Structure and Purpose

```
e:\Diwrapp\diwrapp\
├── docs/                               # Project audit records and legal review checklists
│   ├── contact-audit.md                # Comprehensive audit of contact page & lighthouse targets
│   └── legal-review-checklist.md       # Compliance and legal placeholder tracker
├── lh-reports/                         # Lighthouse audit reports (JSON outputs)
├── mockups/                            # Standalone static HTML prototype files
├── public/                             # Public static asset root
│   ├── assets/                         # WebP and PNG component mockups, UI screenshots, backgrounds
│   ├── fonts/                          # Public copy of Lufga OTF and WOFF2 font files
│   └── images/                         # Categorized media (campaigns, features, testimonials, floating)
├── scripts/                            # Operational Lighthouse and verification audit scripts
│   ├── audit-culture-baseline.mjs      # Headless Lighthouse runner for culture page
│   ├── audit-legal-pages.mjs           # Headless Lighthouse runner for legal pages
│   └── create-404-billboard.js         # Canvas generator for 404 billboard graphic
├── src/                                # Application source code
│   ├── app/                            # Next.js App Router root
│   │   ├── about.css                   # Scoped styles for about page
│   │   ├── advertise.css               # Scoped styles for advertise page
│   │   ├── contact.css                 # Scoped styles for contact page
│   │   ├── global-error.tsx            # Global top-level React error boundary
│   │   ├── globals.css                 # Tailwind CSS v4 entrypoint, theme tokens, typography rules
│   │   ├── not-found.tsx               # Unlocalized root 404 fallback
│   │   ├── robots.ts                   # Dynamic robots.txt metadata generator
│   │   ├── sitemap.ts                  # Dynamic sitemap.xml generator covering all routes and languages
│   │   ├── vendor.css                  # Scoped styles for vendor pages
│   │   ├── wallet.css                  # Scoped styles for wallet page
│   │   └── [lang]/                     # Dynamic locale prefix wrapper
│   │       ├── layout.tsx              # Root HTML/Body layout with theme and font providers
│   │       ├── page.tsx                # Landing page route
│   │       ├── (auth)/                 # Auth route group (login, signup, reset-password)
│   │       ├── (internal)/             # Internal tools group (design-system)
│   │       ├── (marketing)/            # Public marketing route group with shared Header/Footer
│   │       └── [...notFound]/          # Dynamic localized 404 route
│   ├── components/                     # React components
│   │   ├── common/                     # Cross-cutting widgets (CountryBadge, LanguageToggle, SmoothScroll, Reveal)
│   │   ├── internal/                   # DesignSystem showcase component
│   │   ├── layout/                     # Application structural components (Header, Footer, MobileMenuDrawer)
│   │   ├── legal/                      # Legal document renderer (LegalArticle)
│   │   ├── marketing/                  # Feature components scoped by route domain
│   │   │   ├── about/                  # About page testimonials and marquee
│   │   │   ├── advertise/              # Advertise bento grid and carousel
│   │   │   ├── ai/                     # Ask_Di AI hero and carousel
│   │   │   ├── coming-soon/            # Coming soon view and header
│   │   │   ├── contact/                # Contact cards, hero, and form
│   │   │   ├── culture/                # Culture bento, life at DiWrapp
│   │   │   ├── join-us/                # Opportunities and platform showcase
│   │   │   ├── landing/                # Floating assets, marquee, FAQ, hero mockups
│   │   │   ├── vendor/                 # Vendor portal hero, FAQ, and 3-step onboarding wizard
│   │   │   └── wallet/                 # Wallet hero, features, and statement
│   │   └── ui/                         # Reusable design system primitives (Badge, Button, Card, Input, Modal, etc.)
│   ├── config/                         # Configuration and business constants (legal.ts)
│   ├── content/                        # Structured content files (legal/cookies.ts, privacy.ts, terms.ts)
│   ├── dictionaries/                   # Static localized JSON strings (en.json, ar.json)
│   ├── fonts/                          # Local WOFF2 & OTF files loaded via next/font/local
│   ├── hooks/                          # Custom React hooks (useMediaQuery.ts)
│   ├── lib/                            # Core shared utility modules
│   │   ├── api/                        # HTTP client (client.ts) and shared API response types (types.ts)
│   │   ├── auth/                       # Client session inspection (session.ts) and constants (config.ts)
│   │   ├── geo.ts                      # Country detection helpers (header/cookie inspection)
│   │   └── motion.ts                   # Framer motion variants, appleEasing, and reveal tokens
│   ├── dictionaries.ts                 # Server-only dictionary loader
│   ├── i18n-config.ts                  # Localization configuration (locales: ['en', 'ar'])
│   └── proxy.ts                        # Next.js 16 request interceptor for redirects and headers
├── tools/                              # Project maintenance and legacy archive scripts
├── AGENTS.md                           # Core agent instruction file regarding Next.js 16 breaking changes
├── CLAUDE.md                           # Pointer referencing AGENTS.md
├── eslint.config.mjs                   # ESLint flat configuration extending eslint-config-next
├── next.config.ts                      # Next.js configuration (redirects, image formats, transpilation)
├── package.json                        # Dependencies, scripts, and package metadata
├── postcss.config.mjs                  # PostCSS configuration for Tailwind v4
└── tsconfig.json                       # TypeScript configuration and path aliases
```

---

## 4. Conventions Followed by the Project

### Next.js 16 Rules (Critical)
- **Async Route Parameters**: In Next.js 16, `props.params` and `props.searchParams` are Promises. They **must always be awaited** before accessing properties:
  ```ts
  export default async function Page(props: { params: Promise<{ lang: string }> }) {
    const params = await props.params;
    const lang = params.lang as Locale;
  }
  ```
- **Proxy Pattern**: Next.js 16 replaces traditional middleware conventions with `src/proxy.ts` exporting a `proxy(request)` function and a `config.matcher`. Do not create a separate `middleware.ts`.
- **Server-Only Boundaries**: Files loading server secrets or dictionaries must use `import 'server-only'`.

### Bidirectional Support (Arabic / English)
- **Direction Awareness**: Never hardcode physical horizontal padding (`pl-*`, `pr-*`) or margins (`ml-*`, `mr-*`) unless intentionally asymmetric. Always use CSS logical properties: `ps-*` (padding-inline-start), `pe-*` (padding-inline-end), `start-*`, `end-*`.
- **Font Switching**:
  - English: `font-['Lufga',sans-serif]` (or `var(--font-lufga)`).
  - Arabic: `font-['Cairo',sans-serif]` (or `var(--font-cairo)`).
- **Motion Flipping**: When animating elements horizontally across steps or slides, evaluate `const isRtl = lang === 'ar'` and invert horizontal X offsets (`xOffset = isRtl ? -value : value`).

### Styling & Design System
- **Colors**:
  - Primary Brand: `#0066FF` / `var(--brand)`
  - Surfaces: Light mode `bg-white`, Dark mode `#080808` (`--surface-1`), `#121214` (`--surface-2`), `#18181B` (`--surface-3`).
  - Cards: Light mode `bg-white`, Dark mode `#0a0a0a` / `#121214`.
  - Borders: Light mode `#EAECF0` / `#E4E7EC`, Dark mode `#27272A` / `zinc-800`.
- **Component Primitives**: For new interactive controls, use or extend existing UI primitives in `src/components/ui/` (`Badge.tsx`, `Button.tsx`, `Input.tsx`, `Modal.tsx`, `Select.tsx`).

### Performance & Accessibility Standards
- **Lighthouse Goals**: 100 on Accessibility, Best Practices, and SEO; high 90s on Performance.
- **Images**: Use `next/image` (`<Image />`) with explicit `width`, `height`, and `alt` descriptions. For hero LCP assets, specify `priority`.
- **Motion Accessibility**: Always respect user motion preferences via Framer Motion's `useReducedMotion()`. If reduced motion is requested, render transitions immediately with zero delay.
- **Color Contrast**: Ensure body text and counter labels meet WCAG AA standards (minimum 4.5:1 contrast).

---

## 5. Commands

All commands are executed via NPM from the workspace root:

| Purpose | Command | Notes |
| :--- | :--- | :--- |
| **Development** | `npm run dev` | Starts Next.js development server at `http://localhost:3000` |
| **Production Build** | `npm run build` | Compiles and type-checks the Next.js production bundle |
| **Start Production** | `npm run start` | Runs the compiled production build |
| **Linting** | `npm run lint` | Runs ESLint flat config checking for TypeScript and Next.js rules |
| **Lighthouse Audit** | `node scripts/audit-legal-pages.mjs` | Executes headless mobile Lighthouse audits against legal routes |
| **Database Migrations** | *None* | No database or ORM exists in this repo (external ASP.NET backend) |
| **Automated Tests** | *None* | No Jest, Vitest, or Playwright test runner is currently configured |

---

## 6. Sensitive or Complex Areas to Be Careful With

1. **`src/proxy.ts` Locale Redirection & Matcher**:
   - The regex matcher excludes static assets, images, fonts, and API routes.
   - Any incorrect modification to the proxy logic can cause an infinite redirect loop between `/:lang` and unlocalized paths.
2. **Next.js 16 Breaking Changes**:
   - As emphasized in `AGENTS.md`, APIs differ from older Next.js versions. Never attempt synchronous reads of route params, and check deprecation notices before adding experimental App Router features.
3. **External Backend Decoupling**:
   - There is no local database or server-side ORM. All persistent mutations must flow through `src/lib/api/client.ts` to the ASP.NET Core service.
   - Never implement cryptographic signature verification or permanent security decisions on the frontend.
4. **Geolocation Header Fallbacks**:
   - `src/lib/geo.ts` handles country detection across Vercel Edge (`@vercel/functions`), cloud headers (`x-vercel-ip-country`, `cf-ipcountry`), cookie (`di_country`), and fallback to `'sa'`. Server components using `CountryBadge` must be wrapped in `React.Suspense` to avoid de-opting entire pages into dynamic rendering without fallbacks.
5. **Asset File Name Casing on Linux / Vercel**:
   - Windows filesystems are case-insensitive, but Vercel Linux production servers are strictly case-sensitive. Always verify that image import paths match the exact disk casing (e.g., `.webp` vs `.png`, PascalCase vs kebab-case).
6. **Scoped Page Stylesheet Clashes**:
   - Scoped stylesheets (`about.css`, `advertise.css`, `contact.css`, `vendor.css`, `wallet.css`) declare page-specific class names. Avoid generic global class names in these files that might inadvertently override styles on other routes.

---

## 7. Questions / Uncertainties (Separated, No Assumptions)

The following areas cannot be definitively determined solely from the repository code and should be clarified with the team or product owner:

1. **Dashboard Route Strategy**:
   - Earlier audit documents referenced `(dashboard)/advertiser` and `(dashboard)/vendor` pages, which have since been removed from `src/app/[lang]`. Are full vendor and advertiser management dashboards being built in a separate repository/subdomain, or are they planned to be reintroduced here once the ASP.NET Core backend is connected?
2. **Backend Authentication & API Contract**:
   - What are the final production endpoint paths, request bodies, and cookie specifications for the ASP.NET Core API (e.g., `/api/v1/auth/login`, `/api/v1/vendors/onboard`, `/api/v1/contact`)?
3. **`recharts` Dependency in `next.config.ts`**:
   - `next.config.ts` includes `transpilePackages: ['recharts', 'es-toolkit']`, but `recharts` is not listed in `package.json`. Is charting planned for future analytics views, or can this entry be cleaned up?
4. **Testing Framework Preference**:
   - Currently, no unit or integration test runner (such as Vitest, Jest, or Playwright) is installed. Which testing framework is preferred for this repository?
5. **Final Legal Placeholders**:
   - `src/config/legal.ts` and `src/content/legal/` contain provisional flags marked `[TO CONFIRM: ...]` regarding official commercial registration numbers, VAT tax identification, postal codes, and dispute jurisdiction. These require legal counsel sign-off prior to production launch.
