"use client";

import { motion } from "framer-motion";

const CAL_URL = "https://cal.com/team/baseaim/ai-consultation?overlayCalendar=true";

export default function BookingStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto text-center"
    >
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-gray-900 mb-2">
          You&apos;re all set!
        </h2>
        <p className="text-gray-500 text-lg mb-2">
          Thank you for completing the survey.
        </p>
        <p className="text-gray-500 text-base">
          Now, book your AI consultation call below.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg">
        <iframe
          src={CAL_URL}
          width="100%"
          height="650"
          frameBorder="0"
          className="w-full"
          title="Book your AI consultation call"
          allow="camera; microphone"
        />
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Having trouble?{" "}
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-blue hover:underline"
        >
          Open booking page directly
        </a>
      </p>
    </motion.div>
  );
}
