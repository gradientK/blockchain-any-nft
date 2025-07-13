import PreviewHomeNft from "./preview-home-nft.tsx"
import { GetNftsData } from "../../utilities/contract-interface.tsx"
import { getMockNftsOwned } from "../../utilities/test-util.tsx"

export default function Preview({ ids }: { ids: bigint[] }) {
  let priceNameUri = GetNftsData(ids)
  if (priceNameUri?.at(2)?.at(0) === 'Pending') {
    return (
      <div>
        Retrieving NFTs
      </div>
    )
  } else if (priceNameUri?.at(2)?.at(0) === 'Error') {
    return (
      <div>
        Failed to retrieve list of NFTs data
      </div>
    )
  }

  //
  // For TESTING ONLY, Remove me later
  priceNameUri = getMockNftsOwned(ids)
  //

  let prices = priceNameUri?.at(0)
  let names = priceNameUri?.at(1)
  let uris = priceNameUri?.at(2)

  return (
    <ul>
      {ids.map((key, index) => (
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
