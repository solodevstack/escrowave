"use client";

import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import Image from "next/image";
import { Copy } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { copyToClipoard, formatAddr, genAvatar } from "@/lib/utils";
import { AuthProvider, EnokiWallet, isEnokiWallet } from "@mysten/enoki";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const SignInButton = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: connect, isPending } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets().filter(isEnokiWallet);

  const walletsByProvider = wallets.reduce(
    (map, wallet) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>(),
  );

  const googleWallet = walletsByProvider.get("google");

  return (
    <div className="flex items-center">
      <div className="flex items-center gap-2">
        <Button size={"icon-lg"} variant={"outline"} className="rounded-full">
          <Image
            src="/images/messages.png"
            alt="messages"
            width={26}
            height={26}
            priority
            quality={100}
          />
        </Button>
        <Button size={"icon-lg"} variant={"outline"} className="rounded-full">
          <Image
            src="/images/notifications.png"
            alt="notifications"
            width={26}
            height={26}
            priority
            quality={100}
          />
        </Button>
      </div>

      {currentAccount ? (
        <>
          <Separator orientation="vertical" className="mx-4 h-8!" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={String(genAvatar(currentAccount.address as string))}
                />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex items-center gap-1">
                Address: {formatAddr(currentAccount.address)}{" "}
                <Copy
                  className="ml-2 size-4 cursor-pointer"
                  onClick={() =>
                    copyToClipoard(
                      currentAccount?.address,
                      "Address copied successfully!",
                    )
                  }
                />
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Launch App</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => disconnect()}>
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        googleWallet && (
          <>
            <Separator orientation="vertical" className="mx-4 h-8!" />
            <Button
              isLoading={isPending}
              loadingText="Connecting..."
              onClick={() => connect({ wallet: googleWallet })}
            >
              <FcGoogle className="size-5" />
              <span>Sign In</span>
            </Button>
          </>
        )
      )}
    </div>
  );
};
