import { useAccount } from "wagmi"
import { Reconnect } from "../components/reconnect.tsx"
import { GetContractOwner, GetTotalMinted } from "../utilities/contract-interface.tsx"

export function Owner() {
  const { isConnected } = useAccount()
  if (isConnected) return <OwnerMain />
  return <Reconnect />
}

function OwnerMain() {
  const owner = GetContractOwner() as string
  const minted = GetTotalMinted() as unknown as String

  return (
    <div>
      Contract Owner: {owner}
      <p />
      Total Minted: {minted}
    </div>
  )
}
