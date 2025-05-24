import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetNft, GetNftsOwned } from "../utilities/contract-interface.tsx"
import NftPreview from "../components/ui/nft-preview.tsx"

let nftsOwned: readonly bigint[]

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) {
    nftsOwned = GetNftsOwned()
    return <Home />
  }
  return <Reconnect />
}

function Home() {
  let firstId: any = nftsOwned.at(0)
  let nftData: readonly [bigint, bigint, bigint, string, string, string] | undefined

  if (firstId !== BigInt(-1) && firstId !== undefined) {
    nftData = GetNft(BigInt(1))
    const tokenId: bigint = nftData?.at(0) as bigint
    const price: bigint = nftData?.at(1) as bigint
    const saleIndex: bigint = nftData?.at(2) as bigint
    const name: string = nftData?.at(3) as string
    const description: string = nftData?.at(4) as string
    const uri: string = nftData?.at(5) as string

    return (
      <div>
        <NftPreview tokenId={tokenId} price={price} saleIndex={saleIndex} name={name} description={description} uri={uri} />
      </div>
    )
  } else {
    return (
      <div>No NFTs owned</div>
    )
  }

}
