"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  disabled?: boolean;
  type?: "button" | "submit";
}

export default function Button({
  onClick,
  children,
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "px-8 py-3 rounded-xl font-inter font-semibold text-base transition-all duration-200 focus-visible:outline-2 focus-visible:outline-brand-blue";

  const variants = {
    primary:
      "bg-brand-blue text-white hover:bg-brand-medium shadow-lg shadow-brand-blue/25 hover:shadow-brand-blue/40",
    secondary:
      "bg-white text-brand-blue border-2 border-brand-blue hover:bg-brand-blue/5",
    ghost:
      "bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
