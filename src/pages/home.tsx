import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetNft, GetNftsOwned } from "../utilities/contract-interface.tsx"
import NftPreview from "../components/ui/nft-preview.tsx"

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) return <Home />
  return <Reconnect />
}

function Home() {
  const nftsOwned: readonly bigint[] = GetNftsOwned()
  const firstId: any = nftsOwned.at(0)
  let nftData: readonly [bigint, bigint, bigint, string, string, string] | undefined

  if (firstId !== BigInt(-1) && firstId !== undefined) {
    nftData = GetNft(firstId)

    const tokenId = nftData?.at(0) as bigint
    const name: string = nftData?.at(3) as string

    return (
      <div>
        <NftPreview tokenId={tokenId} name={name} />
      </div>
    )
  } else {
    return (
      <div>No NFTs owned</div>
    )
  }

}
