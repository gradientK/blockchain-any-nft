import { useAccount } from "wagmi"
import { Account } from "../wallet/account.tsx"

export function ConnectionStatus() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <NotConnected />
}

function NotConnected() {
  return (
    <div>
      <p>
        Wallet Not Connected 
        <br />
        Connect Wallet to Access NFTs
      </p>
    </div>
  )
}