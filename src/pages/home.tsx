import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import PreviewHome from "../components/ui/preview-home.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { GetNftsOwned, GetNineNFTs } from "../utilities/contract-interface.tsx"
import { SplitArray } from "../utilities/misc-util.tsx"

const previewSize = 9 // corresponds to smart contract GetNineNFTs

let idsOwned: any = [] // used once
let idArrays: (bigint | undefined)[][] = [] // [page number][id 0-9]

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) {
    idsOwned = GetNftsOwned()
    idArrays = SplitArray(idsOwned, previewSize)
    return <Home />
  } else {
    return <LogonLink />
  }
}

function Home() {
  let pageNum = 0 // make dynamic later

  let id0: bigint = BigInt(0)
  let id1: bigint = BigInt(0)
  let id2: bigint = BigInt(0)
  let id3: bigint = BigInt(0)
  let id4: bigint = BigInt(0)
  let id5: bigint = BigInt(0)
  let id6: bigint = BigInt(0)
  let id7: bigint = BigInt(0)
  let id8: bigint = BigInt(0)
  let pagePrices: readonly string[] | readonly bigint[] | undefined = []
  let pageNames: readonly string[] | readonly bigint[] | undefined = []
  let pageUris: readonly string[] | readonly bigint[] | undefined = []

  if (idsOwned.at(0) !== BigInt(-1) && idsOwned.at(0) !== undefined) {
    // just verifying we have expected data
    if (idArrays.at(pageNum)?.length === previewSize) {

      // must have 9 valid nft id, remaining will become duplicate of index 0
      for (let i = 0; i < previewSize; i++) {
        if (idArrays.at(pageNum)?.at(i) === BigInt(0)) {
          idArrays[pageNum][i] = idArrays.at(pageNum)?.at(0)
        }
      }
      
      id0 = idArrays.at(pageNum)?.at(0) as bigint
      id1 = idArrays.at(pageNum)?.at(1) as bigint
      id2 = idArrays.at(pageNum)?.at(2) as bigint
      id3 = idArrays.at(pageNum)?.at(3) as bigint
      id4 = idArrays.at(pageNum)?.at(4) as bigint
      id5 = idArrays.at(pageNum)?.at(5) as bigint
      id6 = idArrays.at(pageNum)?.at(6) as bigint
      id7 = idArrays.at(pageNum)?.at(7) as bigint
      id8 = idArrays.at(pageNum)?.at(8) as bigint

      let priceNameUri: readonly [readonly bigint[], readonly string[], readonly string[]] | undefined = [[], [], []]
      priceNameUri = GetNineNFTs(id0, id1, id2, id3, id4, id5, id6, id7, id8);

      pagePrices = priceNameUri?.at(0)
      pageNames = priceNameUri?.at(1)
      pageUris = priceNameUri?.at(2)
    } else {
      console.error("Split Array not the correct size of {}: {}", previewSize, idArrays.length)
    }

    return (
      <div>
        <p>Your NFTs</p>
        <PreviewHome
          id0={id0}
          id1={id1}
          id2={id2}
          id3={id3}
          id4={id4}
          id5={id5}
          id6={id6}
          id7={id7}
          id8={id8}
          price0={pagePrices?.at(0)}
          price1={pagePrices?.at(1)}
          price2={pagePrices?.at(2)}
          price3={pagePrices?.at(3)}
          price4={pagePrices?.at(4)}
          price5={pagePrices?.at(5)}
          price6={pagePrices?.at(6)}
          price7={pagePrices?.at(7)}
          price8={pagePrices?.at(8)}
          name0={pageNames?.at(0)}
          name1={pageNames?.at(1)}
          name2={pageNames?.at(2)}
          name3={pageNames?.at(3)}
          name4={pageNames?.at(4)}
          name5={pageNames?.at(5)}
          name6={pageNames?.at(6)}
          name7={pageNames?.at(7)}
          name8={pageNames?.at(8)}
          uri0={pageUris?.at(0)}
          uri1={pageUris?.at(1)}
          uri2={pageUris?.at(2)}
          uri3={pageUris?.at(3)}
          uri4={pageUris?.at(4)}
          uri5={pageUris?.at(5)}
          uri6={pageUris?.at(6)}
          uri7={pageUris?.at(7)}
          uri8={pageUris?.at(8)}
          uri9={pageUris?.at(9)}
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
