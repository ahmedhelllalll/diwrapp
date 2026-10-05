import React from 'react';
import Link from 'next/link';
import { HomeSimple, NavArrowRight, InfoCircle } from 'iconoir-react';
import { Badge } from '@/components/ui/Badge';
import { LegalDocument, LegalParagraph, Locale } from '@/content/legal/types';

export interface LegalArticleProps {
  lang: Locale;
  document: LegalDocument;
}

/**
 * Helper to render paragraph strings with high-visibility callouts
 * for any `[TO CONFIRM: ...]` placeholder flags.
 */
function renderParagraphContent(content: string, isRtl: boolean) {
  if (!content.includes('[TO CONFIRM:')) {
    return content;
  }

  const parts = content.split(/(\[TO CONFIRM:[^\]]+\])/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('[TO CONFIRM:')) {
          return (
            <mark
              key={idx}
              className="inline-block mx-1 my-0.5 px-2 py-0.5 rounded-md font-mono text-xs font-medium bg-amber-500/15 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/30 select-text"
              title={isRtl ? "بند مؤقت للمراجعة القانونية" : "Placeholder for legal review confirmation"}
            >
              {part}
            </mark>
          );
        }
        return part;
      })}
    </>
  );
}

/**
 * Pure React Server Component for rendering structured legal documents
 * (Privacy Policy, Terms & Conditions, Cookie Policy).
 *
 * Adheres strictly to:
 * - Help Center 2-column layout (content + sticky contact card)
 * - Design tokens from globals.css (zero hardcoded hex colors)
 * - Semantic HTML & accessibility (one H1, nav landmarks, 44px touch targets)
 * - CSS logical properties for bilingual LTR/RTL rendering
 * - Header clearance via scroll-mt-28 on anchor targets
 */
export default function LegalArticle({ lang, document }: LegalArticleProps) {
  const isRtl = lang === 'ar';
  const { category, title, intro, effectiveDate, lastUpdated, tableOfContentsTitle, sections, sidebar, relatedDocsTitle, relatedDocs } = document;

  return (
    <article className="w-full bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300">
      {/* Top spacing to clear fixed header (h-[72px]) + breathing room */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 sm:pb-24">
        
        {/* =================================================================
            1. BREADCRUMB NAVIGATION
           ================================================================= */}
        <nav
          aria-label={isRtl ? 'مسار التنقل' : 'Breadcrumb'}
          className="flex items-center gap-2 text-[13px] text-[var(--Text-text-tertiary)] flex-wrap mb-8"
        >
          <Link
            href={`/${lang}`}
            aria-label={isRtl ? 'الصفحة الرئيسية' : 'Homepage'}
            className="hover:text-[var(--foreground)] transition-colors inline-flex items-center justify-center p-1 rounded-sm focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <HomeSimple className="w-4 h-4 shrink-0" />
          </Link>
          <NavArrowRight className="w-3.5 h-3.5 rtl:rotate-180 shrink-0 text-[var(--card-border)]" aria-hidden="true" />
          <Link
            href={`/${lang}`}
            className="hover:text-[var(--foreground)] transition-colors"
          >
            DiWrapp
          </Link>
          <NavArrowRight className="w-3.5 h-3.5 rtl:rotate-180 shrink-0 text-[var(--card-border)]" aria-hidden="true" />
          <span className="text-[var(--Text-text-secondary)]">{category}</span>
          <NavArrowRight className="w-3.5 h-3.5 rtl:rotate-180 shrink-0 text-[var(--card-border)]" aria-hidden="true" />
          <span
            className="font-semibold text-[var(--heading)] truncate max-w-[220px] sm:max-w-none"
            aria-current="page"
          >
            {title}
          </span>
        </nav>

        {/* =================================================================
            2. ARTICLE HEADER (Category Badge, H1, Intro, Dates)
           ================================================================= */}
        <header className="max-w-[840px] mb-10">
          <Badge variant="outline-sm" className="mb-4">
            {category}
          </Badge>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[var(--heading)] tracking-tight leading-[1.2] mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--Text-text-secondary)] leading-relaxed mb-6 text-start">
            {intro}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-[13px] text-[var(--Text-text-tertiary)] pb-6 border-b border-[var(--card-border)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="font-medium text-[var(--Text-text-secondary)]">
                {isRtl ? 'تاريخ السريان:' : 'Effective Date:'}
              </span>
              <span>{effectiveDate}</span>
            </span>
            <span className="hidden sm:inline text-[var(--card-border)]" aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="font-medium text-[var(--Text-text-secondary)]">
                {isRtl ? 'آخر تحديث:' : 'Last Updated:'}
              </span>
              <span>{lastUpdated}</span>
            </span>
          </div>
        </header>

        {/* =================================================================
            3. TWO-COLUMN LAYOUT (Content ~65% / Sticky Sidebar ~35%)
           ================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Table of Contents & Article Sections
             ───────────────────────────────────────────────────────────── */}
          <main className="lg:col-span-8 w-full min-w-0">
            
            {/* Table of Contents ("In this article") */}
            <nav
              aria-label={isRtl ? 'جدول محتويات الوثيقة' : 'Table of contents'}
              className="mb-12 p-6 sm:p-7 rounded-[20px] bg-[var(--card-surface)] border border-[var(--card-border)] shadow-xs transition-colors"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--heading)] mb-4">
                {tableOfContentsTitle}
              </h2>
              <ul className="space-y-2.5 text-[14.5px]">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="inline-flex items-center text-[var(--brand)] hover:text-[var(--brand-strong)] underline underline-offset-4 font-medium transition-colors min-h-[44px] sm:min-h-0 py-1 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none rounded-sm"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Main Sections */}
            <div className="space-y-12">
              {sections.map((section, secIdx) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28"
                  aria-labelledby={`heading-${section.id}`}
                >
                  {secIdx > 0 && (
                    <hr className="border-t border-[var(--card-border)] mb-10" />
                  )}

                  <h2
                    id={`heading-${section.id}`}
                    className="text-xl sm:text-2xl font-bold text-[var(--heading)] tracking-tight mb-5"
                  >
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-[15px] sm:text-[16px] text-[var(--Text-text-secondary)] leading-relaxed text-start">
                    {section.paragraphs.map((p, pIdx) => {
                      if (typeof p === 'string') {
                        return (
                          <p key={pIdx}>
                            {renderParagraphContent(p, isRtl)}
                          </p>
                        );
                      }

                      const typedP = p as LegalParagraph;

                      return (
                        <div key={pIdx} className="space-y-3 pt-1">
                          {typedP.subheading && (
                            <h3 className="text-base sm:text-[17px] font-semibold text-[var(--heading)] pt-2">
                              {typedP.subheading}
                            </h3>
                          )}

                          {typedP.text && (
                            <p>{renderParagraphContent(typedP.text, isRtl)}</p>
                          )}

                          {typedP.paragraphs && typedP.paragraphs.map((subP, subIdx) => (
                            <p key={subIdx}>{renderParagraphContent(subP, isRtl)}</p>
                          ))}

                          {typedP.list && typedP.list.length > 0 && (
                            <ul className="list-disc ps-5 space-y-2.5 my-3 text-[14.5px] sm:text-[15.5px] marker:text-slate-400 dark:marker:text-zinc-600">
                              {typedP.list.map((item, itemIdx) => (
                                <li key={itemIdx} className="leading-relaxed">
                                  {renderParagraphContent(item, isRtl)}
                                </li>
                              ))}
                            </ul>
                          )}

                          {typedP.callout && (
                            <div className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--surface-2)] dark:bg-[var(--surface-3)] text-xs sm:text-sm text-[var(--Text-text-secondary)]">
                              {typedP.callout.text}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Mobile Contact Box (Only on small screens where sidebar collapses) */}
            <div className="block lg:hidden mt-12 p-6 rounded-[20px] bg-[var(--card-surface)] border border-[var(--card-border)] shadow-xs">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-[var(--brand)] dark:text-blue-400 flex items-center justify-center shrink-0 mb-3">
                <InfoCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--heading)] mb-2">
                {sidebar.title}
              </h3>
              <p className="text-[13.5px] text-[var(--Text-text-secondary)] leading-relaxed mb-5">
                {sidebar.description}
              </p>
              <Link
                href={`/${lang}${sidebar.buttonHref}`}
                className="w-full inline-flex items-center justify-center font-bold text-[14px] rounded-xl h-[44px] border-2 border-[var(--card-border)] hover:border-slate-400 dark:hover:border-zinc-700 bg-transparent text-[var(--heading)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                {sidebar.buttonText}
              </Link>
            </div>

            {/* =============================================================
                4. RELATED LEGAL DOCUMENTS
               ============================================================= */}
            {relatedDocs && relatedDocs.length > 0 && (
              <div className="mt-16 pt-10 border-t border-[var(--card-border)]">
                <h3 className="text-lg font-bold text-[var(--heading)] mb-6">
                  {relatedDocsTitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedDocs.map((rel) => (
                    <Link
                      key={rel.href}
                      href={`/${lang}${rel.href}`}
                      className="p-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-surface)] hover:border-[var(--brand)] hover:shadow-xs transition-all duration-200 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="font-bold text-[15px] text-[var(--heading)] group-hover:text-[var(--brand)] transition-colors flex items-center justify-between gap-2">
                          <span>{rel.title}</span>
                          <NavArrowRight className="w-4 h-4 rtl:rotate-180 text-[var(--brand)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </div>
                        <p className="text-[13px] text-[var(--Text-text-secondary)] mt-2 leading-relaxed">
                          {rel.description}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[var(--brand)] mt-4 inline-flex items-center gap-1">
                        {isRtl ? 'عرض الوثيقة ←' : 'Read Document →'}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </main>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Sticky Contact Card (Desktop)
             ───────────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="p-7 rounded-[22px] bg-[var(--card-surface)] border border-[var(--card-border)] shadow-xs transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-[var(--brand)] dark:text-blue-400 flex items-center justify-center shrink-0 mb-4">
                <InfoCircle className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-[var(--heading)] mb-2">
                {sidebar.title}
              </h3>
              <p className="text-[13.5px] text-[var(--Text-text-secondary)] leading-relaxed mb-6">
                {sidebar.description}
              </p>
              <Link
                href={`/${lang}${sidebar.buttonHref}`}
                className="w-full inline-flex items-center justify-center font-bold text-[13.5px] rounded-xl h-[44px] border-2 border-[var(--card-border)] hover:border-slate-400 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-800/40 bg-transparent text-[var(--heading)] transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
              >
                {sidebar.buttonText}
              </Link>
            </div>
          </aside>

        </div>
      </div>
    </article>
  );
}
