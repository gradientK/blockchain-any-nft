import { useAccount } from "wagmi"
import { Reconnect } from "../components/reconnect.tsx"
import { GetContractOwner, GetRoyalty, GetTotalMinted } from "../utilities/contract-interface.tsx"

export function Owner() {
  const { isConnected } = useAccount()
  if (isConnected) return <OwnerMain />
  return <Reconnect />
}

function OwnerMain() {
  const { address } = useAccount()

  const owner = GetContractOwner() as string
  const minted = GetTotalMinted() as unknown as String
  const royalty = GetRoyalty(address)

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
