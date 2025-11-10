"use client";

import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { AuthProvider, EnokiWallet, isEnokiWallet } from "@mysten/enoki";

export const SignInButton = () => {
  const currentAccount = useCurrentAccount();
  const { mutate: connect, isPending } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets().filter(isEnokiWallet);

  const walletsByProvider = wallets.reduce(
    (map, wallet) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>()
  );

  const googleWallet = walletsByProvider.get("google");

  return currentAccount ? (
    <Button onClick={() => disconnect()}>Log Out</Button>
  ) : (
    googleWallet && (
      <Button
        isLoading={isPending}
        loadingText="Signing in..."
        onClick={() => connect({ wallet: googleWallet })}
      >
        Sign in with Google
      </Button>
    )
  );
};
