import { http, createConfig } from "wagmi";
import { avalanche, avalancheFuji, polygon, polygonAmoy } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [avalanche, avalancheFuji, polygon, polygonAmoy],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "Any NFT",
        url: "window.location.href",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    }),
  ],
  transports: {
    [avalanche.id]: http(),
    [avalancheFuji.id]: http(),
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
  },
})
