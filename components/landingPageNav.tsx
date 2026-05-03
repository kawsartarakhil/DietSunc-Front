"use client";

import React, { useState, useEffect } from "react";
import { Settings, Menu, Sun, Moon } from "lucide-react";
import Image from "next/image";
import LOGO from "../public/MainLOGO.png";
import userPic from "@/public/userPic.png";
import { useTranslations } from "next-intl";
import { useParams, usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";

const LandingPageNav = () => {
  const t = useTranslations("nav");
  const { locale } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);

  // 🌙 THEME STATE
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme ?? "light";

    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const changeTheme = (mode: "light" | "dark") => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  const changeLanguage = (lang: string) => {
    Cookies.set("NEXT_LOCALE", lang, { expires: 365 });

    const segments = pathname.split("/");
    segments[1] = lang;

    router.replace(segments.join("/"));
    setOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-teal-600 flex items-center gap-2">
            <Image src={LOGO} alt="logo" />
            DietSync
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600">
            {t("home")}
          </Link>

          <Link href={`/${locale}/about`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600">
            {t("about")}
          </Link>

          <Link href={`/${locale}/contact`} className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-teal-600">
            {t("contact")}
          </Link>
        </div>

        {/* Mobile Menu */}
        <Menu
          size={22}
          className="text-gray-500 hover:text-teal-600 cursor-pointer md:hidden"
          onClick={() => setOpenM(true)}
        />

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <Settings
            size={20}
            className="text-gray-400 hover:text-teal-600 cursor-pointer"
            onClick={() => setOpen(true)}
          />

          <Image
            src={userPic}
            alt="user"
            className="rounded-full w-9 h-9 object-cover ring-2 ring-teal-500"
          />
        </div>
      </nav>

      {/* ⚙️ SETTINGS MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-72">

            <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4">
              Settings
            </h2>

            {/* 🌍 LANGUAGE */}
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase">
              Language
            </p>

            <div className="flex flex-col gap-3 mb-5">
              {["en", "ru", "tj"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-4 py-2 rounded-lg text-left ${
                    locale === lang
                      ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {lang === "en" && "English"}
                  {lang === "ru" && "Русский"}
                  {lang === "tj" && "Тоҷикӣ"}
                </button>
              ))}
            </div>

            {/* 🌙 THEME */}
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2 uppercase">
              Theme
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => changeTheme("light")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  theme === "light"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Sun size={16} /> Light
              </button>

              <button
                onClick={() => changeTheme("dark")}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                  theme === "dark"
                    ? "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Moon size={16} /> Dark
              </button>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="mt-5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* 📱 MOBILE MENU */}
      {openM && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-900 shadow-xl z-50 p-6 md:hidden">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-6">
            Menu
          </h2>

          <div className="flex flex-col gap-4">
            <Link href={`/${locale}`} className="text-gray-700 dark:text-gray-300 font-semibold hover:text-teal-600" onClick={() => setOpenM(false)}>
              {t("home")}
            </Link>

            <Link href={`/${locale}/about`} className="text-gray-700 dark:text-gray-300 font-semibold hover:text-teal-600" onClick={() => setOpenM(false)}>
              {t("about")}
            </Link>

            <Link href={`/${locale}/contact`} className="text-gray-700 dark:text-gray-300 font-semibold hover:text-teal-600" onClick={() => setOpenM(false)}>
              {t("contact")}
            </Link>
          </div>

          <button
            onClick={() => setOpenM(false)}
            className="mt-8 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default LandingPageNav;