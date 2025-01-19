import { useAccount } from "wagmi"
import { Reconnect } from "./../components/reconnect.tsx"

export function Mint() {
  const { isConnected } = useAccount()
  if (isConnected) return <MintMain />
  return <Reconnect />
}

function MintMain() {
  return (
    <div>
      4 fields and mint button go here
    </div>
  )
}