import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", iconLeft, iconRight, label, wrapperClassName = "", ...props }, ref) => {
    return (
      <div className={`mb-4 ${wrapperClassName}`}>
        {label && (
          <label className="block text-[12px] font-semibold text-[#374151] dark:text-zinc-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {iconLeft && (
            <div className="absolute start-[14px] text-[14px] text-[#94a3b8] dark:text-zinc-500 group-focus-within:text-[#1665ff] dark:group-focus-within:text-blue-400 transition-colors pointer-events-none flex items-center justify-center">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full h-[46px] bg-white dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800 rounded-xl text-[13.5px] text-[#111827] dark:text-zinc-100 placeholder-[#94a3b8] dark:placeholder-zinc-500 outline-none focus:border-[#1665ff] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#1665ff]/10 dark:focus:ring-blue-500/15 transition-all duration-200 ${
              iconLeft ? "ps-[40px]" : "ps-[14px]"
            } ${iconRight ? "pe-[42px]" : "pe-[14px]"} ${className}`}
            {...props}
          />
          {iconRight && (
            <div className="absolute end-[14px] flex items-center justify-center text-[14px] text-[#94a3b8] dark:text-zinc-500 hover:text-[#64748b] dark:hover:text-zinc-300 transition-colors cursor-pointer">
              {iconRight}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
