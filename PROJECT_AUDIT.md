# PROJECT AUDIT

## 1. Full Folder Structure

```
e:\Diwrapp\diwrapp\
├── .gitignore                          # Git ignore rules file
├── AGENTS.md                           # Documentation rule specifying Next.js 16 breaking changes
├── CLAUDE.md                           # Pointer file referencing AGENTS.md
├── eslint.config.mjs                   # ESLint flat config extending eslint-config-next
├── find_history.py                     # Python script searching VS Code User History for deleted CSS
├── image 80.png                        # Loose image file in root (274,614 bytes)
├── image.png                           # Loose image file in root (8,042,714 bytes)
├── next-env.d.ts                       # Next.js TypeScript declarations
├── next.config.ts                      # Next.js configuration (transpilePackages, devIndicators)
├── package-lock.json                   # NPM dependency lockfile
├── package.json                        # Project dependencies, scripts, and package metadata
├── postcss.config.mjs                  # PostCSS configuration loading @tailwindcss/postcss
├── README.md                           # Default create-next-app README with "# diwrapp" appended
├── recover.py                          # Python script searching VS Code User History for specific CSS
├── recover_all.py                      # Python script searching VS Code User History for all CSS
├── recover_old.py                      # Python script searching VS Code User History for older CSS
├── sample_colors2.ps1                  # PowerShell script for sampling pixel colors from an image
├── tsconfig.json                       # TypeScript compiler configuration and path aliases (@/* -> ./src/*)
├── tsconfig.tsbuildinfo                # TypeScript build cache artifact
├── Vector.png                          # Loose graphic asset in root (2,452 bytes)
├── Website (3).png                     # Loose mockup/screenshot in root (389,740 bytes)
├── Website (4).png                     # Loose mockup/screenshot in root (170,254 bytes)
├── Website 404.png                     # Loose mockup/screenshot in root (409,345 bytes)
│
├── lufga-www.Dfonts.org/               # External download archive containing 18 Lufga font variant OTF files
│   └── lufga_fonts/
│       ├── Lufga-Black.otf
│       ├── Lufga-BlackItalic.otf
│       ├── Lufga-Bold.otf
│       ├── Lufga-BoldItalic.otf
│       ├── Lufga-ExtraBold.otf
│       ├── Lufga-ExtraBoldItalic.otf
│       ├── Lufga-ExtraLight.otf
│       ├── Lufga-ExtraLightItalic.otf
│       ├── Lufga-Italic.otf
│       ├── Lufga-Light.otf
│       ├── Lufga-LightItalic.otf
│       ├── Lufga-Medium.otf
│       ├── Lufga-MediumItalic.otf
│       ├── Lufga-Regular.otf
│       ├── Lufga-SemiBold.otf
│       ├── Lufga-SemiBoldItalic.otf
│       ├── Lufga-Thin.otf
│       └── Lufga-ThinItalic.otf
│
├── mockups/                            # Standalone static HTML prototype files
│   └── landing.html
│
├── public/                             # Next.js static asset directory served at domain root
│   ├── file.svg
│   ├── globe.svg
│   ├── join-background.jpg
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── assets/                         # Graphic assets, illustrations, and mockups used by pages
│   │   ├── about-bus-stop-full.png
│   │   ├── about-bus-stop.png
│   │   ├── about-ipad.png
│   │   ├── add-new.png
│   │   ├── advertise-image.jpg
│   │   ├── background-ai.jpg
│   │   ├── background-ai.png
│   │   ├── calendar-ui.png
│   │   ├── calendar.png
│   │   ├── campaign.png
│   │   ├── dashboard.png
│   │   ├── developer-ui.jpg
│   │   ├── digital-door.png
│   │   ├── Ellipse 58.png
│   │   ├── fleet.png
│   │   ├── frame.png
│   │   ├── group-527.png
│   │   ├── image-80.png
│   │   ├── join-background.jpg
│   │   ├── join-laptop.png
│   │   ├── join-tablet.png
│   │   ├── kingdom-tower.png
│   │   ├── logo-icon-white.png
│   │   ├── news-1.jpg
│   │   ├── news-2.png
│   │   ├── platform-tablet.png
│   │   ├── random.png
│   │   ├── table.png
│   │   ├── tablet-image.png
│   │   └── vector.png
│   ├── fonts/                          # Local copy of 5 Lufga OTF font files
│   │   ├── Lufga-Bold.otf
│   │   ├── Lufga-Light.otf
│   │   ├── Lufga-Medium.otf
│   │   ├── Lufga-Regular.otf
│   │   └── Lufga-SemiBold.otf
│   └── images/                         # Media assets organized by sub-domain categories
│       ├── assets/
│       │   └── coming-soon/
│       │       └── image 10.png
│       ├── campaigns/                  # Billboard and display campaign imagery
│       │   ├── downtown-billboard.jpg
│       │   ├── highway-billboard.jpg
│       │   └── metro-display.jpg
│       └── testimonials/               # Client portrait photography and specifications
│           ├── client-01.jpg
│           ├── client-02.jpg
│           ├── client-03.jpg
│           ├── client-04.jpg
│           ├── client-05.jpg
│           ├── client-06.jpg
│           ├── client-07.jpg
│           ├── client-08.jpg
│           ├── client-09.jpg
│           ├── client-10.jpg
│           ├── client-11.jpg
│           ├── client-12.jpg
│           ├── client-13.jpg
│           └── README.md
│
└── src/                                # Application source code
    ├── dictionaries.ts                 # Server-only dictionary loader importing en.json and ar.json
    ├── i18n-config.ts                  # Localization configuration defining 'en' and 'ar' locales
    ├── proxy.ts                        # Next.js 16 request interceptor for locale redirects and headers
    │
    ├── app/                            # Next.js App Router root
    │   ├── about.css                   # Styles for about page
    │   ├── advertise.css               # Styles for advertise page
    │   ├── contact.css                 # Styles for contact page
    │   ├── favicon.ico                 # Application favicon
    │   ├── globals.css                 # Tailwind CSS v4 entrypoint and base theme variables
    │   ├── landing.css                 # Styles for landing page
    │   └── [lang]/                     # Dynamic locale segment wrapping all application routes
    │       ├── layout.tsx              # Root HTML/Body layout with fonts, theme, and smooth scroll
    │       ├── page.tsx                # Landing page route (/:lang)
    │       ├── (auth)/                 # Route group for authentication pages
    │       │   ├── auth.css            # Deprecated stylesheet with comment
    │       │   ├── layout.tsx          # Auth container layout
    │       │   ├── login/
    │       │   │   └── page.tsx        # Login route (/:lang/login)
    │       │   ├── reset-password/
    │       │   │   └── page.tsx        # Password reset route (/:lang/reset-password)
    │       │   └── signup/
    │       │       ├── page.tsx        # Signup route (/:lang/signup)
    │       │       └── SignupFormClient.tsx # Client-side 3-step registration form
    │       ├── (dashboard)/            # Route group for dashboard pages
    │       │   ├── layout.tsx          # Dashboard layout mounting Sidebar and Navbar
    │       │   ├── advertiser/
    │       │   │   └── page.tsx        # Advertiser dashboard route (/:lang/advertiser)
    │       │   └── vendor/
    │       │       └── page.tsx        # Vendor dashboard route (/:lang/vendor)
    │       ├── about/
    │       │   └── page.tsx            # About page route (/:lang/about)
    │       ├── advertise/
    │       │   └── page.tsx            # Advertise page route (/:lang/advertise)
    │       ├── contact/
    │       │   └── page.tsx            # Contact page route (/:lang/contact)
    │       ├── design-system/
    │       │   └── page.tsx            # Design system documentation route (/:lang/design-system)
    │       └── join-us/
    │           └── page.tsx            # Join us page route (/:lang/join-us)
    │
    ├── components/                     # React components
    │   ├── DesignSystem.tsx            # Comprehensive design system interactive showcase component
    │   ├── advertise/                  # Components specific to the advertise route
    │   │   ├── AiCarouselSection.tsx
    │   │   └── FeatureBentoGrid.tsx
    │   ├── common/                     # Cross-page shared sections and provider wrappers
    │   │   ├── FaqSection.tsx
    │   │   ├── FeaturesSection.tsx
    │   │   ├── HeroVisual.tsx
    │   │   ├── LandingAnimations.tsx
    │   │   ├── LanguageToggle.tsx
    │   │   ├── NewsSection.tsx
    │   │   ├── SmoothScroll.tsx
    │   │   ├── TestimonialsSection.tsx
    │   │   └── ThemeProvider.tsx
    │   ├── contact/                    # Components specific to the contact route
    │   │   ├── ContactCardsGrid.tsx
    │   │   ├── ContactForm.tsx
    │   │   ├── ContactHero.tsx
    │   │   └── NewsletterSection.tsx
    │   ├── dashboard/                  # Components for vendor and advertiser dashboard views
    │   │   ├── Navbar.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── advertiser/
    │   │   │   └── AdvertiserDashboardClient.tsx
    │   │   └── vendor/
    │   │       └── VendorDashboardClient.tsx
    │   ├── join-us/                    # Components specific to the join-us route
    │   │   ├── BentoShowcaseSection.tsx
    │   │   ├── JoinUsHero.tsx
    │   │   ├── OpportunitiesSection.tsx
    │   │   └── PlatformFeaturesSection.tsx
    │   ├── layout/                     # Application structural components
    │   │   ├── Footer.tsx
    │   │   ├── Header.tsx
    │   │   └── LandingHeader.tsx
    │   └── ui/                         # Reusable UI component library primitives
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── DataTable.tsx
    │       ├── DropdownMenu.tsx
    │       ├── Input.tsx
    │       ├── MobileTabDropdown.tsx
    │       ├── Modal.tsx
    │       ├── ThemeToggle.tsx
    │       └── Tooltip.tsx
    │
    ├── dictionaries/                   # Static localized JSON strings
    │   ├── ar.json                     # Arabic localization dictionary
    │   └── en.json                     # English localization dictionary
    │
    └── fonts/                          # OTF font files loaded via next/font/local in RootLayout
        ├── Lufga-Bold.otf
        ├── Lufga-Light.otf
        ├── Lufga-Medium.otf
        ├── Lufga-Regular.otf
        └── Lufga-SemiBold.otf
```

### Top-Level Folder Explanations (Inferred from Real Contents)

- **`lufga-www.Dfonts.org`**: Contains 18 OpenType font files (`.otf`) representing the full Lufga font family (Black, Bold, ExtraBold, ExtraLight, Italic, Light, Medium, Regular, SemiBold, Thin, and italic variants), downloaded from Dfonts.org.
- **`mockups`**: Contains a single standalone HTML file (`landing.html`) containing raw mockup markup.
- **`public`**: Contains all static assets served directly at the web root, including standard Next.js SVG icons (`next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg`), brand assets (`logo.png`, `join-background.jpg`), component graphics (`public/assets/`), duplicated font files (`public/fonts/`), and categorized media (`public/images/`).
- **`src`**: Contains all application source code, including routing, components, localization files, fonts, and middleware/proxy interceptors.

---

## 2. Actual Routing Setup

The application uses the Next.js App Router located under `src/app/`. There is no `pages/` directory.

### Routes Inventory

Every page route is wrapped by the dynamic segment `[lang]` (`en` or `ar`).

| URL Route | File Path | Route Group | Dedicated Layout |
| :--- | :--- | :--- | :--- |
| `/:lang` | `src/app/[lang]/page.tsx` | None | No (uses `[lang]/layout.tsx`) |
| `/:lang/login` | `src/app/[lang]/(auth)/login/page.tsx` | `(auth)` | Yes (`src/app/[lang]/(auth)/layout.tsx`) |
| `/:lang/reset-password` | `src/app/[lang]/(auth)/reset-password/page.tsx` | `(auth)` | Yes (`src/app/[lang]/(auth)/layout.tsx`) |
| `/:lang/signup` | `src/app/[lang]/(auth)/signup/page.tsx` | `(auth)` | Yes (`src/app/[lang]/(auth)/layout.tsx`) |
| `/:lang/advertiser` | `src/app/[lang]/(dashboard)/advertiser/page.tsx` | `(dashboard)` | Yes (`src/app/[lang]/(dashboard)/layout.tsx`) |
| `/:lang/vendor` | `src/app/[lang]/(dashboard)/vendor/page.tsx` | `(dashboard)` | Yes (`src/app/[lang]/(dashboard)/layout.tsx`) |
| `/:lang/about` | `src/app/[lang]/about/page.tsx` | None | No (uses `[lang]/layout.tsx`) |
| `/:lang/advertise` | `src/app/[lang]/advertise/page.tsx` | None | No (uses `[lang]/layout.tsx`) |
| `/:lang/contact` | `src/app/[lang]/contact/page.tsx` | None | No (uses `[lang]/layout.tsx`) |
| `/:lang/design-system` | `src/app/[lang]/design-system/page.tsx` | None | No (uses `[lang]/layout.tsx`) |
| `/:lang/join-us` | `src/app/[lang]/join-us/page.tsx` | None | No (uses `[lang]/layout.tsx`) |

### Layout Hierarchy

1. **Root Layout**: `src/app/[lang]/layout.tsx` (Lines 83–112)
   - Wraps all routes in `<html>` and `<body>` tags.
   - Sets `lang` and `dir` attributes based on `params.lang` (`'ar' ? 'rtl' : 'ltr'`).
   - Imports local font `Lufga` and Google fonts `Geist_Mono` and `Cairo`.
   - Imports CSS files: `globals.css`, `landing.css`, `about.css`, `advertise.css`, `contact.css`.
   - Wraps children in `ThemeProvider` and `SmoothScroll`.

2. **Auth Layout**: `src/app/[lang]/(auth)/layout.tsx` (Lines 3–13)
   - Wraps routes inside `(auth)`: `login`, `reset-password`, `signup`.
   - Applies layout styling: `<div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100 dark:bg-black ...">`.

3. **Dashboard Layout**: `src/app/[lang]/(dashboard)/layout.tsx` (Lines 7–42)
   - Wraps routes inside `(dashboard)`: `advertiser`, `vendor`.
   - Mounts `<Sidebar dict={dict} lang={lang} />` (Line 22) inside a fixed sticky container.
   - Mounts `<Navbar lang={lang} dict={dict} />` (Line 31) inside a sticky top container.
   - Renders `{props.children}` inside the scrollable main area (Line 37).

### Middleware and Interceptors

- No `middleware.ts` file exists in the repository.
- Next.js 16 proxy convention is implemented in `src/proxy.ts`:
  - **Function**: `export function proxy(request: NextRequest)` (`src/proxy.ts`, Lines 21–54).
  - **Matcher**: `src/proxy.ts`, Lines 56–58:
    `matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|otf)$).*)']`
  - **Locale Check & Redirect**: Checks if the URL pathname is missing a locale prefix (`src/proxy.ts`, Lines 24–26). If missing, matches language using `Negotiator` and `@formatjs/intl-localematcher` against `i18n.locales` (`['en', 'ar']`) and executes `NextResponse.redirect` to `/${locale}${pathname}` (`src/proxy.ts`, Lines 30–34).
  - **Security Headers**: Sets response headers on all matched requests (`src/proxy.ts`, Lines 39–51):
    - `X-DNS-Prefetch-Control`: `on`
    - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
    - `X-XSS-Protection`: `1; mode=block`
    - `X-Frame-Options`: `SAMEORIGIN`
    - `X-Content-Type-Options`: `nosniff`
    - `Referrer-Policy`: `origin-when-cross-origin`

### Authentication and Route Checks

- **Global Route Protection**: Not found. `src/proxy.ts` does not inspect cookies, authorization headers, or session tokens.
- **Layout Route Protection**: Not found. Neither `src/app/[lang]/(dashboard)/layout.tsx` nor `src/app/[lang]/(auth)/layout.tsx` performs session checks or redirects.
- **Page Route Protection**: Not found. Neither `src/app/[lang]/(dashboard)/advertiser/page.tsx` nor `src/app/[lang]/(dashboard)/vendor/page.tsx` performs session checks or redirects.

---

## 3. Role System Implementation

### How Roles Are Determined

1. **Role Definition**:
   - Roles are represented as string literals `"advertiser"` and `"vendor"`.
   - There is no database table, ORM schema, or TypeScript `enum` defining roles.

2. **Role Selection**:
   - Role selection occurs in the client-side signup form: `src/app/[lang]/(auth)/signup/SignupFormClient.tsx`.
   - Step 3 of the registration wizard displays two selectable options (Lines 274–328):
     - Advertiser: Sets state `formData.role` to `"advertiser"`.
     - Vendor: Sets state `formData.role` to `"vendor"`.

3. **Role Persistence**:
   - On form submit (`src/app/[lang]/(auth)/signup/SignupFormClient.tsx`, Lines 70–80), the selected role and user profile are serialized into browser `localStorage`:
     ```ts
     // src/app/[lang]/(auth)/signup/SignupFormClient.tsx:73-77
     localStorage.setItem("diwrapp_user", JSON.stringify({
       name: formData.name,
       email: formData.email,
       role: formData.role
     }));
     ```
   - The user is redirected via Next.js client router: `router.push('/' + lang + '/' + formData.role)` (Line 78).

### Where Role Checks Happen

- **Server-Side Route Checks**: Not found. No server-side checks verify if an incoming request to `/:lang/advertiser` or `/:lang/vendor` has the corresponding role.
- **Client-Side Component Checks**:
  1. `src/components/dashboard/Sidebar.tsx` (Line 26):
     - Evaluates current URL pathname:
       ```ts
       const isAdvertiser = pathname?.includes('/advertiser');
       const roleName = isAdvertiser ? dict.dashboard.sidebar.advertiser || "Advertiser" : dict.dashboard.sidebar.vendor || "Vendor";
       const userFallback = isAdvertiser ? "Ahmed Helal" : dict.dashboard.vendor.fallbackName;
       ```
     - Switches navigation links between `advertiserNavItems` and `vendorNavItems` based on `isAdvertiser` (Line 68).
     - Reads `localStorage.getItem("diwrapp_user")` (Line 33) to extract `user.name` for the profile label. It does not check `user.role`.
  2. `src/components/dashboard/Navbar.tsx` (Line 17):
     - Evaluates current URL pathname:
       ```ts
       const isAdvertiser = pathname?.includes('/advertiser');
       ```
     - Switches notification list between `advertiserNotifications` and `vendorNotifications` based on `isAdvertiser` (Line 31).
  3. `src/components/dashboard/advertiser/AdvertiserDashboardClient.tsx` (Lines 30–38):
     - Reads `localStorage.getItem("diwrapp_user")` and calls `setUserName(user.name)`. It does not check `user.role`.
  4. `src/components/dashboard/vendor/VendorDashboardClient.tsx` (Lines 43–51):
     - Reads `localStorage.getItem("diwrapp_user")` and calls `setUserName(user.name)`. It does not check `user.role`.

### Duplicated Role Logic Observation

- The check `pathname?.includes('/advertiser')` appears identically in 2 files:
  - `src/components/dashboard/Sidebar.tsx` (Line 26)
  - `src/components/dashboard/Navbar.tsx` (Line 17)
- The retrieval of `localStorage.getItem("diwrapp_user")` appears identically in 3 files:
  - `src/components/dashboard/Sidebar.tsx` (Lines 33–41)
  - `src/components/dashboard/advertiser/AdvertiserDashboardClient.tsx` (Lines 30–38)
  - `src/components/dashboard/vendor/VendorDashboardClient.tsx` (Lines 43–51)

---

## 4. Component Audit

### Component Folder Inventory

- `src/components/` (Root component: `DesignSystem.tsx`)
- `src/components/advertise/` (2 components)
- `src/components/common/` (9 components)
- `src/components/contact/` (4 components)
- `src/components/dashboard/` (2 root dashboard components, 1 in `advertiser/`, 1 in `vendor/`)
- `src/components/join-us/` (4 components)
- `src/components/layout/` (3 components)
- `src/components/ui/` (9 components)
- `src/app/[lang]/(auth)/signup/` (1 co-located client form component)

### Shared Components (Imported in More Than One File)

| Component Path | Usage Count | Imported By |
| :--- | :--- | :--- |
| `src/components/ui/ThemeToggle.tsx` | 7 files | `src/app/[lang]/(auth)/login/page.tsx`<br>`src/app/[lang]/(auth)/reset-password/page.tsx`<br>`src/app/[lang]/(auth)/signup/page.tsx`<br>`src/components/DesignSystem.tsx`<br>`src/components/dashboard/Navbar.tsx`<br>`src/components/layout/Header.tsx`<br>`src/components/layout/LandingHeader.tsx` |
| `src/components/layout/Footer.tsx` | 6 files | `src/app/[lang]/page.tsx`<br>`src/app/[lang]/about/page.tsx`<br>`src/app/[lang]/advertise/page.tsx`<br>`src/app/[lang]/contact/page.tsx`<br>`src/app/[lang]/join-us/page.tsx`<br>`src/components/DesignSystem.tsx` |
| `src/components/layout/LandingHeader.tsx` | 5 files | `src/app/[lang]/page.tsx`<br>`src/app/[lang]/about/page.tsx`<br>`src/app/[lang]/advertise/page.tsx`<br>`src/app/[lang]/contact/page.tsx`<br>`src/app/[lang]/join-us/page.tsx` |
| `src/components/common/LanguageToggle.tsx` | 4 files | `src/app/[lang]/(auth)/login/page.tsx`<br>`src/app/[lang]/(auth)/reset-password/page.tsx`<br>`src/app/[lang]/(auth)/signup/page.tsx`<br>`src/components/dashboard/Navbar.tsx` |
| `src/components/ui/Input.tsx` | 3 files | `src/app/[lang]/(auth)/login/page.tsx`<br>`src/app/[lang]/(auth)/reset-password/page.tsx`<br>`src/app/[lang]/(auth)/signup/SignupFormClient.tsx` |

### Single-Use Components (Imported in Exactly One File)

| Component Path | Imported By |
| :--- | :--- |
| `src/app/[lang]/(auth)/signup/SignupFormClient.tsx` | `src/app/[lang]/(auth)/signup/page.tsx` |
| `src/components/DesignSystem.tsx` | `src/app/[lang]/design-system/page.tsx` |
| `src/components/advertise/AiCarouselSection.tsx` | `src/app/[lang]/advertise/page.tsx` |
| `src/components/advertise/FeatureBentoGrid.tsx` | `src/app/[lang]/advertise/page.tsx` |
| `src/components/common/FaqSection.tsx` | `src/app/[lang]/page.tsx` |
| `src/components/common/FeaturesSection.tsx` | `src/app/[lang]/page.tsx` |
| `src/components/common/HeroVisual.tsx` | `src/app/[lang]/page.tsx` |
| `src/components/common/LandingAnimations.tsx` | `src/app/[lang]/page.tsx` |
| `src/components/common/NewsSection.tsx` | `src/app/[lang]/page.tsx` |
| `src/components/common/SmoothScroll.tsx` | `src/app/[lang]/layout.tsx` |
| `src/components/common/TestimonialsSection.tsx` | `src/app/[lang]/about/page.tsx` |
| `src/components/common/ThemeProvider.tsx` | `src/app/[lang]/layout.tsx` |
| `src/components/contact/ContactCardsGrid.tsx` | `src/app/[lang]/contact/page.tsx` |
| `src/components/contact/ContactForm.tsx` | `src/app/[lang]/contact/page.tsx` |
| `src/components/contact/ContactHero.tsx` | `src/app/[lang]/contact/page.tsx` |
| `src/components/contact/NewsletterSection.tsx` | `src/app/[lang]/contact/page.tsx` |
| `src/components/dashboard/Navbar.tsx` | `src/app/[lang]/(dashboard)/layout.tsx` |
| `src/components/dashboard/Sidebar.tsx` | `src/app/[lang]/(dashboard)/layout.tsx` |
| `src/components/dashboard/advertiser/AdvertiserDashboardClient.tsx` | `src/app/[lang]/(dashboard)/advertiser/page.tsx` |
| `src/components/dashboard/vendor/VendorDashboardClient.tsx` | `src/app/[lang]/(dashboard)/vendor/page.tsx` |
| `src/components/join-us/BentoShowcaseSection.tsx` | `src/app/[lang]/join-us/page.tsx` |
| `src/components/join-us/JoinUsHero.tsx` | `src/app/[lang]/join-us/page.tsx` |
| `src/components/join-us/OpportunitiesSection.tsx` | `src/app/[lang]/join-us/page.tsx` |
| `src/components/join-us/PlatformFeaturesSection.tsx` | `src/app/[lang]/join-us/page.tsx` |
| `src/components/layout/Header.tsx` | `src/components/DesignSystem.tsx` |
| `src/components/ui/DataTable.tsx` | `src/components/DesignSystem.tsx` |
| `src/components/ui/DropdownMenu.tsx` | `src/components/DesignSystem.tsx` |
| `src/components/ui/MobileTabDropdown.tsx` | `src/components/DesignSystem.tsx` |
| `src/components/ui/Modal.tsx` | `src/components/DesignSystem.tsx` |
| `src/components/ui/Tooltip.tsx` | `src/components/DesignSystem.tsx` |

### Unused Components (Imported in 0 Files)

| Component Path | Description |
| :--- | :--- |
| `src/components/ui/Button.tsx` | Standalone polymorphic button component. Not imported by any file. |
| `src/components/ui/Card.tsx` | Standalone card component. Not imported by any file. |

---

## 5. Image and Asset Handling

### Storage Locations

1. **Project Root (`e:\Diwrapp\diwrapp\`)**:
   - `Vector.png` (2,452 bytes)
   - `Website (3).png` (389,740 bytes)
   - `Website (4).png` (170,254 bytes)
   - `Website 404.png` (409,345 bytes)
   - `image 80.png` (274,614 bytes)
   - `image.png` (8,042,714 bytes)

2. **`public/` (Root)**:
   - `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`
   - `join-background.jpg` (29,088 bytes)
   - `logo.png` (4,401 bytes)

3. **`public/assets/`**:
   - 29 files containing interface screenshots, decorative graphics, and mockups:
     `about-bus-stop-full.png`, `about-bus-stop.png`, `about-ipad.png`, `add-new.png`, `advertise-image.jpg`, `background-ai.jpg`, `background-ai.png`, `calendar-ui.png`, `calendar.png`, `campaign.png`, `dashboard.png`, `developer-ui.jpg`, `digital-door.png`, `Ellipse 58.png`, `fleet.png`, `frame.png`, `group-527.png`, `image-80.png`, `join-background.jpg`, `join-laptop.png`, `join-tablet.png`, `kingdom-tower.png`, `logo-icon-white.png`, `news-1.jpg`, `news-2.png`, `platform-tablet.png`, `random.png`, `table.png`, `tablet-image.png`, `vector.png`.

4. **`public/images/assets/coming-soon/`**:
   - `image 10.png`

5. **`public/images/campaigns/`**:
   - `downtown-billboard.jpg`, `highway-billboard.jpg`, `metro-display.jpg`

6. **`public/images/testimonials/`**:
   - 13 portrait images named `client-01.jpg` through `client-13.jpg`.
   - `README.md` defining grid position, suggested persona, aspect ratio (4:5), and size specifications (40KB–80KB).

7. **Font Storage Locations**:
   - `public/fonts/`: 5 files (`Lufga-Bold.otf`, `Lufga-Light.otf`, `Lufga-Medium.otf`, `Lufga-Regular.otf`, `Lufga-SemiBold.otf`).
   - `src/fonts/`: 5 files identical in name and size to `public/fonts/`.
   - `lufga-www.Dfonts.org/lufga_fonts/`: 18 files covering the full font family.

### Naming Patterns

No single naming pattern is enforced across the asset directories. The following patterns exist concurrently:
- **kebab-case**: `about-bus-stop.png`, `digital-door.png`, `kingdom-tower.png`, `downtown-billboard.jpg`, `client-01.jpg`.
- **kebab-case with numeric suffix**: `group-527.png`, `image-80.png`, `news-1.jpg`, `news-2.png`.
- **File names with spaces**: `image 80.png`, `image 10.png`, `Ellipse 58.png`, `Website (3).png`, `Website (4).png`, `Website 404.png`.
- **PascalCase**: `Vector.png`, `Website (3).png`.
- **Duplicate names across directories**:
  - `join-background.jpg` exists in both `public/` and `public/assets/`.
  - `Vector.png` exists in root, and `vector.png` exists in `public/assets/`.
  - `image 80.png` exists in root, and `image-80.png` exists in `public/assets/`.

### How Assets Are Referenced in Code

1. **Standard HTML `<img>` Tag (25 occurrences)**:
   - `src/app/[lang]/page.tsx`: Lines 52, 58, 64, 69, 74, 79, 85, 90, 168, 220, 224, 236.
   - `src/app/[lang]/about/page.tsx`: Lines 65, 72, 85, 89, 156.
   - `src/components/common/TestimonialsSection.tsx`: Line 167 (renders `src={imgSrc}` with state fallback).
   - `src/components/common/LanguageToggle.tsx`: Lines 54, 70 (renders flag URLs).
   - `src/components/DesignSystem.tsx`: Line 414 (renders avatar from external URL).

2. **Next.js `<Image>` Component (`next/image`) (19 occurrences)**:
   - `src/app/[lang]/(auth)/login/page.tsx`: Lines 52, 86 (`/logo.png`).
   - `src/app/[lang]/(auth)/reset-password/page.tsx`: Lines 52, 86 (`/logo.png`).
   - `src/app/[lang]/(auth)/signup/page.tsx`: Line 52 (`/logo.png`).
   - `src/app/[lang]/advertise/page.tsx`: Line 86 (`/assets/advertise-image.jpg` with `priority`).
   - `src/components/advertise/AiCarouselSection.tsx`: Line 104 (`slide.image`).
   - `src/components/advertise/FeatureBentoGrid.tsx`: Lines 41, 117 (`/assets/digital-door.png`, `/assets/campaign.png`).
   - `src/components/common/NewsSection.tsx`: Line 58 (`item.image`).
   - `src/components/dashboard/Navbar.tsx`: Line 202 (`/logo.png`).
   - `src/components/dashboard/Sidebar.tsx`: Line 76 (`/logo.png`).
   - `src/components/join-us/BentoShowcaseSection.tsx`: Line 113 (`/assets/platform-tablet.png`).
   - `src/components/join-us/JoinUsHero.tsx`: Line 31 (`/assets/join-laptop.png`).
   - `src/components/join-us/PlatformFeaturesSection.tsx`: Line 201 (`/assets/join-tablet.png`).
   - `src/components/layout/Footer.tsx`: Line 17 (`/logo.png`).
   - `src/components/layout/Header.tsx`: Line 26 (`/logo.png`).
   - `src/components/layout/LandingHeader.tsx`: Line 62 (`/logo.png`).
   - `src/components/DesignSystem.tsx`: Line 68 (`/logo.png`).

3. **External URLs**:
   - `https://flagcdn.com/w80/us.png` and `https://flagcdn.com/w80/sa.png`: in `src/components/common/LanguageToggle.tsx` (Lines 11, 17).
   - `https://ui-avatars.com/api/?name=John+Doe&background=1665ff&color=fff`: in `src/components/DesignSystem.tsx` (Line 414).
   - Unsplash image URLs: 13 fallback URLs listed in `CLIENT_PROFILES` array in `src/components/common/TestimonialsSection.tsx` (Lines 24, 32, 42, 50, 60, 68, 77, 85, 94, 103, 111, 128, 136).

---

## 6. State Management and Data Fetching

### Component Architecture Split

- **Client Components (19 files with `"use client"` / `'use client'`)**:
  - `src/app/[lang]/(auth)/signup/SignupFormClient.tsx`
  - `src/components/DesignSystem.tsx`
  - `src/components/advertise/AiCarouselSection.tsx`
  - `src/components/common/FaqSection.tsx`
  - `src/components/common/LandingAnimations.tsx`
  - `src/components/common/LanguageToggle.tsx`
  - `src/components/common/SmoothScroll.tsx`
  - `src/components/common/TestimonialsSection.tsx`
  - `src/components/common/ThemeProvider.tsx`
  - `src/components/contact/ContactForm.tsx`
  - `src/components/contact/NewsletterSection.tsx`
  - `src/components/dashboard/Navbar.tsx`
  - `src/components/dashboard/Sidebar.tsx`
  - `src/components/dashboard/advertiser/AdvertiserDashboardClient.tsx`
  - `src/components/dashboard/vendor/VendorDashboardClient.tsx`
  - `src/components/layout/Header.tsx`
  - `src/components/layout/LandingHeader.tsx`
  - `src/components/ui/Input.tsx`
  - `src/components/ui/ThemeToggle.tsx`

- **Server Components / Server Files (35 files)**:
  - All 11 `page.tsx` files.
  - All 3 `layout.tsx` files.
  - Components: `FeatureBentoGrid.tsx`, `FeaturesSection.tsx`, `HeroVisual.tsx`, `NewsSection.tsx`, `ContactCardsGrid.tsx`, `ContactHero.tsx`, `BentoShowcaseSection.tsx`, `JoinUsHero.tsx`, `OpportunitiesSection.tsx`, `PlatformFeaturesSection.tsx`, `Footer.tsx`, `Button.tsx`, `Card.tsx`, `DataTable.tsx`, `DropdownMenu.tsx`, `MobileTabDropdown.tsx`, `Modal.tsx`, `Tooltip.tsx`.
  - Utility/config files: `src/dictionaries.ts`, `src/i18n-config.ts`, `src/proxy.ts`.

### Data Fetching

1. **Server-Side Data Fetching**:
   - Static localization dictionary loader in `src/dictionaries.ts`:
     ```ts
     const dictionaries = {
       en: () => import('./dictionaries/en.json').then((module) => module.default),
       ar: () => import('./dictionaries/ar.json').then((module) => module.default),
     };
     export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
     ```
   - Page and layout server components invoke `await getDictionary(lang)` and forward dictionary sub-trees as props to child components.
   - External server-side `fetch()`: Not found.
   - Database connections (Prisma, Drizzle, Mongoose, etc.): Not found.
   - Next.js Server Actions (`'use server'`): Not found.

2. **Client-Side Data Fetching**:
   - `fetch()`: Not found anywhere in `src/`.
   - `axios`: Not installed, not found.
   - `@tanstack/react-query`: Not installed, not found.
   - `swr`: Not installed, not found.

### State Management

1. **React Local State (`useState`)**:
   - Form inputs and steps: `SignupFormClient.tsx` (`step`, `formData`, `errors`), `ContactForm.tsx` (`formData`, `isSubmitting`, `isSuccess`), `NewsletterSection.tsx` (`email`, `status`), `Input.tsx` (`showPassword`).
   - UI toggles and overlays: `Navbar.tsx` (`isNotifOpen`, `isMobile`, `notifications`), `Sidebar.tsx` (`isMobileOpen`), `LanguageToggle.tsx` (`isOpen`), `FaqSection.tsx` (`openFaq`), `AiCarouselSection.tsx` (`currentIndex`), `LandingHeader.tsx` (`isMenuOpen`), `Header.tsx` (`isMobileMenuOpen`), `ThemeToggle.tsx` (`mounted`), `DesignSystem.tsx` (modals, dropdowns, inputs, tabs).
   - Testimonial image fallback: `TestimonialsSection.tsx` (`imgSrc`).
   - Dashboard mock items: `VendorDashboardClient.tsx` (`activeFilter`, `openDropdownId`, `toastMessage`, `bookingRequests`), `AdvertiserDashboardClient.tsx` (`toastMessage`).

2. **Browser Storage (`localStorage`)**:
   - `localStorage.setItem("diwrapp_user", ...)` in `SignupFormClient.tsx` (Line 73).
   - `localStorage.getItem("diwrapp_user")` in `Sidebar.tsx` (Line 33), `AdvertiserDashboardClient.tsx` (Line 30), and `VendorDashboardClient.tsx` (Line 43).

3. **URL Search Parameters (`useSearchParams`)**:
   - `searchParams.get("tab")`: Used in `Sidebar.tsx` (Line 23), `AdvertiserDashboardClient.tsx` (Line 12), and `VendorDashboardClient.tsx` (Line 13) to switch active dashboard views (`overview`, `campaigns`, `listings`, etc.).

4. **Custom DOM Events**:
   - `toggleSidebar`: Dispatched by `Navbar.tsx` (Line 193) via `document.dispatchEvent(new CustomEvent('toggleSidebar'))` and listened to in `Sidebar.tsx` (Line 46).
   - `showGlobalToast`: Dispatched by `Sidebar.tsx` (Line 121) and listened to in `AdvertiserDashboardClient.tsx` (Line 25) and `VendorDashboardClient.tsx` (Line 33).

5. **React Context**:
   - `createContext` / `useContext`: Not implemented in custom application code.
   - `ThemeProvider` (`src/components/common/ThemeProvider.tsx`): Wraps `next-themes` `ThemeProvider` at the root layout (`src/app/[lang]/layout.tsx`, Line 101) to manage light/dark theme classes.

---

## 7. Observed Inconsistencies and Conflicts

- **Observed**: In `src/components/dashboard/Sidebar.tsx` (Line 74), the brand logo link hardcodes `href={'/' + lang + '/vendor'}` unconditionally, even when `isAdvertiser` is true and the user is viewing the advertiser dashboard.
- **Observed**: In `src/components/dashboard/Navbar.tsx` (Line 200), the mobile brand logo link hardcodes `href={'/' + lang + '/vendor'}` unconditionally, even when `isAdvertiser` is true.
- **Observed**: In `src/components/layout/LandingHeader.tsx` (Line 96), the "Sign In" action uses an HTML `<a>` tag (`<a href={'/' + lang + '/login'} className="btn-sign-in ...">`), whereas all other navigation items in the same component use Next.js `<Link>`.
- **Observed**: In `src/components/layout/Header.tsx`, navigation links (Lines 13–17), logo link (Line 24), and language switch link (Line 60) are hardcoded to `href="#"`, whereas `src/components/layout/LandingHeader.tsx` binds navigation links to active routes and dynamically generates `targetLangHref`.
- **Observed**: `src/components/layout/Header.tsx` hardcodes all UI labels in English ("About us", "Advertise", "Blog", "Join us", "Contact us", "Sign In", "عربي") and is only imported inside `src/components/DesignSystem.tsx`, whereas all public marketing pages import `src/components/layout/LandingHeader.tsx`.
- **Observed**: Reusable components `Button.tsx` (`src/components/ui/Button.tsx`) and `Card.tsx` (`src/components/ui/Card.tsx`) are defined in the UI library but are not imported or used anywhere in the codebase. Pages and components, including `src/components/DesignSystem.tsx`, declare `<button>` and `<div>` tags directly with inline Tailwind CSS classes.
- **Observed**: Components `DataTable.tsx`, `DropdownMenu.tsx`, `MobileTabDropdown.tsx`, `Modal.tsx`, and `Tooltip.tsx` located in `src/components/ui/` are imported solely by `src/components/DesignSystem.tsx` and do not appear in any production application routes (such as the vendor or advertiser dashboards).
- **Observed**: In `src/app/[lang]/about/page.tsx`, links are defined to routes that do not exist in the project: `/${lang}/marketplace` (Line 169), `/${lang}/commercial-models` (Line 214), and `/${lang}/booking` (Line 232).
- **Observed**: In `src/app/[lang]/advertise/page.tsx` (Line 136), a link is defined with a query parameter `/${lang}/signup?role=advertiser`, but `src/app/[lang]/(auth)/signup/SignupFormClient.tsx` does not inspect `useSearchParams` or read URL query parameters, defaulting `formData.role` to `""`.
- **Observed**: In `src/components/layout/LandingHeader.tsx` (Line 27), the "Blog" navigation item points to `/${lang}#blog` or `#blog`, but `src/app/[lang]/page.tsx` contains no element with `id="blog"`. The news component (`src/components/common/NewsSection.tsx`) renders without an `id` attribute.
- **Observed**: `src/components/common/HeroVisual.tsx` renders an empty `<section>` tag containing only a comment `/* Dashboard migrated to page.tsx absolute layers */`, but it remains imported and mounted in `src/app/[lang]/page.tsx` (Line 116).
- **Observed**: In `src/components/common/NewsSection.tsx` and `src/components/common/FeaturesSection.tsx`, all text strings are hardcoded in English, whereas other sections on `src/app/[lang]/page.tsx` load localized strings from the dictionary object (`dict.landing`).
- **Observed**: In `src/components/dashboard/Sidebar.tsx` (Line 28), the fallback username for an advertiser is hardcoded as `"Ahmed Helal"`, whereas the fallback username for a vendor is loaded from the dictionary (`dict.dashboard.vendor.fallbackName`).
- **Observed**: Images across the codebase are rendered using two separate mechanisms without a single pattern: 25 occurrences use standard HTML `<img>` tags (e.g. `src/app/[lang]/page.tsx`, `src/app/[lang]/about/page.tsx`), while 19 occurrences use Next.js `<Image>` from `next/image` (e.g. `src/app/[lang]/advertise/page.tsx`, `src/components/common/NewsSection.tsx`, `src/components/dashboard/Navbar.tsx`).
- **Observed**: Country flag graphics are handled through two different implementations: `src/components/common/LanguageToggle.tsx` loads external PNGs from `https://flagcdn.com/`, while `src/components/contact/ContactForm.tsx` defines and renders flags as inline SVG components (`UsFlag`).
- **Observed**: Duplicate image assets exist across directories:
  - `public/join-background.jpg` (29,088 bytes) and `public/assets/join-background.jpg` (29,088 bytes) have identical content.
  - Root file `image 80.png` (274,614 bytes) and `public/assets/image-80.png` (274,614 bytes) have identical byte sizes.
  - Root file `Vector.png` (2,452 bytes) and `public/assets/vector.png` (2,452 bytes) have identical byte sizes.
- **Observed**: Font files for Lufga exist in three separate directories: `public/fonts/` (5 files), `src/fonts/` (5 files), and `lufga-www.Dfonts.org/lufga_fonts/` (18 files). `src/app/[lang]/layout.tsx` (Lines 17–37) references font files exclusively from `../../fonts/` (resolving to `src/fonts/`).
- **Observed**: 6 loose image files (`image.png`, `image 80.png`, `Vector.png`, `Website (3).png`, `Website (4).png`, `Website 404.png`), 4 Python scripts (`find_history.py`, `recover.py`, `recover_all.py`, `recover_old.py`), and 1 PowerShell script (`sample_colors2.ps1`) reside in the root repository directory outside of `public/` or `src/`.
- **Observed**: `next.config.ts` (Line 5) specifies `transpilePackages: ['recharts', 'es-toolkit']`, but `recharts` is not declared in `package.json` dependencies or devDependencies, and is not imported in any file in `src/`.
- **Observed**: In `src/app/[lang]/layout.tsx` (Lines 5–8), route-specific stylesheets (`landing.css`, `about.css`, `advertise.css`, `contact.css`) are imported into the root layout, applying their styles across all routes.
- **Observed**: `src/app/[lang]/(auth)/auth.css` contains a comment `/* Deprecated. Use Design System components instead. */` and is not imported by `src/app/[lang]/(auth)/layout.tsx` or any auth route file.
- **Observed**: Neither `src/app/[lang]/(dashboard)/advertiser/page.tsx` nor `src/app/[lang]/(dashboard)/vendor/page.tsx` implements authentication checks or role verification. The active dashboard view and role display in `Sidebar.tsx` and `Navbar.tsx` are derived from checking `pathname?.includes('/advertiser')`.
