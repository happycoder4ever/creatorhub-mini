import { createConfig } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { http } from "viem";
import { injected } from "@wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    injected(),
  ],
});
