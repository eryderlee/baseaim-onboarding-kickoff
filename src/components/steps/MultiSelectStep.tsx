"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MultiSelectStepProps {
  question: string;
  subtitle?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  hasOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function MultiSelectStep({
  question,
  subtitle,
  options,
  selected,
  onChange,
  hasOther,
  otherValue = "",
  onOtherChange,
}: MultiSelectStepProps) {
  const [otherChecked, setOtherChecked] = useState(selected.includes("Other"));

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const toggleOther = () => {
    if (otherChecked) {
      setOtherChecked(false);
      onChange(selected.filter((s) => s !== "Other"));
      onOtherChange?.("");
    } else {
      setOtherChecked(true);
      onChange([...selected, "Other"]);
    }
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
            onClick={() => toggleOption(option)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
              selected.includes(option)
                ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selected.includes(option)
                    ? "border-brand-blue bg-brand-blue"
                    : "border-gray-300"
                }`}
              >
                {selected.includes(option) && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
              onClick={toggleOther}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 ${
                otherChecked
                  ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                  : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: options.length * 0.05 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    otherChecked
                      ? "border-brand-blue bg-brand-blue"
                      : "border-gray-300"
                  }`}
                >
                  {otherChecked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">Other</span>
              </div>
            </motion.button>
            {otherChecked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pl-8"
              >
                <input
                  type="text"
                  value={otherValue}
                  onChange={(e) => onOtherChange?.(e.target.value)}
                  placeholder="Please explain..."
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
