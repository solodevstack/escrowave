import { talentsData } from "@/lib/constants";
import { genAvatar } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
import { ProfileCard } from "../_components/profile-card";

interface Props {
  params: Promise<{ address: string }>;
}

const returnTalent = (address: string) => {
  if (!address) redirect("/profile");
  const result = talentsData.find((talent) => talent.address === address);
  if (!result) redirect("/profile");
  return result;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const result = returnTalent((await params).address);

  return {
    title: result.name as string,
    description: result.bio,
    openGraph: {
      type: "website",
      title: result.name,
      description: result.bio,
      images: String(genAvatar(result.address)),
    },
  };
};

export default async function TalentDetails({ params }: Props) {
  const result = returnTalent((await params).address);

  return (
    <div className="flex-1">
      <ProfileCard user={result} />
    </div>
  );
}
