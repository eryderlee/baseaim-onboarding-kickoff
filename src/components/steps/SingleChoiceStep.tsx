"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface SingleChoiceStepProps {
  question: string;
  subtitle?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function SingleChoiceStep({
  question,
  subtitle,
  options,
  value,
  onChange,
  required,
  hasOther,
  otherValue = "",
  onOtherChange,
}: SingleChoiceStepProps) {
  const [showOtherInput, setShowOtherInput] = useState(value === "Other");

  const handleSelect = (option: string) => {
    onChange(option);
    setShowOtherInput(false);
  };

  const handleOther = () => {
    onChange("Other");
    setShowOtherInput(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-900 mb-2">
        {question}
        {required && <span className="text-red-500 ml-1">*</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-500 mb-6 text-base">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-6" />}

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
              value === option
                ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  value === option
                    ? "border-brand-blue"
                    : "border-gray-300"
                }`}
              >
                {value === option && (
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                )}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </motion.button>
        ))}

        {hasOther && (
          <>
            <motion.button
              type="button"
              onClick={handleOther}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                value === "Other"
                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: options.length * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    value === "Other"
                      ? "border-brand-blue"
                      : "border-gray-300"
                  }`}
                >
                  {value === "Other" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
                  )}
                </div>
                <span className="font-medium">Other</span>
              </div>
            </motion.button>
            {showOtherInput && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pl-8"
              >
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => onOtherChange?.(e.target.value)}
                  placeholder="Briefly explain..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-blue focus:outline-none transition-colors"
                  autoFocus
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
