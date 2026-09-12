import React from "react";
import { Phone, MapPin, ChatLines, ChatBubbleQuestion } from "iconoir-react";

interface CardsDict {
  callUs?: { label: string; value: string };
  visitUs?: { label: string; value: string };
  chatSales?: { label: string; value: string };
  chatSupport?: { label: string; value: string };
}

interface ContactCardsGridProps {
  cards?: CardsDict;
}

export default function ContactCardsGrid({ cards }: ContactCardsGridProps) {
  const callUs = cards?.callUs || { label: "Call Us", value: "+966 00 000 0000" };
  const visitUs = cards?.visitUs || { label: "Visit Us", value: "View Our Location" };
  const chatSales = cards?.chatSales || { label: "Chat To Sales", value: "sales@di-wrapp.com" };
  const chatSupport = cards?.chatSupport || { label: "Chat To Support", value: "support@di-wrapp.com" };

  // Responsive order:
  // Mobile (< 768px, single column): 1. Call Us, 2. Visit Us, 3. Chat To Sales, 4. Chat To Support
  // Tablet/Desktop (>= 768px, 2 columns): Row 1 (Sales | Call), Row 2 (Support | Visit)
  const contactItems = [
    {
      id: "call",
      icon: <Phone width={18} height={18} strokeWidth={1.75} />,
      label: callUs.label,
      value: callUs.value,
      href: `tel:${callUs.value.replace(/\s+/g, "")}`,
      isExternal: false,
      isLtr: true,
      orderClass: "order-1 md:order-2",
    },
    {
      id: "visit",
      icon: <MapPin width={18} height={18} strokeWidth={1.75} />,
      label: visitUs.label,
      value: visitUs.value,
      href: "#map",
      isExternal: true,
      isLtr: false,
      orderClass: "order-2 md:order-4",
    },
    {
      id: "sales",
      icon: <ChatLines width={18} height={18} strokeWidth={1.75} />,
      label: chatSales.label,
      value: chatSales.value,
      href: `mailto:${chatSales.value}`,
      isExternal: false,
      isLtr: true,
      orderClass: "order-3 md:order-1",
    },
    {
      id: "support",
      icon: <ChatBubbleQuestion width={18} height={18} strokeWidth={1.75} />,
      label: chatSupport.label,
      value: chatSupport.value,
      href: `mailto:${chatSupport.value}`,
      isExternal: false,
      isLtr: true,
      orderClass: "order-4 md:order-3",
    },
  ];

  return (
    <div className="contact-cards-grid h-full grid grid-cols-1 gap-3.5 w-full mb-8 md:grid-cols-2 md:grid-rows-2 md:gap-5 md:mb-10 lg:mb-0 lg:h-full lg:grid-cols-2 lg:grid-rows-2" aria-label="Direct Contact Channels">
      {contactItems.map((item) => (
        <div 
          key={item.id} 
          className={`contact-card ${item.orderClass} h-full min-h-[140px] sm:min-h-[160px] md:min-h-[170px] lg:min-h-0 rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:bg-zinc-900/40 dark:backdrop-blur-xl dark:border-white/[0.08] dark:hover:border-white/[0.18] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-6 md:p-7 flex flex-col justify-between hover:-translate-y-[2px] transition-all duration-300 ease-out cursor-default`}
        >
          {/* 40x40 Rounded-xl Transparent Icon Container */}
          <div 
            className="contact-card-icon-box w-10 h-10 min-w-[40px] rounded-xl border border-slate-200/80 bg-slate-50/50 dark:bg-white/[0.04] dark:border-white/[0.1] dark:text-zinc-200 backdrop-blur-md flex items-center justify-center text-slate-800 mb-6 md:mb-8 self-start shrink-0" 
            aria-hidden="true"
          >
            {item.icon}
          </div>

          {/* Label & Underlined Link (Exact Figma Spec) */}
          <div className="contact-card-content flex flex-col text-left rtl:text-right">
            <span className="contact-card-label text-slate-500 dark:text-zinc-300 font-medium text-xs md:text-sm mb-1.5">
              {item.label}
            </span>
            <a
              href={item.href}
              className="contact-card-value text-slate-950 dark:text-white font-bold underline underline-offset-4 decoration-1 decoration-zinc-400 dark:decoration-zinc-300 text-sm sm:text-base md:text-[17px] tracking-tight whitespace-nowrap break-normal hover:opacity-85 transition-opacity"
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
            >
              {item.isLtr ? (
                <span dir="ltr" className="inline-block font-sans contact-ltr-value" style={{ fontFamily: 'var(--font-lufga), var(--font-sans), sans-serif' }}>
                  {item.value}
                </span>
              ) : (
                <span className="contact-rtl-value">
                  {item.value}
                </span>
              )}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
