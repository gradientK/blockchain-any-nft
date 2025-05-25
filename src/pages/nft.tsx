import { useSearchParams } from "react-router";
import { Link } from 'react-router-dom';
import { GetNft } from "../utilities/contract-interface.tsx"
import { IsBigInt } from "../utilities/misc-util.tsx"

let token: string | null
let nftData: readonly [bigint, bigint, bigint, string, string, string] | undefined

export default function NftMain() {
  const [searchParams] = useSearchParams()
  token = searchParams.get("token")
  return <Nft />
}

function Nft() {
  if (token === null) {
    return (
      <div>
        <span>
          No NFT Token ID provided
          <br></br>
          <Link to="/">Go Home</Link>
        </span>
      </div>
    )
  } else if (IsBigInt(token)) {

    nftData = GetNft(BigInt(token))    
    const tokenId: bigint = nftData?.at(0) as bigint
    const price: bigint = nftData?.at(1) as bigint
    const saleIndex: bigint = nftData?.at(2) as bigint
    const name: string = nftData?.at(3) as string
    const description: string = nftData?.at(4) as string
    const uri: string = nftData?.at(5) as string

    const idString: string | undefined = tokenId as unknown as string
    const priceString: string | undefined = price as unknown as string
    const saleIndexString: string | undefined = saleIndex as unknown as string
    return (
      <div>
        <p>Token ID is {idString}</p>
        <p>Name is {name}</p>
        <p>Description is {description}</p>
        <p>Price is {priceString}</p>
        <p>Image URI is {uri}</p>
        <p>Sale index is {saleIndexString}</p>
      </div>
    )
  } else {
    return (
      <div>
        Invalid 'token' ID provided
      </div>
    )
  }
}