import type { Metadata } from "next";

import "@/styles/globals.css";
import SuiProvider from "@/components/provider/sui.provider";
import { siteConfig } from "@/config/site.config";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/fonts";
import { Header } from "@/components/shared/header";

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
          "text-foreground group/body overscroll-none font-sans antialiased",
          fontVariables
        )}
      >
        <SuiProvider>
          <Header />
          {children}
        </SuiProvider>
      </body>
    </html>
  );
}
