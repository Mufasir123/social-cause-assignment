"use client";
import React, { useState, useEffect, useRef } from "react";
import Register from "./Register";
import Link from "next/link";

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Auto close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav
      className="relative z-50 bg-black text-[#E0E0EF] px-4 py-3"
      ref={menuRef}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-10" />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-4 items-center list-none">
          <NavLink href="/" label="Home" />
          <NavLink href="/content-library" label="Content Library" />
          <NavLink href="/passion" label="Passion Discovery" />
          <NavLink href="/community-chat" label="Community Chat" />
          <NavLink href="/map" label="Interactive Map" />
        </ul>

        {/* Desktop login/register */}
        <div className="hidden md:block">
          <button
            className="bg-[#44448E] text-white px-4 py-2 rounded-3xl"
            onClick={() => setIsModelOpen(true)}
          >
            Login/Register
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out bg-[#1a1a1afb] shadow-md z-40 ${
          menuOpen
            ? "opacity-100 max-h-[500px] visible"
            : "opacity-0 max-h-0 invisible"
        }`}
      >
        <ul className="flex flex-col space-y-2 p-4 list-none">
          <NavLink
            href="/"
            label="Home"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/content-library"
            label="Content Library"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/passion"
            label="Passion Discovery"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/chats"
            label="Community Chat"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/map"
            label="Interactive Map"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <li>
            <button
              className="bg-[#44448E] text-white px-4 py-2 rounded-3xl w-full"
              onClick={() => {
                setIsModelOpen(true);
                setMenuOpen(false);
              }}
            >
              Login/Register
            </button>
          </li>
        </ul>
      </div>

      {/* Modal */}
      <Register isOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
    </nav>
  );
};

const NavLink = ({ href, label, mobile = false, onClick }) => (
  <li>
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 rounded-2xl text-white text-sm transition duration-200 ${
        mobile
          ? "hover:bg-[#44448E]"
          : "hover:bg-[#6868AC] md:w-auto md:h-10 md:flex md:justify-center md:items-center"
      }`}
    >
      {label}
    </Link>
  </li>
);

export default Navbar;
