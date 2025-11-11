import Link from "next/link";

import { Wrapper } from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20">
      <Wrapper size={"lg"} className="flex flex-col items-center gap-5">
        <h1 className="max-w-5xl text-center font-mono text-4xl leading-[1.2] md:max-w-7xl md:text-5xl lg:text-6xl">
          FREELANCE AND TRANSACT DATA SECURELY
        </h1>
        <p className="text-lg">The future of escrow is decentralized</p>

        <div className="flex items-center justify-center md:hidden">
          <Link
            href="/talents"
            className={buttonVariants({
              size: "lg",
              variant: "default",
              className: "w-max",
            })}
          >
            Launch App
          </Link>
        </div>

        <div className="mt-10 grid w-full max-w-[878px] gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-8">
          <div className="hidden md:flex" />
          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">DEVELOPERS</p>

              <Image
                src="/home/developers.png"
                alt="developers"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>

          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">WRITERS</p>

              <Image
                src="/home/writer.png"
                alt="writer"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>
          <div className="hidden md:flex" />

          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">NFT ARTIST</p>

              <Image
                src="/home/nft.png"
                alt="nft"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>
          <div className="hidden items-center justify-center md:col-span-2 md:flex">
            <Link
              href="/talents"
              className={buttonVariants({
                size: "lg",
                variant: "default",
                className: "w-max",
              })}
            >
              Launch App
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">MARKETERS</p>

              <Image
                src="/home/marketers.png"
                alt="marketers"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>

          <div className="hidden md:flex" />
          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">AI</p>

              <Image
                src="/home/ai.png"
                alt="ai"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-2xl border bg-[#FFFFFF26] p-4 backdrop-blur-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium uppercase">COMMUNITY MANAGER</p>

              <Image
                src="/home/manager.png"
                alt="manager"
                width={40}
                height={40}
                priority
                quality={100}
              />
            </div>

            <p className="text-base font-medium">export</p>
          </div>
          <div className="hidden md:flex" />
        </div>
      </Wrapper>
    </div>
  );
}
