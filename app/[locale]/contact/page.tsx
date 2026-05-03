"use client";

import LandingPageNav from "@/components/landingPageNav";
import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();

  return (
<div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 font-sans text-gray-800 dark:text-gray-200 flex flex-col">      <LandingPageNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">

        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight dark:text-teal-400">
            {t("title1")} <span className="text-teal-500 dark:text-gray-500">{t("title2")}</span>
          </h1>
          <p className="text-gray-500 text-lg">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT INFO */}
          <div className="space-y-8">

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border flex gap-6">
              <MapPin className="text-teal-600" />
              <div>
                <h3 className="font-bold">{t("visitTitle")}</h3>
                <p className="text-gray-500">
                  {t("visitAddress1")} <br />
                  {t("visitAddress2")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border flex gap-6">
              <Phone className="text-lime-600" />
              <div>
                <h3 className="font-bold">{t("callTitle")}</h3>
                <p className="text-gray-500">
                  {t("phone")} <br />
                  {t("hours")}
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border flex gap-6">
              <Mail className="text-cyan-600" />
              <div>
                <h3 className="font-bold">{t("emailTitle")}</h3>
                <p className="text-gray-500">
                  {t("email1")} <br />
                  {t("email2")}
                </p>
              </div>
            </div>

          </div>

          {/* FORM */}
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 shadow-lg border">

            <h3 className="text-2xl font-bold mb-6">
              {t("formTitle")}
            </h3>

            <form className="space-y-6">

              <input
                type="text"
                placeholder={t("namePlaceholder")}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border dark:bg-gray-800"
              />

              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border dark:bg-gray-800"
              />

              <textarea
                rows={4}
                placeholder={t("messagePlaceholder")}
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border dark:bg-gray-800"
              />

              {/* FIXED LINK (optional redirect-safe button) */}
              <Link href={`/${locale}`}>
                <button
                  type="button"
                  className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  {t("sendBtn")}
                  <Send size={18} />
                </button>
              </Link>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}