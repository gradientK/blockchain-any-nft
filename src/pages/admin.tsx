import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"
import { 
  GetContractOwner, GetRoyalty, GetTotalMinted, GetTotalMintable 
} from "../utilities/contract-interface.tsx"

export default function AdminMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Admin />
  return <Reconnect />
}

function Admin() {
  const { address } = useAccount()

  const owner: string = GetContractOwner()
  const royalty: String = String(GetRoyalty(address))
  const minted: String = String(GetTotalMinted())
  const mintable: String = String(GetTotalMintable(address))

  if (owner === address) {
    return (
      <div>
        Contract Owner: {owner}
        <br />
        Royalty Percentage: {royalty}
        <br />
        Total Minted: {minted}
        <br />
        Total Mintable: {mintable}
      </div>
    )
  } else {
    return (
      <div>
        NftGram Smart Contract
      </div>
    )
  }
}
