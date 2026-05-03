"use client";

import ThemeProvider from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: any;
  locale: string;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="Asia/Dushanbe"
    >
      <ThemeProvider>{children}</ThemeProvider>
    </NextIntlClientProvider>
  );
}