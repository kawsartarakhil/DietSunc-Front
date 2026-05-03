"use client";

import LandingPageNav from "@/components/landingPageNav";
import React from "react";
import {
  Activity,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import LandingPagePic1 from "@/public/landingPic1.png";
import MealRecomanditionPic from "@/public/Meal Recommendation.png";
import Avtar1 from "@/public/Avatar.png";
import Avtar2 from "@/public/Avatar (1).png";
import Avtar3 from "@/public/Avatar (2).png";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  const path = (p: string) => `/${locale}${p}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 font-sans text-gray-800 dark:text-gray-200 overflow-hidden dark:bg-gray-900">
      <LandingPageNav />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-28 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-bold tracking-widest uppercase">
            <Activity size={14} />
            {t("badge")}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {t("title1")} <span className="text-teal-500">{t("title2")}</span>{" "}
            {t("title3")}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
            {t("description")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href={`/${locale}/register`}>
              <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-teal-500/20">
                {t("getStarted")}
              </button>
            </Link>
            <Link href={`/${locale}/login`}>
              <button className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-teal-600 border border-teal-200 dark:border-gray-700 px-8 py-4 rounded-full font-bold transition-all">
                {t("login")}
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              {[Avtar1, Avtar2, Avtar3].map((img, i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-sm"
                >
                  <Image src={img} alt="user" fill className="object-cover" />
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {t("users")}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full relative max-w-2xl">
          <div className="relative backdrop-blur-xl p-4 rounded-[2.5rem]">
            <Image
              src={LandingPagePic1}
              alt="Healthy Bowl"
className="rounded-[2rem] w-full object-cover dark:opacity-50"           
 />  

            <div className="absolute -bottom-6 left-8 right-8">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-gray-200 text-sm">
                    {t("dailyProgress")}
                  </h3>
                  <div className="flex gap-4 text-xs font-bold mt-1.5">
                    <span className="text-orange-500">🔥 {t("kcal")}</span>
                    <span className="text-red-500">🥩 {t("protein")}</span>
                  </div>
                </div>
                <span className="text-teal-500 font-extrabold text-2xl">
                  75%
                </span>
              </div>

              <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full w-[75%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50/50 dark:bg-gray-900 py-32 mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white">
              {t("featuresTitle")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">{t("featuresDesc")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t("smartMeals")}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t("smartMealsDesc")}</p>
              <Image src={MealRecomanditionPic} alt="" className="dark:opacity-45 rounded-4xl mt-4"/>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border dark:border-gray-700">
              <MapPin className="text-gray-800 dark:text-gray-200" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t("mealGenerator")}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("mealGeneratorDesc")}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border dark:border-gray-700">
              <Calendar className="text-gray-800 dark:text-gray-200" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{t("dailyPlans")}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t("dailyPlansDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f766e] dark:bg-teal-900 text-white py-24 px-6 mt-12">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold">{t("ctaTitle")}</h2>
          <p className="text-teal-100 dark:text-teal-300">{t("ctaDesc")}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href={path("/register")}>
              <button className="bg-white dark:bg-gray-800 text-teal-800 dark:text-teal-300 px-8 py-4 rounded-full font-bold">
                {t("ctaBtn")}
              </button>
            </Link>

            <button className="bg-teal-800 dark:bg-teal-700 text-white px-8 py-4 rounded-full font-bold">
              {t("pricing")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}