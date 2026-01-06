import { createConfig } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { http } from "viem";
import { InjectedConnector } from "@wagmi/connectors/injected";

// Cast mainnet array to satisfy TS tuple requirement
export const chains = [mainnet] as [typeof mainnet, ...typeof mainnet[]];

export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    new InjectedConnector({ chains }) as any, // TS type workaround
  ],
});
