"use client";

import { motion } from "framer-motion";

interface YesNoStepProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
}

export default function YesNoStep({ question, value, onChange }: YesNoStepProps) {
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
      <div className="flex gap-4">
        {["Yes", "No"].map((option) => (
          <motion.button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex-1 px-6 py-5 rounded-xl border-2 text-lg font-semibold transition-all duration-200 ${
              value === option
                ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                : "border-gray-200 bg-white hover:border-gray-300 text-gray-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
