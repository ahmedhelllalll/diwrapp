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
      icon: <Phone width={20} height={20} strokeWidth={1.75} />,
      label: callUs.label,
      value: callUs.value,
      href: `tel:${callUs.value.replace(/\s+/g, "")}`,
      isExternal: false,
    },
    {
      id: "visit",
      icon: <MapPin width={20} height={20} strokeWidth={1.75} />,
      label: visitUs.label,
      value: visitUs.value,
      href: "#map",
      isExternal: true,
    },
    {
      id: "sales",
      icon: <ChatLines width={20} height={20} strokeWidth={1.75} />,
      label: chatSales.label,
      value: chatSales.value,
      href: `mailto:${chatSales.value}`,
      isExternal: false,
    },
    {
      id: "support",
      icon: <HelpCircle width={20} height={20} strokeWidth={1.75} />,
      label: chatSupport.label,
      value: chatSupport.value,
      href: `mailto:${chatSupport.value}`,
      isExternal: false,
    },
  ];

  return (
    <div className="contact-cards-grid h-full grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 lg:gap-5" aria-label="Direct Contact Channels">
      {contactItems.map((item) => (
        <div key={item.id} className="contact-card h-full min-h-[160px] lg:min-h-0 flex flex-col justify-between">
          <div className="contact-card-icon-box" aria-hidden="true">
            {item.icon}
          </div>

          <div className="contact-card-content">
            <span className="contact-card-label">{item.label}</span>
            <a
              href={item.href}
              className="contact-card-value whitespace-nowrap break-normal"
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
            >
              {item.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
