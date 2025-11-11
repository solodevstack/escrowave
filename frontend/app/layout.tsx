import type { Metadata } from "next";
import NextjsTopLoader from "nextjs-toploader";

import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/config/site.config";
import { Header } from "@/components/shared/header";
import SuiProvider from "@/components/provider/sui.provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "text-foreground group/body min-h-screen overscroll-none bg-[url('/background.jpg')] bg-cover bg-fixed bg-no-repeat font-sans antialiased",
          fontVariables,
        )}
      >
        <Toaster richColors theme="dark" />
        <NextjsTopLoader showSpinner={false} color="var(--primary)" />
        <SuiProvider>
          <Header />
          {children}
        </SuiProvider>
      </body>
    </html>
  );
}
