"use client";

import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ["home", "about", "services", "gallery", "testimonials", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);

        if (
          el &&
          scrollPosition >= el.offsetTop &&
          scrollPosition < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass = (section) =>
    `transition hover:text-purple-400 ${
      activeSection === section
        ? "text-purple-400 border-b-2 border-purple-400 pb-1"
        : ""
    }`;

  const handleMobileClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.jpeg"
            alt="DJ Alekie Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
          />
          <span className="text-xl font-bold text-white tracking-wide">
            DJ ALEKIE 254
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-8 text-white font-medium">
          <li><a href="#home" className={navLinkClass("home")}>Home</a></li>
          <li><a href="#about" className={navLinkClass("about")}>About</a></li>
          <li><a href="#services" className={navLinkClass("services")}>Services</a></li>
          <li><a href="#gallery" className={navLinkClass("gallery")}>Gallery</a></li>
          <li><a href="#testimonials" className={navLinkClass("testimonials")}>Testimonials</a></li>
          <li><a href="#contact" className={navLinkClass("contact")}>Contact</a></li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg px-6 py-6 space-y-4 text-white border-t border-white/10">
          <a href="#home" onClick={handleMobileClick} className={`block ${navLinkClass("home")}`}>Home</a>
          <a href="#about" onClick={handleMobileClick} className={`block ${navLinkClass("about")}`}>About</a>
          <a href="#services" onClick={handleMobileClick} className={`block ${navLinkClass("services")}`}>Services</a>
          <a href="#gallery" onClick={handleMobileClick} className={`block ${navLinkClass("gallery")}`}>Gallery</a>
          <a href="#testimonials" onClick={handleMobileClick} className={`block ${navLinkClass("testimonials")}`}>Testimonials</a>
          <a href="#contact" onClick={handleMobileClick} className={`block ${navLinkClass("contact")}`}>Contact</a>
        </div>
      )}
    </nav>
  );
}
