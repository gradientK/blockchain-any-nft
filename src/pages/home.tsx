import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import NftPreview from "../components/ui/nft-preview.tsx"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetNft, GetNftsOwned } from "../utilities/contract-interface.tsx"
import { SplitArray } from "../utilities/misc-util.tsx"

const previewSize = 10

let idsOwned: any
let idArrays: (bigint | undefined)[][]
let pageUris: (string | undefined)[] = []

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
  if (idsOwned.at(0) !== BigInt(-1) && idsOwned.at(0) !== undefined) {

    let pageNum = 0 // Fix zero here

    if (idArrays.at(pageNum)?.length === previewSize)
      for (let i = 0; i < idArrays.length; i++) {
        let tokenId: bigint = idArrays.at(pageNum)?.at(i) as bigint
        
        if (tokenId > BigInt(0)) {
          let nftData: readonly [bigint, bigint, bigint, string, string, string] | undefined

          // async me or useEffect
          console.log("-------here1" + nftData?.[5])
          nftData = GetNft(tokenId)
          console.log("-------here2" + nftData?.[5])
          // async me or useEffect
          
          pageUris.push(nftData?.[5])
        } else {
          pageUris.push('0')
        }
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
