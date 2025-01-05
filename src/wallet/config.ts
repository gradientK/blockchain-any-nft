import { http, createConfig } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

export const config = createConfig({
  chains: [polygonAmoy],
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
    [polygonAmoy.id]: http(),
  },
})
