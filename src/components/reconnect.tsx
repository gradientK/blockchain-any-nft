import { WalletOptions } from "./wallet/wallet-options.tsx"

export function Reconnect() {
  return (
    <div>
      Connect MetaMask Wallet
      <br />
      <WalletOptions />
    </div>
  )
}