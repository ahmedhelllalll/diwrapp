"use client";

import React, { useState, useRef, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavArrowDown, Check } from "iconoir-react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: (SelectOption | string)[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  label?: string;
  className?: string;
  ariaLabel?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  placeholder = "Select an option",
  onChange,
  disabled = false,
  name,
  id,
  label,
  className = "",
  ariaLabel,
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const listboxId = `${selectId}-listbox`;

  // Normalize options into { value, label } array
  const normalizedOptions: SelectOption[] = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const [internalValue, setInternalValue] = useState<string>(
    value !== undefined ? value : defaultValue || ""
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isKeyboardNavRef = useRef<boolean>(false);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const selectedOption = normalizedOptions.find((opt) => opt.value === currentValue);

  // Sync internal state if controlled value changes
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value || "");
    }
  }, [isControlled, value]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Flip upward if close to viewport bottom
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const menuHeight = Math.min(normalizedOptions.length * 44 + 16, 260);

      if (spaceBelow < menuHeight && spaceAbove > spaceBelow) {
        setPlacement("top");
      } else {
        setPlacement("bottom");
      }
    }
  }, [isOpen, normalizedOptions.length]);

  // On opening, scroll current selected item into view once
  useEffect(() => {
    if (isOpen && listRef.current) {
      const currentIndex = normalizedOptions.findIndex((opt) => opt.value === currentValue);
      if (currentIndex >= 0) {
        const optionElements = listRef.current.querySelectorAll<HTMLButtonElement>('[role="option"]');
        const activeElement = optionElements[currentIndex];
        if (activeElement) {
          activeElement.scrollIntoView({ block: "nearest" });
        }
      }
    }
  }, [isOpen]);

  // Ensure highlighted item is visible in list ONLY during keyboard navigation
  // (Prevents touchpad/wheel scrolling from jumping when mouse rests over items)
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && listRef.current && isKeyboardNavRef.current) {
      const optionElements = listRef.current.querySelectorAll<HTMLButtonElement>('[role="option"]');
      const activeElement = optionElements[highlightedIndex];
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, highlightedIndex]);

  const selectOption = (val: string) => {
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const toggleDropdown = () => {
    if (disabled) return;
    if (!isOpen) {
      const currentIndex = normalizedOptions.findIndex((opt) => opt.value === currentValue);
      setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      isKeyboardNavRef.current = false;
    }
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        isKeyboardNavRef.current = true;
        if (!isOpen) {
          setIsOpen(true);
          const currentIndex = normalizedOptions.findIndex((opt) => opt.value === currentValue);
          setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
        } else {
          setHighlightedIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
        }
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        isKeyboardNavRef.current = true;
        if (!isOpen) {
          setIsOpen(true);
          const currentIndex = normalizedOptions.findIndex((opt) => opt.value === currentValue);
          setHighlightedIndex(currentIndex >= 0 ? currentIndex : normalizedOptions.length - 1);
        } else {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
        }
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
          selectOption(normalizedOptions[highlightedIndex].value);
        } else {
          toggleDropdown();
        }
        break;
      }
      case "Escape": {
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      }
      case "Tab": {
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      }
    }
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={selectId}
          className="block font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] font-normal text-[14px] leading-[20px] text-[#344054] dark:text-neutral-300 mb-2"
        >
          {label}
        </label>
      )}

      {/* Hidden input for form submits */}
      {name && <input type="hidden" name={name} value={currentValue} />}

      <button
        ref={triggerRef}
        id={selectId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || label || placeholder}
        aria-activedescendant={
          isOpen && highlightedIndex >= 0 ? `${selectId}-opt-${highlightedIndex}` : undefined
        }
        disabled={disabled}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={`w-full h-[46px] px-3.5 flex items-center justify-between rounded-[10px] border transition-all duration-200 outline-none text-left rtl:text-right cursor-pointer select-none bg-white dark:bg-[#0a0a0a] ${
          isOpen
            ? "border-[#0066FF] ring-2 ring-[#0066FF]/15 dark:border-[#0066FF]"
            : "border-[#D0D5DD] dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
        } ${disabled ? "opacity-50 cursor-not-allowed bg-neutral-100 dark:bg-neutral-900" : ""}`}
      >
        <span
          className={`truncate font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] ${
            selectedOption
              ? "text-[#101828] dark:text-white font-normal"
              : "text-[#667085] dark:text-neutral-400"
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ms-2 text-[#667085] dark:text-neutral-400 flex items-center"
        >
          <NavArrowDown width={18} height={18} strokeWidth={2} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: placement === "bottom" ? -6 : 6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-50 w-full left-0 right-0 bg-white dark:bg-[#0a0a0a] border border-[#EAECF0] dark:border-neutral-800 rounded-[12px] shadow-[0_12px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] py-1.5 max-h-[220px] sm:max-h-[260px] overflow-y-auto overscroll-contain touch-pan-y custom-scrollbar outline-none ${
              placement === "bottom" ? "top-full mt-1.5" : "bottom-full mb-1.5"
            }`}
          >
            {normalizedOptions.map((opt, idx) => {
              const isSelected = opt.value === currentValue;
              const isHighlighted = idx === highlightedIndex;

              return (
                <button
                  key={opt.value}
                  id={`${selectId}-opt-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={-1}
                  onClick={() => selectOption(opt.value)}
                  onMouseEnter={() => {
                    isKeyboardNavRef.current = false;
                    setHighlightedIndex(idx);
                  }}
                  className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left rtl:text-right font-['Lufga',sans-serif] rtl:font-['Cairo',sans-serif] text-[14px] leading-[20px] transition-colors cursor-pointer outline-none ${
                    isSelected
                      ? "bg-[#EFF8FF] dark:bg-blue-950/40 text-[#0066FF] dark:text-blue-400 font-medium"
                      : isHighlighted
                      ? "bg-[#F9FAFB] dark:bg-neutral-900 text-[#101828] dark:text-white"
                      : "text-[#344054] dark:text-neutral-300 hover:bg-[#F9FAFB] dark:hover:bg-neutral-900"
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && (
                    <Check
                      width={16}
                      height={16}
                      strokeWidth={2.5}
                      className="text-[#0066FF] dark:text-blue-400 shrink-0 ms-2"
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default Select;
