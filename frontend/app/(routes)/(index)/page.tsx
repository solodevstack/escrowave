import Link from "next/link";

import { Wrapper } from "@/components/shared/wrapper";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20">
      <Wrapper size={"lg"} className="flex flex-col items-center gap-5">
        <h1 className="max-w-7xl text-center font-mono text-6xl leading-[1.2]">
          FREELANCE AND TRANSACT DATA SECURELY
        </h1>
        <p className="text-lg">The future of escrow is decentralized</p>

        <div className="mt-20 grid w-full max-w-[778px] grid-cols-4 gap-8">
          <div />
          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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

          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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
          <div />

          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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
          <div className="col-span-2 flex items-center justify-center">
            <Link
              href="/talents"
              className={buttonVariants({
                size: "lg",
                variant: "secondary",
                className: "w-max",
              })}
            >
              Launch App
            </Link>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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

          <div />
          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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
          <div className="flex w-full flex-col gap-4 rounded-2xl border p-4">
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
          <div />
        </div>
      </Wrapper>
    </div>
  );
}
