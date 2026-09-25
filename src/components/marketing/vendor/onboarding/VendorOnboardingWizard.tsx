"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import VendorOnboardingHeader from "./VendorOnboardingHeader";
import VendorOnboardingStep1, { Step1Dict } from "./VendorOnboardingStep1";
import VendorOnboardingStep2, { Step2Dict } from "./VendorOnboardingStep2";
import VendorOnboardingStep3, { Step3Dict } from "./VendorOnboardingStep3";
import VendorOnboardingSuccess, { SuccessDict } from "./VendorOnboardingSuccess";

export interface VendorOnboardingWizardProps {
  lang: string;
  dict?: {
    header?: any;
    step1?: Step1Dict;
    step2?: Step2Dict;
    step3?: Step3Dict;
    success?: SuccessDict;
    [key: string]: any;
  };
  initialStep?: number;
  countryCode?: string;
  countryBadge?: React.ReactNode;
}

export default function VendorOnboardingWizard({
  lang,
  dict,
  initialStep = 1,
  countryCode = "SD",
  countryBadge,
}: VendorOnboardingWizardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize step from searchParams if present, or initialStep
  const stepParam = searchParams.get("step");
  const parsedStep = stepParam ? parseInt(stepParam, 10) : initialStep;
  const validInitialStep = [1, 2, 3, 4].includes(parsedStep) ? parsedStep : 1;

  const [currentStep, setCurrentStep] = useState<number>(validInitialStep);
  const [direction, setDirection] = useState<number>(1);

  // Synchronize when searchParams change (e.g. browser back/forward)
  useEffect(() => {
    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if ([1, 2, 3, 4].includes(step) && step !== currentStep) {
        setDirection(step > currentStep ? 1 : -1);
        setCurrentStep(step);
      }
    }
  }, [stepParam, currentStep]);

  // Smoothly auto-scroll to top on step change without abrupt layout jumps
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ((window as any).lenis && typeof (window as any).lenis.scrollTo === "function") {
        (window as any).lenis.scrollTo(0, { immediate: false, duration: 0.8 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }, [currentStep]);

  const goToStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    const url = `/${lang}/vendor/onboarding?step=${step}`;
    router.replace(url, { scroll: false });
  };

  const handleSaveAndExit = () => {
    router.push(`/${lang}`);
  };

  const isSuccess = currentStep === 4;
  const isRtl = lang === "ar";
  const xOffset = isRtl ? -12 : 12;

  const stepVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? xOffset : -xOffset,
      scale: 0.99,
      filter: "blur(4px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -xOffset : xOffset,
      scale: 0.99,
      filter: "blur(4px)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between">
      <VendorOnboardingHeader
        lang={lang}
        dict={dict?.header}
        cartBadge={isSuccess ? 1 : undefined}
        showLanguageSwitcher={!isSuccess}
        countryCode={countryCode}
        countryBadge={countryBadge}
      />

      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={currentStep}
          custom={direction}
          variants={stepVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full flex-1 flex flex-col justify-between"
        >
          {isSuccess && (
            <VendorOnboardingSuccess
              lang={lang}
              dict={dict?.success || dict}
              userName={dict?.header?.userName || "Omar AL-Dimassi"}
            />
          )}

          {currentStep === 3 && (
            <VendorOnboardingStep3
              lang={lang}
              dict={dict?.step3 || dict}
              onPrevious={() => goToStep(2)}
              onSaveAndExit={handleSaveAndExit}
              onSubmitSuccess={() => goToStep(4)}
            />
          )}

          {currentStep === 2 && (
            <VendorOnboardingStep2
              lang={lang}
              dict={dict?.step2 || dict}
              onPrevious={() => goToStep(1)}
              onSaveAndExit={handleSaveAndExit}
              onNext={() => goToStep(3)}
            />
          )}

          {currentStep === 1 && (
            <VendorOnboardingStep1
              lang={lang}
              dict={dict?.step1 || dict}
              onSaveAndExit={handleSaveAndExit}
              onNext={() => goToStep(2)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

