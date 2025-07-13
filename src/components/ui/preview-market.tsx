import PreviewHomeNft from "./preview-home-nft.tsx"
import { GetNftsData } from "../../utilities/contract-interface.tsx"

export default function PreviewMarket({ ids }: { ids: bigint[] }) {
  let priceNameUri = GetNftsData(ids)
  if (priceNameUri?.at(2)?.at(0) === 'Pending') {
    return <div>Retrieving for sale NFTs</div>
  } else if (priceNameUri?.at(2)?.at(0) === 'Error') {
    return <div>Failed to retrieve list of for sale NFTs data</div>
  }

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
