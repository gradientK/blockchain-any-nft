import { Buffer } from "buffer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { WagmiProvider } from "wagmi"
import App from './App';
import { config } from "./wagmi.ts"

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <ConnectWallet /> */}
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
