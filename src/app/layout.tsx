import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaseAim - Onboarding Kickoff",
  description: "Complete your pre-call survey to help us prepare for your AI consultation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
