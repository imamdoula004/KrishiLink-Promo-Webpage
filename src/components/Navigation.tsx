"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navigation() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const navLinks = [
    { name: "Opportunity", href: "/" },
    { name: "Technology", href: "/technology" },
    { name: "National Impact", href: "/impact" },
    { name: "Support Hub", href: "/support" },
    { name: "Join Waitlist", href: "/join" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar if scrolling up or if near top
      if (currentScrollY < 10) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-[#fbfaf2] border-b border-[#c0c8c3]/30 px-4 md:px-8 py-3 transition-transform duration-300 ease-in-out shadow-sm ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Premium Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-7 h-7 flex items-center justify-center bg-[#00261a] rounded-lg group-hover:scale-105 transition-all shadow-md">
            <Image 
              src="/krishilink_logo_clean.png" 
              alt="KrishiLink Logo" 
              width={16} 
              height={16} 
              className="object-contain"
            />
          </div>
          <span className="font-serif text-xl font-black tracking-tight flex items-center">
            <span className="text-[#00261a]">Krishi</span>
            <span className="text-[#3d6a00]">Link</span>
          </span>
        </Link>

        {/* Clean Menu links list - 100% visible on all devices */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] sm:text-xs font-label-bold uppercase tracking-wider transition-all duration-300 relative py-1 px-1.5 ${
                  isActive 
                    ? "text-[#3d6a00] font-extrabold border-b-2 border-[#3d6a00]" 
                    : "text-[#414944] hover:text-[#00261a]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
