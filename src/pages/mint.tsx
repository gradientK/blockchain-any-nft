import { useAccount } from "wagmi"
import { Reconnect } from "./../components/reconnect.tsx"
import POLYGON_AMOY_NFT_GRAM_SMART_CONTRACT_ADDRESS from "./../config/config.json"

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