"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {  fetchApi } from "@/lib/api";
export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("LoginPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await fetchApi("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.success) {
      localStorage.setItem("token", data.token);
      router.push(`/${locale}/dashboard/profile-setup`);
    } else {
      alert(data.message || t("failed"));
    }
  } catch (err) {
    console.error(err);
    alert(t("error"));
  }
};
  return (
    <AuthLayout>
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full">

        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-10 relative">

          <Link
            href={`/${locale}/login`}
            className="flex-1 text-center py-2.5 rounded-full bg-white dark:bg-gray-900 shadow-sm text-[#00a884] font-bold text-sm z-10 transition-all"
          >
            {t("login")}
          </Link>

          <Link
            href={`/${locale}/register`}
            className="flex-1 text-center py-2.5 rounded-full text-gray-500 dark:text-gray-300 font-semibold text-sm hover:text-gray-700 dark:hover:text-white transition-all"
          >
            {t("signup")}
          </Link>
        </div>

        {/* Title */}
        <h2 className="text-[2rem] font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
          {t("title")}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-[0.95rem] mb-8 font-medium">
          {t("subtitle")}
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-600 dark:text-gray-300">
              {t("email")}
            </label>

            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("emailPlaceholder")}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold text-gray-600 dark:text-gray-300">
                {t("password")}
              </label>

              <a
                href="#"
                className="text-xs font-bold text-[#00a884] hover:text-[#008a6b]"
              >
                {t("forgot")}
              </a>
            </div>

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00a884]/20 focus:border-[#00a884] transition-all text-sm font-medium tracking-widest"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-[#00a884] focus:ring-[#00a884] bg-white dark:bg-gray-900"
            />
            <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300 font-bold">
              {t("remember")}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#00a884] hover:bg-[#009272] text-white py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-[#00a884]/25 mt-2"
          >
            {t("loginBtn")}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-8 font-medium">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/register`}
            className="text-[#00a884] font-bold hover:underline"
          >
            {t("signup")}
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}