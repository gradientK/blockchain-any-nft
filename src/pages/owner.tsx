import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetContractOwner, GetRoyalty, GetTotalMinted } from "../utilities/contract-interface.tsx"

export default function OwnerMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Owner />
  return <Reconnect />
}

function Owner() {
  const { address } = useAccount()

  const owner = GetContractOwner() as string
  const minted = GetTotalMinted() as unknown as String
  const royalty = GetRoyalty(address) as `0x${string}`

  return (
    <div>
      Contract Owner: {owner}
      <br />
      Royalty Percentage: {royalty}
      <br />
      Total Minted: {minted}
    </div>
  )
}
