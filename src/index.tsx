import { Buffer } from "buffer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { WagmiProvider, useAccount } from "wagmi"
import App from './App';
import { config } from "./wagmi.ts"
import { Account } from "./components/wallet/account.tsx"
import { WalletOptions } from "./components/wallet/wallet-options.tsx"

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectWallet />
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
