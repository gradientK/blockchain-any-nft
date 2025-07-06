import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import PageNotFound from '../components/ui/not-found.tsx';
import PreviewHome from "../components/ui/preview.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { GetNftsOwned, GetNineNFTs } from "../utilities/contract-interface.tsx"
import { PadArray } from "../utilities/misc-util.tsx"

let allNfts: readonly bigint[] = [BigInt(-1)]

export default function HomeMain() {
  const { isConnected } = useAccount()
  if (isConnected) {
    allNfts = GetNftsOwned()
    if (allNfts.at(0) === BigInt(-1)) {
      return <div>"Retrieving"</div>
    } else if (allNfts.length === 0) {
      return <div><Link to="/mint">Mint your first NFT</Link></div>
    }
    return <Home />
  }
  return <LogonLink />
}

function Home() {
  const nftsPerPage: number = 9 // corresponds to smart contract GetNineNFTs
  const [currentPage, setPage] = useState(1)

  const indexOfLastNft: number = currentPage * nftsPerPage;
  const indexOfFirstNft: number = indexOfLastNft - nftsPerPage;
  const currentNfts: bigint[] = PadArray(allNfts.slice(indexOfFirstNft, indexOfLastNft), nftsPerPage)

  return (
    <div>
      HOOOOOMEEee
    </div>
  )

  // id0 = idArrays.at(pageNum)?.at(0) as bigint
  // id1 = idArrays.at(pageNum)?.at(1) as bigint
  // id2 = idArrays.at(pageNum)?.at(2) as bigint
  // id3 = idArrays.at(pageNum)?.at(3) as bigint
  // id4 = idArrays.at(pageNum)?.at(4) as bigint
  // id5 = idArrays.at(pageNum)?.at(5) as bigint
  // id6 = idArrays.at(pageNum)?.at(6) as bigint
  // id7 = idArrays.at(pageNum)?.at(7) as bigint
  // id8 = idArrays.at(pageNum)?.at(8) as bigint

  // priceNameUri = GetNineNFTs(id0, id1, id2, id3, id4, id5, id6, id7, id8);

}
