import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "social" | "outline" | "ghost";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", fullWidth, children, ...props }, ref) => {
    
    let baseStyles = "inline-flex items-center justify-center font-bold text-[13.5px] rounded-lg h-[42px] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0";
    
    if (fullWidth) baseStyles += " w-full";

    let variantStyles = "";
    if (variant === "primary") {
      variantStyles = "bg-[#0f172a] dark:bg-white text-white dark:text-black hover:bg-[#1e293b] dark:hover:bg-zinc-200 shadow-md";
    } else if (variant === "social") {
      variantStyles = "bg-white dark:bg-zinc-900/50 border border-[#e5e7eb] dark:border-zinc-800 text-[#111827] dark:text-zinc-100 hover:bg-[#f9fafb] dark:hover:bg-zinc-800/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] gap-2.5";
    } else if (variant === "outline") {
      variantStyles = "bg-transparent border-2 border-[#e2e8f0] dark:border-zinc-800/80 text-[#0f172a] dark:text-zinc-100 hover:border-[#cbd5e1] dark:hover:border-zinc-700 dark:hover:bg-zinc-800/80";
    } else if (variant === "ghost") {
      variantStyles = "bg-transparent text-[#64748b] dark:text-zinc-400 hover:bg-[#f1f5f9] dark:hover:bg-zinc-800/80 hover:text-[#0f172a] dark:hover:text-zinc-100";
    }
    
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
