import { WalletOptions } from "../wallet/wallet-options.tsx"

export default function Reconnect() {
  return (
    <div className="wallet-connect-container">
      <h3>Connect Your Wallet</h3>
      <p>Choose a wallet to connect to the marketplace</p>
      <WalletOptions />
    </div>
  )
}