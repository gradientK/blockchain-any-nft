import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import PageNotFound from '../components/ui/not-found.tsx';
import Preview from "../components/ui/preview.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { GetNftsOwned, GetNineNFTs } from "../utilities/contract-interface.tsx"
import { PadArray } from "../utilities/misc-util.tsx"

let allNfts: readonly bigint[] = [BigInt(-1)]

export default function HomeMain() {
  const { isConnected } = useAccount()
  if (isConnected) {
    allNfts = GetNftsOwned()
    if (allNfts.at(0) === BigInt(-1)) {
      return <div>Retrieving</div>
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
  const currentNfts: bigint[] = PadArray(allNfts, nftsPerPage).slice(indexOfFirstNft, indexOfLastNft)

  return (
    <div>
      <Preview ids={currentNfts} size={nftsPerPage} />
    </div>
  )

}
