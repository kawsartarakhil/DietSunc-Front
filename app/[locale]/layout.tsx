import Providers from "@/components/Providers";
import { ThemeProvider } from "@wrksz/themes/next";   // 👈 server component provider
import React from "react";
import "./globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = {};
  }

  return (
    <html lang={locale} suppressHydrationWarning>   
      <body className="bg-white dark:bg-black transition-colors">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers messages={messages} locale={locale}>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}