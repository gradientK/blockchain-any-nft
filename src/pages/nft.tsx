import { useSearchParams } from "react-router";
import { ethers } from "ethers"
import { Link } from 'react-router-dom';
import { GetNft } from "../utilities/contract-interface.tsx"
import { IsBigInt } from "../utilities/misc-util.tsx"

let token: string | null
let nftData: readonly [bigint, string, bigint, bigint, string, string, string] | undefined

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
    const owner: string = nftData?.at(1) as string
    const price: bigint = nftData?.at(2) as bigint
    const saleIndex: bigint = nftData?.at(3) as bigint
    const name: string = nftData?.at(4) as string
    const description: string = nftData?.at(5) as string
    const uri: string = nftData?.at(6) as string

    const idString: string = String(tokenId)
    const saleIndexString: string = String(saleIndex)
    let priceInWei: string = ethers.formatEther(price)

    return (
      <div>
        <img
          src={ uri }
          alt={ uri }
          style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
        />
        <p>Token ID: {idString}</p>
        <p>Owner: {owner}</p>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <p>Price: {priceInWei}</p>
        <p>Sale index: {saleIndexString}</p>
        <p>Image URI: {uri}</p> 
        <p>---- Add functionality to Put up for sale or Remove for sale ----</p> 
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