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
        Return to Home to connect wallet
      </p>
    </div>
  )
}