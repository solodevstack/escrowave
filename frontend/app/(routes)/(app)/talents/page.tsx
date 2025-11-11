import Image from "next/image";

import { genAvatar } from "@/lib/utils";
import { talentsData } from "@/lib/constants";

export default function Talents() {
  return (
    <div className="flex-1 py-4 lg:py-6">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-8 xl:grid-cols-3">
        {talentsData.map((talent, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 border-y border-white/50 bg-white/5 p-6 backdrop-blur-lg"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-px">
                <p className="text-lg font-medium">{talent.position}</p>
                <span className="text-muted-foreground text-sm">
                  {talent.jobsCompleted} jobs completed
                </span>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex size-20 items-center rounded-full border bg-white/15 p-1">
                  <Image
                    src={String(genAvatar(talent.name))}
                    alt={talent.name}
                    width={80}
                    height={80}
                    priority
                    quality={100}
                    className="size-full rounded-full"
                  />
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {talent.name}
                </p>
              </div>
            </div>

            <p className="text-lg font-medium">{talent.bio}</p>

            <div className="mt-auto ml-auto flex items-center gap-1">
              <p className="text-base font-medium">Expert</p>
              <Image
                src="/images/badge.png"
                alt="badge"
                width={24}
                height={24}
                priority
                quality={100}
                className="size-6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
