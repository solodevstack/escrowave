import { Wrapper } from "@/components/shared/wrapper";
import { formatAddr, genAvatar } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export const ProfileCard: React.FC<{
  user: {
    name: string;
    position: string;
    jobsCompleted: number;
    bio: string;
    address: string;
  };
}> = ({ user: { name, position, jobsCompleted, bio, address } }) => {
  return (
    <div className="flex flex-col">
      <Wrapper size="sm" className="mx-0 px-0!">
        <div className="-mb-[70px] h-[200px] w-full max-w-3xl rounded-2xl border bg-[#A1A5EEDB] backdrop-blur-lg"></div>
        <div className="mb-10 flex w-max flex-col items-center gap-4 pl-6">
          <div className="size-[150px] rounded-full border bg-white/15 p-px backdrop-blur-lg">
            <Image
              src={String(genAvatar(address))}
              alt={name}
              width={150}
              height={150}
              priority
              quality={100}
              className="size-full rounded-full"
            />
          </div>

          <p className="text-xl font-medium">{name || formatAddr(address)}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-4 xl:grid-cols-4">
          <div className="flex items-center gap-4 border border-white/15 px-4 py-6 backdrop-blur-sm">
            <Image
              src="/images/jobs.png"
              alt="active jobs"
              width={44}
              height={44}
              priority
              quality={100}
            />
            <div className="flex flex-col gap-px">
              <p className="font-old text-lg leading-none">10</p>
              <p className="text-muted-foreground text-sm">Active Jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-white/15 px-4 py-6 backdrop-blur-sm">
            <Image
              src="/images/completed.png"
              alt="completed jobs"
              width={44}
              height={44}
              priority
              quality={100}
            />
            <div className="flex flex-col gap-px">
              <p className="font-old text-lg leading-none">{jobsCompleted}</p>
              <p className="text-muted-foreground text-sm">Completed Jobs</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-white/15 px-4 py-6 backdrop-blur-sm">
            <Image
              src="/images/dolar.png"
              alt="dolar"
              width={44}
              height={44}
              priority
              quality={100}
            />
            <div className="flex flex-col gap-px">
              <p className="font-old text-lg leading-none">$5,000</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-white/15 px-4 py-6 backdrop-blur-sm">
            <Image
              src="/images/dispute.png"
              alt="dispute"
              width={44}
              height={44}
              priority
              quality={100}
            />
            <div className="flex flex-col gap-px">
              <p className="font-old text-lg leading-none">10</p>
              <p className="text-muted-foreground text-sm">Disputed Jobs</p>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};
