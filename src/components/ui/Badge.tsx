import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "brand-solid" | "surface" | "pill" | "outline-sm" | "hero";
  children: React.ReactNode;
}

export function Badge({
  className = "",
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap select-none font-medium transition-colors font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] max-w-[92vw] sm:max-w-none [&>svg]:shrink-0";

  let variantStyles = "";
  if (variant === "default") {
    variantStyles =
      "border border-[#EAECF0] dark:border-neutral-800 bg-transparent text-[#475467] dark:text-neutral-400 rounded-[4px] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs md:text-[13px] leading-[18px] sm:leading-[20px] gap-1 sm:gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  } else if (variant === "brand") {
    variantStyles =
      "border border-brand/25 bg-brand/10 text-brand dark:text-blue-400 rounded-[4px] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs md:text-[13px] leading-[18px] sm:leading-[20px] gap-1 sm:gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  } else if (variant === "brand-solid") {
    variantStyles =
      "bg-brand text-white border border-transparent !rounded-full px-3 py-1 text-[12px] sm:text-[13px] gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  } else if (variant === "surface") {
    variantStyles =
      "border border-[#EAECF0] dark:border-surface-3 bg-white dark:bg-surface-2 text-[#475467] dark:text-neutral-300 shadow-xs rounded-[4px] px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs md:text-[13px] leading-[18px] sm:leading-[20px] gap-1 sm:gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  } else if (variant === "pill") {
    variantStyles =
      "border border-[#EAECF0] dark:border-[#27272A] bg-transparent text-[#101828] dark:text-[#F8FAFC] !rounded-full px-3 py-1 sm:px-3.5 sm:py-1.5 text-[12px] sm:text-[14px] gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  } else if (variant === "outline-sm" || variant === "hero") {
    variantStyles =
      "border border-[#EAECF0] dark:border-[#27272A] bg-transparent text-[#344054] dark:text-[#D4D4D8] !rounded-[4px] px-2.5 py-1 sm:px-3 sm:py-1 text-[10.5px] min-[360px]:text-[11.5px] sm:text-xs md:text-[13px] leading-[18px] sm:leading-[20px] gap-1 sm:gap-1.5 [&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-4 sm:[&>svg]:h-4";
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Badge;
