// components/theme-provider.tsx  (now a client component again)
"use client";
import { ClientThemeProvider } from "@wrksz/themes/client";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ClientThemeProvider>
  );
}