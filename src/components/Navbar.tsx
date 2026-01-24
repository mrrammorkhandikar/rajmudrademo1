"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);

  /* ================= THEME ================= */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* ================= SCROLL DETECTION FOR NAVBAR ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
      navbarVisible 
        ? 'translate-y-0' 
        : '-translate-y-full'
    } ${
      isScrolled 
        ? 'bg-white/80 dark:bg-black/80 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-black dark:text-white"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <nav className="hidden md:flex flex-1 justify-center gap-8 lg:gap-16 text-sm lg:text-base font-semibold items-center">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-orange-500 transition-colors">About</Link>
          <Link href="/services" className="hover:text-orange-500 transition-colors">Services</Link>
          <Link href="/works" className="hover:text-orange-500 transition-colors">Works</Link>
          <Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
        </nav>

        {/* Mobile Logo/Brand */}
        <div className="md:hidden flex items-center">
          <span className="text-sm font-bold text-orange-500">RG</span>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 md:w-12 md:h-6 rounded-full bg-gray-300 dark:bg-gray-700 relative transition flex items-center justify-center md:justify-start"
          >
            <span
              className={`md:absolute md:top-1 md:left-1 w-4 h-4 rounded-full bg-white transition ${dark ? "md:translate-x-6" : ""}`}
            />
            {/* Mobile icons */}
            <span className="md:hidden text-xs">{dark ? "☀️" : "🌙"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-40 md:hidden flex items-center justify-center"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-8 text-white text-2xl font-semibold">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition-colors">About</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition-colors">Services</Link>
            <Link href="/works" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition-colors">Works</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-orange-500 transition-colors">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}