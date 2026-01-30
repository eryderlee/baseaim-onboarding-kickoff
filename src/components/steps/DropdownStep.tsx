"use client";

import { motion } from "framer-motion";

interface DropdownStepProps {
  question: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function DropdownStep({
  question,
  options,
  value,
  onChange,
}: DropdownStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-xl mx-auto"
    >
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-900 mb-8">
        {question}
      </h2>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 text-lg rounded-xl border-2 border-gray-200 bg-white focus:border-brand-blue focus:outline-none transition-colors text-gray-700 cursor-pointer appearance-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
          backgroundPosition: "right 16px center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "20px",
        }}
      >
        <option value="" disabled>
          Select an option...
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  );
}
