import { Sidebar } from "@/components/shared/sidebar";
import { Wrapper } from "@/components/shared/wrapper";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-1">
      <Wrapper className="flex gap-8" size="lg">
        <Sidebar />
        <main className="flex w-full flex-col">{children}</main>
      </Wrapper>
    </div>
  );
}
