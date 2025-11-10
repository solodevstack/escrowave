"use client";

import React from "react";
import { Wrapper } from "./wrapper";
import { SignInButton } from "./sign-in-button";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full py-2 md:py-4">
      <Wrapper size="lg" className="size-full">
        <nav className="flex items-center justify-between gap-10 py-2">
          <div className="w-full max-w-[180px] lg:max-w-[230px]">
            <Link href="/" className="flex w-max items-center gap-2">
              <Image
                src="/favicon.svg"
                alt={siteConfig.title}
                width={52}
                height={22}
                priority
                quality={100}
                className="h-8 w-10 md:h-[22px] md:w-[52px]"
              />
              <p className="text-base font-bold md:text-lg">
                {siteConfig.title}
              </p>
            </Link>
          </div>
          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="relative h-14 w-full max-w-md lg:max-w-xl">
              <Input
                className="size-full rounded-full bg-white/15 pr-14 pl-6"
                placeholder="Search for any service..."
              />
              <Search className="text-muted-foreground absolute top-1/2 right-5 size-6 -translate-y-1/2" />
            </div>
          </div>
          <div className="flex w-full max-w-[180px] justify-end lg:max-w-[230px]">
            <SignInButton />
          </div>
        </nav>
      </Wrapper>
    </header>
  );
};
