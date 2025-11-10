"use client";

import React from "react";
import { Wrapper } from "./wrapper";
import { SignInButton } from "./sign-in-button";
import Image from "next/image";
import { siteConfig } from "@/config/site.config";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full py-4">
      <Wrapper size="lg" className="size-full">
        <nav className="flex items-center justify-between gap-10 py-2">
          <div className="max-w-[230px] w-full ">
            <Link href="/" className="flex items-center gap-2 w-max">
              <Image
                src="/favicon.svg"
                alt={siteConfig.title}
                width={52}
                height={22}
                priority
                quality={100}
              />
              <p className="font-bold text-lg">{siteConfig.title}</p>
            </Link>
          </div>
          {/* <div className="flex-1 flex items-center justify-center">
            Input Field
          </div> */}
          <div className="max-w-[230px] w-full flex justify-end">
            <SignInButton />
          </div>
        </nav>
      </Wrapper>
    </header>
  );
};
