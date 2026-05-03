'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Utensils,
  User,
  LogOut,
  Heart,
  HomeIcon,
  Menu,
  X,
} from 'lucide-react';
import Image from 'next/image';
import MainLOGO from '@/public/MainLOGO.png';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { locale } = useParams();
  const router = useRouter();
  const t = useTranslations('Sidebar');

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme ?? 'light';

    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  return (
    <>

      {/* 🍔 HAMBURGER */}
      <div className={`md:hidden fixed top-4 left-4 z-50 ${open ? 'hidden' : 'block'}`}>
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-transparent rounded-xl shadow border border-gray-200 dark:border-gray-700"
        >
          <Menu size={22} className="text-gray-700 dark:text-gray-200" />
        </button>
      </div>

      {/* 🧊 SIDEBAR */}
      <div
        className={`w-64 max-w-[85%] bg-white dark:bg-gray-900 h-screen border-r border-gray-100 dark:border-gray-700 flex flex-col fixed top-0 z-40 transform transition-transform duration-300 shadow-xl
        ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* HEADER */}
        <div className="p-5 pb-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg font-extrabold text-[#0bb28a] dark:text-teal-400 flex items-center gap-2">
            <Image src={MainLOGO} alt="DietSync Logo" width={22} height={22} />
            DietSync
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <SidebarLink href={`/${locale}/dashboard`} icon={<LayoutDashboard size={18} />} text={t('dashboard')} active={pathname === `/${locale}/dashboard`} onClick={() => setOpen(false)} />
          <SidebarLink href={`/${locale}/dashboard/meals`} icon={<Utensils size={18} />} text={t('meals')} active={pathname === `/${locale}/dashboard/meals`} onClick={() => setOpen(false)} />
          <SidebarLink href={`/${locale}/dashboard/favorites`} icon={<Heart size={18} />} text={t('favorites')} active={pathname === `/${locale}/dashboard/favorites`} onClick={() => setOpen(false)} />
          <SidebarLink href={`/${locale}/dashboard/profile-setup`} icon={<User size={18} />} text={t('profile')} active={pathname === `/${locale}/profile-setup`} onClick={() => setOpen(false)} />
          <SidebarLink href={`/${locale}/`} icon={<HomeIcon size={18} />} text={t('home')} active={pathname === `/${locale}`} onClick={() => setOpen(false)} />
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <SidebarLink
            href="/login"
            icon={<LogOut size={18} />}
            text={t('logout')}
            active={false}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>

      {/* 🌑 OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 dark:bg-black/60 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}

function SidebarLink({ href, icon, text, active, onClick }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-3 rounded-xl font-semibold text-sm transition-all ${
        active
          ? 'bg-[#edf6f1] text-[#0bb28a] dark:bg-gray-800 dark:text-teal-400'
          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
      }`}
    >
      {icon}
      <span className="truncate">{text}</span>
    </Link>
  );
}