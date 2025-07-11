import PreviewHomeNft from "./preview-home-nft.tsx"
import { GetNineNFTs } from "../../utilities/contract-interface.tsx"
import { ReplaceZeros, DedupArray } from "../../utilities/misc-util.tsx"

export default function Preview({ ids, size }: { ids: bigint[], size: number }) {
  if (ids.length != size) {
    console.error("NFTs owned home preview page defined incorrect number of NFT data to retrieve")
    return ( 
      <div>
        Something went wrong, could not retrieve your NFTs
      </div>
    )
  }

  // ex. [3,5,7,8,11,14,0,0,0] becomes [3,5,7,8,11,14,3,3,3]
  let replacedIds: bigint[] = ReplaceZeros(ids)
  let priceNameUri = GetNineNFTs(
    replacedIds.at(0) as bigint, 
    replacedIds.at(1) as bigint,
    replacedIds.at(2) as bigint,
    replacedIds.at(3) as bigint,
    replacedIds.at(4) as bigint,
    replacedIds.at(5) as bigint,
    replacedIds.at(6) as bigint,
    replacedIds.at(7) as bigint,
    replacedIds.at(8) as bigint
  )
  if (priceNameUri?.at(2)?.at(0) === 'Pending') {
    return (
      <div>
        Retrieving NFTs
      </div>
    )
  } else if (priceNameUri?.at(2)?.at(0) === 'Error') {
    return (
      <div>
        Failed to retrieve list of {size} NFTs
      </div>
    )
  }

  // ex. [3,5,7,8,11,14,3,3,3] becomes [3,5,7,8,11,14]
  let dedupIds: bigint[] = DedupArray(replacedIds)
  let prices = priceNameUri?.at(0)?.slice(0, dedupIds.length)
  let names = priceNameUri?.at(1)?.slice(0, dedupIds.length)
  let uris = priceNameUri?.at(2)?.slice(0, dedupIds.length)

  return (
    <ul style={{listStyleType:'none'}}>
      {dedupIds.map((key, index) => (
        <li key={key}>
          <PreviewHomeNft id={key} 
              price={prices?.at(Number(index)) as bigint}
              name={names?.at(Number(index)) as string}
              uri={uris?.at(Number(index)) as string} />
        </li>
      ))}
    </ul>
  )
  
}
