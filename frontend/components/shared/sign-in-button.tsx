"use client";

import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { AuthProvider, EnokiWallet, isEnokiWallet } from "@mysten/enoki";
import { FcGoogle } from "react-icons/fc";
import { formatAddr, genAvatar } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  return currentAccount ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={currentAccount.icon} />
          <AvatarFallback>EW</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          Address: {formatAddr(currentAccount.address)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => disconnect()}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    googleWallet && (
      <Button
        variant={"secondary"}
        isLoading={isPending}
        loadingText="Please wait..."
        onClick={() => connect({ wallet: googleWallet })}
      >
        <FcGoogle className="size-5" />
        <span>Sign In</span>
      </Button>
    )
  );
};
