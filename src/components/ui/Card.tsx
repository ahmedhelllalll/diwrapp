import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gradientBlue";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    let baseStyles = "relative flex flex-col justify-between transition-colors duration-300";
    
    let variantStyles = "";
    if (variant === "default") {
      variantStyles = "bg-white dark:bg-[#0a0a0a] rounded-none sm:rounded-[24px] border border-transparent dark:border-zinc-800 shadow-none sm:shadow-[0_8px_32px_rgba(0,0,0,0.02)] dark:shadow-none p-[32px_20px] sm:p-[44px_36px_28px_36px]";
    } else if (variant === "gradientBlue") {
      variantStyles = "overflow-hidden rounded-[28px] p-[32px_36px_36px_36px] bg-[radial-gradient(circle_at_45%_48%,#0055ff_0%,#3b82f6_28%,#c7d9fe_65%,#e0e6ed_100%)] dark:bg-none dark:bg-black dark:border dark:border-zinc-800";
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
