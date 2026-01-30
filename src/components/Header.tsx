"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-center border-b border-gray-100 bg-white/80 backdrop-blur-sm">
      <Image
        src="/logo.png"
        alt="BaseAim"
        width={160}
        height={40}
        className="h-8 w-auto"
        priority
      />
    </header>
  );
}
