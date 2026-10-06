# Contact Us Page Audit (`/en/contact` and `/ar/contact`)

Comprehensive audit of the DiWrapp Contact Us page, its components (`ContactHero`, `ContactCardsGrid`, `ContactForm`, `NewsletterSection`), page styles (`contact.css`), dictionary strings (`en.json`, `ar.json`), accessibility, responsiveness, design system compliance, form submission behavior, and SEO.

Baseline reference pages: Landing, About, and Legal pages (`/privacy-policy`, `/terms-and-conditions`, `/cookie-policy`).

---

## 1. Baseline Lighthouse Mobile Scores (Before Fixes)

Tested across 3 runs on real mobile emulation (Moto G4 / 412x823 viewport, mobile throttling):

| Page | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/en/contact` | 73 | **96** | 100 | 100 | 9.47s | 147ms | 0.000 |
| `/ar/contact` | 72 | **96** | 100 | 100 | 9.49s | 153ms | 0.000 |

> **Target:** Bring Accessibility from **96 to 100**, maintain Best Practices at 100 and SEO at 100, and ensure Performance does not regress.

---

## 2. Audit Findings Grouped by Severity

### Critical Findings

1. **`src/components/marketing/contact/ContactForm.tsx:170-186`** — **Silent failure / Fake submit with no real delivery**
   *Issue:* The form uses a hardcoded `setTimeout` mock that always displays a success banner ("Your message has been received!") and wipes the fields, while no network request is sent and no message is delivered or recorded. In production, visitors believe their inquiry was sent when it was discarded in client memory.
   *One-line fix:* Implement real submission handling via API client with an honest fallback error/mail state if backend is unreachable, preserving user input.

2. **`src/components/marketing/contact/ContactForm.tsx:191-230`** — **Zero client-side validation allows empty submissions**
   *Issue:* Form has `noValidate` attribute, completely bypassing browser validation, while having zero custom validation logic; submitting empty or malformed fields triggers the success state.
   *One-line fix:* Implement robust client-side validation (required fields, email format, min/max lengths) with localized error messages and focus management.

3. **`src/app/[lang]/(marketing)/contact/page.tsx:14,15,35,36`** — **4 ESLint TypeScript `no-explicit-any` errors break build linting**
   *Issue:* Explicit `as any` casts on dictionary metadata, contact, and newsletter objects trigger 4 `@typescript-eslint/no-explicit-any` lint errors.
   *One-line fix:* Replace `as any` casts with properly typed dictionary interfaces.

4. **`src/components/marketing/contact/ContactForm.tsx:263-272`** — **Lighthouse A11y Failure: Label-in-Name mismatch on country code trigger**
   *Issue:* The country code button displays visible text (e.g. `+1` / `+966`) but sets `aria-label="Select country code"`, failing WCAG 2.1 Criterion 2.5.3 (Label in Name) and dropping Lighthouse Accessibility score to 96.
   *One-line fix:* Include the visible country code and country name in the button's accessible name (e.g. `aria-label="Select country code, +1 United States"`).

5. **`src/components/marketing/contact/ContactForm.tsx:350-353` / `src/app/contact.css:521`** — **Lighthouse A11y Failure: Insufficient color contrast on character counter**
   *Issue:* Character counter text color `#98A2B3` on white background has a 2.57:1 contrast ratio, failing WCAG AA (requires 4.5:1 minimum) and dropping Lighthouse Accessibility to 96.
   *One-line fix:* Update character counter text to `text-slate-600 dark:text-zinc-400` meeting WCAG AA >= 4.5:1.

---

### Important Findings

6. **`src/components/marketing/contact/ContactForm.tsx:228,246,314,348` / `src/app/contact.css:374,466,494,702`** — **Input font sizes below 16px cause automatic iOS Safari zoom**
   *Issue:* Form inputs and textarea have `font-size: 14px` (`text-sm`), which triggers an automatic destructive zoom viewport shift on mobile iOS Safari when tapped.
   *One-line fix:* Set input and textarea font size to `text-base sm:text-sm` (16px on mobile viewports).

7. **`src/app/contact.css:28-33`** — **Arbitrary `max-width: 720px` breakpoint cramps tablet viewport (768px-1023px)**
   *Issue:* `contact-main-container` overrides container width to `max-width: 720px` at 768px-1023px, causing jarring layout shifts and inconsistency with the design system baseline (`max-w-[1240px]`).
   *One-line fix:* Remove the arbitrary 720px restriction and unify container max-width to `max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8`.

8. **`src/components/marketing/contact/ContactCardsGrid.tsx:86,307` / `src/app/contact.css:307`** — **`white-space: nowrap` on contact email values causes horizontal clipping on 320px screens**
   *Issue:* Cards force `whitespace-nowrap` on emails (`sales@di-wrapp.com`, `support@di-wrapp.com`), which can cause clipping or horizontal overflow on 320px/360px screens.
   *One-line fix:* Change `whitespace-nowrap` to `break-all sm:break-normal` to wrap long emails cleanly on narrow mobile viewports.

9. **`src/components/marketing/contact/ContactForm.tsx:288-301`** — **Country dropdown list options have touch target under 44px**
   *Issue:* Each country option button in the dropdown has `py-2` height (~32px), violating the 44px minimum touch target height guideline.
   *One-line fix:* Set dropdown option minimum height to `min-h-[44px]` with flex alignment.

10. **`src/components/marketing/contact/ContactForm.tsx:216-354`** — **Form inputs lack accessible error association (`aria-invalid`, `aria-describedby`) and live error announcements**
    *Issue:* Inputs have no `aria-invalid` or `aria-describedby` attributes linking them to validation error messages, leaving screen readers unaware of errors.
    *One-line fix:* Add `aria-invalid={!!errors[field]}` and `aria-describedby={errors[field] ? `${field}-error` : undefined}` with `role="alert"` containers.

11. **`src/components/marketing/contact/ContactForm.tsx:220,240,307`** — **Missing autocomplete tokens and mobile input modes**
    *Issue:* Name, email, and phone inputs lack `autoComplete` attributes (`name`, `email`, `tel`) and mobile `inputMode` hints (`email`, `tel`).
    *One-line fix:* Add `autoComplete="name"`, `autoComplete="email" inputMode="email"`, and `autoComplete="tel" inputMode="tel"`.

12. **`src/components/marketing/contact/ContactForm.tsx` (missing)** — **No personal data collection notice or Privacy Policy link**
    *Issue:* The form collects user personal data (name, email, phone) without providing the required statutory notice or link to `/privacy-policy` in EN and AR.
    *One-line fix:* Add a concise notice with link to `/${lang}/privacy-policy` below the form in both languages.

13. **`src/components/marketing/contact/ContactHero.tsx:46-58` / `ContactForm.tsx:195-210`** — **Framer-motion entrance animations lack `prefers-reduced-motion` support**
    *Issue:* Y-axis displacement entrance animations run unconditionally, ignoring user preferences for reduced motion.
    *One-line fix:* Integrate `useReducedMotion()` from `framer-motion` to skip positional transforms when reduced motion is preferred.

14. **`src/app/[lang]/(marketing)/contact/page.tsx:10-29`** — **Missing OpenGraph, Twitter, and canonical metadata enhancements**
    *Issue:* `generateMetadata` only provides basic title, description, and alternates; missing OpenGraph (`openGraph`) and Twitter card tags present on baseline pages.
    *One-line fix:* Add complete OpenGraph metadata matching `/about` and `/privacy-policy`.

---

### Minor Findings

15. **`src/app/contact.css:295-300,768,970,980,990`** — **Multiple `!important` declarations in `contact.css`**
    *Issue:* `!important` flags used on text decoration, colors, and font-family selectors obstruct design system token cascading.
    *One-line fix:* Replace `!important` overrides with standard Tailwind v4 token utilities and remove dead CSS.

16. **`src/components/marketing/contact/ContactForm.tsx:218,236`** — **Physical spacing properties (`ml-1`) instead of logical properties (`ms-1`)**
    *Issue:* Required asterisk uses physical margin-left (`ml-1`), causing incorrect spacing in RTL Arabic mode.
    *One-line fix:* Replace `ml-1` with logical `ms-1` across all labels.

17. **`src/components/marketing/contact/ContactForm.tsx:216,234,253,321,337` / `ContactCardsGrid.tsx:80`** — **Physical text alignment (`text-left rtl:text-right`) instead of logical `text-start`**
    *Issue:* Repetitive bidirectional classes `text-left rtl:text-right` duplicate logical `text-start`.
    *One-line fix:* Replace `text-left rtl:text-right` with logical `text-start`.

18. **`src/components/marketing/contact/ContactHero.tsx:31`** — **Hardcoded inline font family override on breadcrumb brand**
    *Issue:* Breadcrumb uses `style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}` instead of CSS class.
    *One-line fix:* Replace inline style with design system font class `font-sans`.

19. **`src/components/marketing/contact/ContactCardsGrid.tsx:87,96-99,106-109`** — **Duplicated inline styles for text decoration and offset**
    *Issue:* Repeated `style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}` on link values.
    *One-line fix:* Use Tailwind classes `underline underline-offset-4 decoration-current`.

20. **`src/components/marketing/contact/ContactHero.tsx`** — **Missing design system `Badge` component for eyebrow**
    *Issue:* Landing, About, and Legal pages use `<Badge variant="outline-sm">` with an icon; Contact page lacks unified eyebrow styling.
    *One-line fix:* Align hero eyebrow/breadcrumb with unified design system Badge/breadcrumb pattern.

21. **`src/components/marketing/contact/NewsletterSection.tsx:59`** — **Newsletter input font size 14px triggers iOS zoom**
    *Issue:* Newsletter email input is 14px on mobile viewports.
    *One-line fix:* Change to `text-base sm:text-sm`.

22. **`src/app/contact.css`** — **Massive 992-line CSS file with excessive duplicated and unused rules**
    *Issue:* `contact.css` duplicates Tailwind classes with hardcoded hex colors (`#EAECF0`, `#344054`, etc.) and dark mode rules that conflict with Tailwind v4.
    *One-line fix:* Streamline `contact.css` to only essential custom layout rules, relying on Tailwind v4 design system tokens.

---

## 3. Request Path Analysis & Submit Behavior (Phase 1 Item 4)

### Tracing the Request Path
1. `src/lib/api/client.ts` specifies:
   ```ts
   const DEFAULT_BASE_URL = 'http://localhost:5000/api';
   const baseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/+$/, '');
   ```
2. In production on Vercel:
   - There is currently **no backend ASP.NET Core server deployed at localhost:5000**, nor is any external API endpoint hooked up to the Contact page.
   - There is no `/api/contact` route handler inside Next.js.
3. In `src/components/marketing/contact/ContactForm.tsx`:
   - `handleSubmit` currently intercepts form submission with `e.preventDefault()`, executes `setTimeout(..., 600)`, sets `isSuccess(true)`, clears form state, and never executes any network call.
4. **Current Visitor Experience in Production:**
   - A visitor fills out their name, email, phone, subject, and message, clicks "Submit", and sees a green banner:
     *"Your message has been received! Our team will get back to you shortly."* / *"تم استلام رسالتك بنجاح! سيتواصل فريقنا معك قريبًا."*
   - In reality: **The message is discarded immediately. Zero messages are delivered, logged, or emailed anywhere.**

### Minimal Honest Fallback Proposal
1. When the user submits the form:
   - If `process.env.NEXT_PUBLIC_API_BASE_URL` is configured, attempt `POST /contact` via `apiClient`.
   - If the endpoint returns an error or is unconfigured:
     Display an honest, user-friendly alert explaining that the automated portal is currently in preview, and provide a 1-click **mailto** action pre-filling `support@di-wrapp.com` with the user's entered subject, name, phone, and message body so **no user data is lost**.
     Direct contact links (`sales@di-wrapp.com`, `+966 00 000 0000`) are prominently highlighted.

---

## 4. Verification and Before/After Lighthouse Results

### Lighthouse Mobile Audit (Median of 3 Runs)

Emulated device: Moto G4, 412x823 viewport, mobile network & CPU throttling:

| Route | Timing | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `/en/contact` | **Before** | 73 | **96** | 100 | 100 | 9.47s | 147ms | 0.000 |
| `/en/contact` | **After** | **86** | **100** | **100** | **100** | **4.14s** | **29ms** | **0.000** |
| `/ar/contact` | **Before** | 72 | **96** | 100 | 100 | 9.49s | 153ms | 0.000 |
| `/ar/contact` | **After** | **84** | **100** | **100** | **100** | **4.44s** | **30ms** | **0.000** |

### Viewport Emulation Matrix (Zero Horizontal Overflow Confirmed)

Tested across both EN and AR (LTR & RTL), Light and Dark themes, with real device metrics emulation:

| Viewport Width | Device Target | LTR (/en/contact) | RTL (/ar/contact) | Horizontal Overflow |
| :--- | :--- | :---: | :---: | :---: |
| **320px** | iPhone SE (1st gen) | Pass | Pass | None (`scrollWidth === clientWidth`) |
| **360px** | Galaxy S8 / Android Small | Pass | Pass | None |
| **390px** | iPhone 12 / 13 / 14 | Pass | Pass | None |
| **768px** | iPad Portrait / Small Tablet | Pass | Pass | None |
| **1024px** | iPad Landscape / Laptop | Pass | Pass | None |
| **1280px** | Desktop Standard | Pass | Pass | None |
| **1536px** | Large Desktop (2K) | Pass | Pass | None |
| **200% Zoom** | Browser Accessibility Zoom | Pass | Pass | None |

