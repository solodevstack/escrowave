"use client";

import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { usePathname } from "next/navigation";
import { isActivePath } from "@/lib/utils";
import Image from "next/image";

const routes = [
  {
    name: "Profile",
    path: "/profile",
    icon: "/routes/profile.png",
  },
  {
    name: "Find Talents",
    path: "/talents",
    icon: "/routes/talent.png",
  },
  {
    name: "Escrows",
    path: "/escrow",
    icon: "/routes/escrow.png",
  },
  {
    name: "Post Job",
    path: "/new-job",
    icon: "/routes/job.png",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-foreground/15 sticky top-26 h-max w-full max-w-xs rounded-3xl border px-6 py-10 backdrop-blur-lg">
      <div className="flex flex-col gap-2">
        {routes.map((route) => {
          const isActive = isActivePath(route.path, pathname);

          return (
            <Link
              href={route.path}
              key={route.path}
              className={buttonVariants({
                size: "lg",
                variant: isActive ? "secondary" : "ghost",
                className: "justify-start gap-4! rounded-full! pl-4!",
              })}
            >
              <Image
                src={route.icon}
                alt={route.name}
                width={24}
                height={24}
                priority
                quality={100}
              />
              <span className="font-medium">{route.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};
