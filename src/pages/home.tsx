import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import NftPreview from "../components/ui/nft-preview.tsx"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetNftsOwned, GetNineNFTs } from "../utilities/contract-interface.tsx"
import { SplitArray } from "../utilities/misc-util.tsx"

const previewSize = 9

let idsOwned: any = [] // used once
let idArrays: (bigint | undefined)[][] = [] // [page number][id 0-9]

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) {
    idsOwned = GetNftsOwned()
    idArrays = SplitArray(idsOwned, previewSize)
    return <Home />
  } else {
    return <Reconnect />
  }
}

function Home() {
  let pageNum = 0 // make dynamic later

  let pagePrices: bigint[] = []
  let pageNames: string[] = []
  let pageUris: string[] = []

  // just verifying we have expected data
  if (idsOwned.at(0) !== BigInt(-1) && idsOwned.at(0) !== undefined) {
    if (idArrays.at(pageNum)?.length === previewSize) {

      // must have 9 valid nft id, get duplicate of index 0 if needed
      for (let i = 0; i < previewSize; i++) {
        if (idArrays.at(pageNum)?.at(i) === BigInt(0)) {
          idArrays[pageNum][i] = idArrays.at(pageNum)?.at(0)
        }
      }
      
      let id1 = idArrays.at(pageNum)?.at(0) as bigint
      let id2 = idArrays.at(pageNum)?.at(1) as bigint
      let id3 = idArrays.at(pageNum)?.at(2) as bigint
      let id4 = idArrays.at(pageNum)?.at(3) as bigint
      let id5 = idArrays.at(pageNum)?.at(4) as bigint
      let id6 = idArrays.at(pageNum)?.at(5) as bigint
      let id7 = idArrays.at(pageNum)?.at(6) as bigint
      let id8 = idArrays.at(pageNum)?.at(7) as bigint
      let id9 = idArrays.at(pageNum)?.at(8) as bigint

      let priceNameUri: readonly [readonly bigint[], readonly string[], readonly string[]] | undefined = [[], [], []]
      priceNameUri = GetNineNFTs(id1, id2, id3, id4, id5, id6, id7, id8, id9);

      pagePrices = priceNameUri.at(0)
      pageNames = priceNameUri.at(1)
      pageUris = priceNameUri.at(2)

    } else {
      console.log("Split Array not the correct size of {}: {}", previewSize, idArrays.length)
    }

    return (
      <div>
        <NftPreview 
          uri0={pageUris.at(0)}
          uri1={pageUris.at(1)}
          uri2={pageUris.at(2)}
          uri3={pageUris.at(3)}
          uri4={pageUris.at(4)}
          uri5={pageUris.at(5)}
          uri6={pageUris.at(6)}
          uri7={pageUris.at(7)}
          uri8={pageUris.at(8)}
          uri9={pageUris.at(9)}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Link to="/mint">Mint your first NFT</Link>
      </div>
    )
  }

}
