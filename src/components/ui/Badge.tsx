import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "brand" | "surface";
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
  } else if (variant === "surface") {
    variantStyles =
      "border border-[#EAECF0] dark:border-surface-3 bg-white dark:bg-surface-2 text-[#475467] dark:text-neutral-300 shadow-xs";
  }

  return (
    <div className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Badge;
