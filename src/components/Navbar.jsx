"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Profile from "./Profile";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Register from "@/components/Register";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const user = useSelector((state) => state.user?.user);

  // Auto close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      event.preventDefault();
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

  const name = user?.name?.trim()?.slice(0, 2)?.toUpperCase();
  return (
    <nav
      className="relative z-50 bg-black text-[#E0E0EF] px-4 py-3 shadow-2xl shadow-[#ffffff27]"
      ref={menuRef}
    >
      <Profile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="bg-white hover:bg-[#ac7268] h-10 border rounded-md hover:border-[#ac7268] ">
          <img src="/logo-_2_-_1_.svg" alt="Logo" className="h-[100%] rounded-md" />
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
              <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-4 items-center list-none">
          <NavLink
            href="/"
            label="Home"
            user={user}
            setLoginModal={setIsModelOpen}
          />
          <NavLink
            href="/content-library"
            label="Content Library"
            user={user}
            setLoginModal={setIsModelOpen}
          />
          {/* <NavLink
            href="/passion"
            label="Passion Discovery"
            user={user}
            setLoginModal={setIsModelOpen}
          /> */}
          <NavLink
            href="/chats"
            label="Community Chat"
            user={user}
            setLoginModal={setIsModelOpen}
          />
          <NavLink
            href="/map"
            label="Interactive Map"
            user={user}
            setLoginModal={setIsModelOpen}
          />
        </ul>

        {/* Desktop buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <Register />
          ) : (
            <button
              className="rounded-3xl"
              onClick={() => setIsProfileOpen(true)}
            >
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>{name?.name}</AvatarFallback>
              </Avatar>
            </button>
          )}
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
            user={user}
            setLoginModal={setIsModelOpen}
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/content-library"
            label="Content Library"
            mobile
            user={user}
            setLoginModal={setIsModelOpen}
            onClick={() => setMenuOpen(false)}
          />
          {/* <NavLink
            href="/passion"
            label="Passion Discovery"
            mobile
            user={user}
            setLoginModal={setIsModelOpen}
            onClick={() => setMenuOpen(false)}
          /> */}
          <NavLink
            href="/chats"
            label="Community Chat"
            mobile
            user={user}
            setLoginModal={setIsModelOpen}
            onClick={() => setMenuOpen(false)}
          />
          <NavLink
            href="/map"
            label="Interactive Map"
            mobile
            user={user}
            setLoginModal={setIsModelOpen}
            onClick={() => setMenuOpen(false)}
          />
          <li>
            {!user ? (
              <Register></Register>
            ) : (
              <button
                className="rounded-3xl"
                onClick={() => setIsProfileOpen(true)}
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>{name?.name}</AvatarFallback>
                </Avatar>
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Modal */}
    </nav>
  );
};

const NavLink = ({
  href,
  label,
  mobile = false,
  user,
  setLoginModal,
  onClick,
}) => {
  const router = useRouter();

  // Define which routes are protected
  const protectedRoutes = ["/content-library", "/passion", "/chats", "/map"];

  const handleNavigation = (e) => {
    if (protectedRoutes.includes(href) && !user) {
      e.preventDefault();
      setLoginModal(true); // Open login modal
    } else {
      if (onClick) onClick(); // For closing mobile menu
    }
  };

  return (
    <li>
      <Link
        href={href}
        onClick={handleNavigation}
        className={`block px-4 py-2 rounded-2xl text-white text-sm transition duration-200 ${"hover:bg-[#ac7268] md:w-auto md:h-10 md:flex md:justify-center md:items-center"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default Navbar;
