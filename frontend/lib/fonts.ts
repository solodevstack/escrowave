import { Inter, Climate_Crisis } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Climate_Crisis({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontVariables = cn(fontSans.variable, fontMono.variable);
