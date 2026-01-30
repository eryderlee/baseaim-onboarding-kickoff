"use client";

import { motion } from "framer-motion";

interface PhoneStepProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneStep({ question, value, onChange }: PhoneStepProps) {
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
        <span className="text-red-500 ml-1">*</span>
      </h2>
      <div className="mb-8" />
      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="(555) 123-4567"
        className="w-full px-0 py-3 text-lg bg-transparent border-b-2 border-gray-200 focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-300"
        required
        autoFocus
      />
    </motion.div>
  );
}
