import React, { ReactNode } from 'react';
import Image from 'next/image';
import authPic from '../public/authPic.jpg';
import { useTranslations } from 'next-intl';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const t = useTranslations("authPage")
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ebf5f0] via-[#f7fdf9] to-[#ebf5f0] dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex items-center justify-center p-6 font-sans">

      <div className="max-w-[1100px] w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <div className="flex-1 max-w-lg w-full text-center lg:text-left">
          <h1 className="text-4xl lg:text-[2.75rem] font-bold text-[#00826b] dark:text-teal-400 mb-4 tracking-tight leading-tight">
            DietSync
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base lg:text-[1.05rem] mb-8 lg:mb-10 leading-relaxed font-medium">
             {t("description")}
          </p>
          
          <div className="hidden md:block relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image 
              src={authPic} 
              alt="Healthy Bowl" 
              className="w-full h-auto object-cover scale-[1.02] dark:opacity-70"
            />
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          {children}
        </div>
        
      </div>
    </div>
  );
}