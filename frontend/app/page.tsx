"use client";

import { Button } from "@/components/ui/button";
import { AuthProvider, EnokiWallet, isEnokiWallet } from "@mysten/enoki";
import {
  useConnectWallet,
  useCurrentAccount,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";

export default function Home() {
  const currentAccount = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const wallets = useWallets().filter(isEnokiWallet);

  const walletsByProvider = wallets.reduce(
    (map, wallet) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>()
  );

  const googleWallet = walletsByProvider.get("google");

  return (
    <div className="p-10">
      {currentAccount ? (
        <div className="space-y-4">
          <h1 className="font-medium">
            Connected address: {currentAccount.address}
          </h1>
          <Button onClick={() => disconnect()}>Log Out</Button>
        </div>
      ) : (
        googleWallet && (
          <Button
            onClick={() => {
              connect({ wallet: googleWallet });
            }}
          >
            Continue with Google
          </Button>
        )
      )}
    </div>
  );
}
