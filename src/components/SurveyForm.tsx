"use client";

import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { SurveyData, initialSurveyData, surveySteps } from "@/types/survey";
import TextStep from "./steps/TextStep";
import PhoneStep from "./steps/PhoneStep";
import MultiSelectStep from "./steps/MultiSelectStep";
import SingleChoiceStep from "./steps/SingleChoiceStep";
import DropdownStep from "./steps/DropdownStep";
import YesNoStep from "./steps/YesNoStep";
import BookingStep from "./steps/BookingStep";
import Button from "./ui/Button";
import ProgressBar from "./ProgressBar";

export default function SurveyForm() {
  const [data, setData] = useState<SurveyData>(initialSurveyData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Filter out conditional steps that shouldn't be shown
  const visibleSteps = useMemo(() => {
    return surveySteps.filter((step) => {
      if (!step.conditional) return true;
      const condValue = data[step.conditional.field];
      return condValue === step.conditional.value;
    });
  }, [data]);

  const currentStep = visibleSteps[currentStepIndex];
  const isLastQuestionStep = currentStepIndex === visibleSteps.length - 2; // second to last (before booking)
  const isBookingStep = currentStep?.type === "booking";
  const totalQuestionSteps = visibleSteps.length - 1; // exclude booking step from count

  const updateField = useCallback(
    (field: keyof SurveyData, value: string | string[]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const canProceed = useCallback(() => {
    if (!currentStep) return false;
    if (!currentStep.required) return true;

    const value = data[currentStep.field];
    if (Array.isArray(value)) return value.length > 0;
    return typeof value === "string" && value.trim().length > 0;
  }, [currentStep, data]);

  const goNext = useCallback(() => {
    if (currentStepIndex < visibleSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, visibleSteps.length]);

  const goBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  }, [currentStepIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && canProceed()) {
        e.preventDefault();
        goNext();
      }
    },
    [canProceed, goNext]
  );

  const renderStep = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case "text":
        return (
          <TextStep
            key={currentStep.id}
            question={currentStep.question}
            subtitle={currentStep.subtitle}
            value={data[currentStep.field] as string}
            onChange={(val) => updateField(currentStep.field, val)}
            required={currentStep.required}
          />
        );

      case "phone":
        return (
          <PhoneStep
            key={currentStep.id}
            question={currentStep.question}
            value={data[currentStep.field] as string}
            onChange={(val) => updateField(currentStep.field, val)}
          />
        );

      case "multi-select":
        return (
          <MultiSelectStep
            key={currentStep.id}
            question={currentStep.question}
            subtitle={currentStep.subtitle}
            options={currentStep.options || []}
            selected={data[currentStep.field] as unknown as string[]}
            onChange={(val) => updateField(currentStep.field, val)}
            hasOther={currentStep.hasOther}
            otherValue={currentStep.otherField ? (data[currentStep.otherField] as string) : ""}
            onOtherChange={
              currentStep.otherField
                ? (val) => updateField(currentStep.otherField!, val)
                : undefined
            }
          />
        );

      case "single-choice":
        return (
          <SingleChoiceStep
            key={currentStep.id}
            question={currentStep.question}
            subtitle={currentStep.subtitle}
            options={currentStep.options || []}
            value={data[currentStep.field] as string}
            onChange={(val) => updateField(currentStep.field, val)}
            required={currentStep.required}
            hasOther={currentStep.hasOther}
            otherValue={currentStep.otherField ? (data[currentStep.otherField] as string) : ""}
            onOtherChange={
              currentStep.otherField
                ? (val) => updateField(currentStep.otherField!, val)
                : undefined
            }
          />
        );

      case "dropdown":
        return (
          <DropdownStep
            key={currentStep.id}
            question={currentStep.question}
            options={currentStep.options || []}
            value={data[currentStep.field] as string}
            onChange={(val) => updateField(currentStep.field, val)}
          />
        );

      case "yes-no":
        return (
          <YesNoStep
            key={currentStep.id}
            question={currentStep.question}
            value={data[currentStep.field] as string}
            onChange={(val) => updateField(currentStep.field, val)}
          />
        );

      case "booking":
        return <BookingStep key={currentStep.id} />;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]" onKeyDown={handleKeyDown}>
      {!isBookingStep && (
        <ProgressBar
          currentStep={currentStepIndex + 1}
          totalSteps={totalQuestionSteps}
        />
      )}

      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>
      </div>

      {!isBookingStep && (
        <div className="w-full max-w-2xl mx-auto px-6 pb-8">
          <div className="flex items-center justify-between">
            <div>
              {currentStepIndex > 0 && (
                <Button variant="ghost" onClick={goBack}>
                  ← Back
                </Button>
              )}
            </div>
            <div className="flex items-center gap-3">
              {!currentStep?.required && (
                <Button variant="ghost" onClick={goNext}>
                  Skip
                </Button>
              )}
              <Button
                onClick={goNext}
                disabled={currentStep?.required ? !canProceed() : false}
              >
                {isLastQuestionStep ? "Submit & Book Call" : "Next →"}
              </Button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-4">
            Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono text-xs">Enter</kbd> to continue
          </p>
        </div>
      )}
    </div>
  );
}
