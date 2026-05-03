"use client";

import LandingPageNav from "@/components/landingPageNav";
import React from "react";
import { Users, Target, Shield, Heart, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("AboutPage");

  return (
<div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 font-sans text-gray-800 dark:text-gray-200 flex flex-col">      <LandingPageNav />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-20 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold tracking-widest uppercase">
            <Heart size={14} />
            {t("missionBadge")}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t("heroTitle1")}{" "}
            <span className="text-teal-500">{t("heroTitle2")}</span>{" "}
            {t("heroTitle3")}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed">
            {t("heroDesc")}
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-8 lg:p-16 shadow-sm border border-gray-100   dark:border-gray-800 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {t("storyTitle")}
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{t("story1")}</p>
                <p>{t("story2")}</p>
                <p>{t("story3")}</p>
              </div>
            </div>

            <div className="relative aspect-square md:aspect-[4/3] rounded-[2rem] bg-teal-100 overflow-hidden flex items-center justify-center p-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-lime-500/20 mix-blend-multiply"></div>

              <div className="relative z-10 text-center space-y-4">
                <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-3xl flex items-center justify-center text-teal-500 mx-auto shadow-xl rotate-3">
                  <Target size={48} />
                </div>

                <h3 className="text-2xl font-bold text-teal-900">
                  {t("storyCardTitle1")}
                  <br />
                  {t("storyCardTitle2")}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12 mb-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {t("valuesTitle")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100   dark:border-gray-800 transition-all hover:bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                <Users size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("communityTitle")}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {t("communityDesc")}
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100   dark:border-gray-800 transition-all hover:bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-lime-100 rounded-2xl flex items-center justify-center text-lime-600 mb-6">
                <Shield size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("scienceTitle")}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {t("scienceDesc")}
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-3xl p-8 border border-gray-100   dark:border-gray-800 transition-all hover:bg-white dark:bg-gray-900 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 bg-cyan-100 rounded-2xl flex items-center justify-center text-cyan-600 mb-6">
                <Zap size={24} />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("innovationTitle")}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm">
                {t("innovationDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-slate-900 text-white rounded-[3rem] p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-extrabold text-teal-400">10k+</div>
              <div className="text-slate-400 font-medium">{t("activeUsers")}</div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-extrabold text-lime-400">5M+</div>
              <div className="text-slate-400 font-medium">{t("mealsPlanned")}</div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-extrabold text-cyan-400">98%</div>
              <div className="text-slate-400 font-medium">{t("satisfaction")}</div>
            </div>

            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-extrabold text-teal-400">24/7</div>
              <div className="text-slate-400 font-medium">{t("support")}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}