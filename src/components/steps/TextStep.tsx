"use client";

import { motion } from "framer-motion";

interface TextStepProps {
  question: string;
  subtitle?: string;
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  placeholder?: string;
}

export default function TextStep({
  question,
  subtitle,
  value,
  onChange,
  required,
  placeholder = "Type your answer here...",
}: TextStepProps) {
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
        <p className="text-gray-500 mb-8 text-base">{subtitle}</p>
      )}
      {!subtitle && <div className="mb-8" />}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-0 py-3 text-lg bg-transparent border-b-2 border-gray-200 focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-300"
        required={required}
        autoFocus
      />
    </motion.div>
  );
}
