import React from "react";
import { Phone, MapPin, ChatLines, HelpCircle } from "iconoir-react";

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

  const contactItems = [
    {
      id: "call",
      icon: <Phone width={18} height={18} strokeWidth={1.75} />,
      label: callUs.label,
      value: callUs.value,
      href: `tel:${callUs.value.replace(/\s+/g, "")}`,
      isExternal: false,
      isLtr: true,
    },
    {
      id: "visit",
      icon: <MapPin width={18} height={18} strokeWidth={1.75} />,
      label: visitUs.label,
      value: visitUs.value,
      href: "https://maps.google.com/?q=Olaya+Street+Olaya+District+Riyadh+Saudi+Arabia",
      isExternal: true,
      isLtr: false,
    },
    {
      id: "sales",
      icon: <ChatLines width={18} height={18} strokeWidth={1.75} />,
      label: chatSales.label,
      value: chatSales.value,
      href: `mailto:${chatSales.value}`,
      isExternal: false,
      isLtr: true,
    },
    {
      id: "support",
      icon: <HelpCircle width={18} height={18} strokeWidth={1.75} />,
      label: chatSupport.label,
      value: chatSupport.value,
      href: `mailto:${chatSupport.value}`,
      isExternal: false,
      isLtr: true,
    },
  ];

  return (
    <div
      className="contact-cards-grid h-full flex-1 grid grid-cols-1 gap-3.5 w-full mb-8 md:grid-cols-2 md:grid-rows-2 md:gap-5 md:mb-10 lg:mb-0 lg:h-full lg:grid-cols-2 lg:grid-rows-2"
      aria-label="Direct Contact Channels"
    >
      {contactItems.map((item) => (
        <div 
          key={item.id} 
          className="contact-card h-full min-h-[170px] lg:min-h-[185px] rounded-2xl md:rounded-3xl border border-slate-200/80 bg-white/80 backdrop-blur-md shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] dark:bg-zinc-900/40 dark:backdrop-blur-xl dark:border-white/[0.08] dark:hover:border-white/[0.18] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] p-5 lg:p-6 flex flex-col justify-between hover:-translate-y-[2px] transition-all duration-300 ease-out cursor-default"
        >
          {/* 40x40 Rounded-xl Icon Container */}
          <div 
            className="contact-card-icon-box w-10 h-10 min-w-[40px] rounded-xl border border-slate-200/80 bg-slate-50/50 dark:bg-white/[0.04] dark:border-white/[0.1] dark:text-zinc-200 backdrop-blur-md flex items-center justify-center text-slate-800 mb-5 lg:mb-6 self-start shrink-0" 
            aria-hidden="true"
          >
            {item.icon}
          </div>

          {/* Label & Underlined Link */}
          <div className="contact-card-content flex flex-col text-start">
            <span className="contact-card-label text-slate-500 dark:text-zinc-400 text-xs md:text-sm font-medium mb-1.5">
              {item.label}
            </span>
            <a
              href={item.href}
              className="contact-card-value font-bold underline underline-offset-4 decoration-1 decoration-slate-900 dark:decoration-white hover:opacity-80 transition-opacity text-slate-900 dark:text-white text-sm sm:text-base md:text-[17px] tracking-tight break-all sm:break-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 rounded-sm"
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
            >
              {item.isLtr ? (
                <span dir="ltr" className="font-sans contact-ltr-value font-bold">
                  {item.value}
                </span>
              ) : (
                <span className="contact-rtl-value font-bold">
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
