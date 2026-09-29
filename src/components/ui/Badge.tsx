import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "brand-solid" | "surface" | "pill" | "outline-sm";
  children: React.ReactNode;
}

export function Badge({
  className = "",
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-[10px] text-[13px] font-medium transition-colors select-none";

  let variantStyles = "";
  if (variant === "default") {
    variantStyles =
      "border border-[#EAECF0] dark:border-neutral-800 bg-transparent text-[#475467] dark:text-neutral-400";
  } else if (variant === "brand") {
    variantStyles =
      "border border-brand/25 bg-brand/10 text-brand dark:text-blue-400";
  } else if (variant === "brand-solid") {
    variantStyles =
      "bg-brand text-white border border-transparent !rounded-full px-3 py-1 text-[13px]";
  } else if (variant === "surface") {
    variantStyles =
      "border border-[#EAECF0] dark:border-surface-3 bg-white dark:bg-surface-2 text-[#475467] dark:text-neutral-300 shadow-xs";
  } else if (variant === "pill") {
    variantStyles =
      "border border-[#EAECF0] dark:border-[#27272A] bg-transparent text-[#101828] dark:text-[#F8FAFC] !rounded-full px-3.5 py-1.5 text-[14px]";
  } else if (variant === "outline-sm") {
    variantStyles =
      "border border-[#EAECF0] dark:border-[#27272A] bg-transparent text-[#344054] dark:text-[#D4D4D8] !rounded-[4px] px-3 py-1 text-[13px]";
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Badge;
