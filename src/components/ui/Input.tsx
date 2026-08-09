"use client";

import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: string;
  wrapperClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", iconLeft, iconRight, label, wrapperClassName = "", type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`mb-4 ${wrapperClassName}`}>
        {label && (
          <label className="block text-xs font-semibold text-[#374151] dark:text-zinc-300 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center group">
          {iconLeft && (
            <div className="absolute start-[14px] text-sm text-[#94a3b8] dark:text-zinc-500 group-focus-within:text-[#1665ff] dark:group-focus-within:text-blue-400 transition-colors pointer-events-none flex items-center justify-center">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full h-[46px] bg-white dark:bg-zinc-900/50 border border-[#e2e8f0] dark:border-zinc-800 rounded-xl text-sm text-[#111827] dark:text-zinc-100 placeholder-[#94a3b8] dark:placeholder-zinc-500 outline-none hover:border-gray-300 dark:hover:border-zinc-700 focus:border-[#1665ff] dark:focus:border-blue-500 focus:ring-2 focus:ring-[#1665ff]/10 dark:focus:ring-blue-500/15 transition-all duration-200 ${
              iconLeft ? "ps-[40px]" : "ps-[14px]"
            } ${iconRight || isPassword ? "pe-[42px]" : "pe-[14px]"} ${className}`}
            {...props}
          />
          {(iconRight || isPassword) && (
            <div className="absolute end-[14px] flex items-center justify-center text-sm text-[#94a3b8] dark:text-zinc-500 hover:text-[#64748b] dark:hover:text-zinc-300 transition-colors cursor-pointer z-10">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none flex items-center justify-center w-full h-full"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              ) : (
                iconRight
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";
