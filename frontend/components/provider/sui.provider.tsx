"use client";

import * as React from "react";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { networkConfig } from "@/config/network.config";
import { RegisterEnokiWallets } from "@/components/shared/register-enoki-wallets";

const queryClient = new QueryClient();

export default function SuiProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [activeNetwork, setActiveNetwork] = React.useState(
    "testnet" as keyof typeof networkConfig
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        network={activeNetwork}
        onNetworkChange={(network) => {
          setActiveNetwork(network);
        }}
      >
        <RegisterEnokiWallets />
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
