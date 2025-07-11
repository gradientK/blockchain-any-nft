import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import Preview from "../components/ui/preview.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import Pagination from "../components/ui/pagination.tsx"
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
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastNft: number = currentPage * nftsPerPage;
  const indexOfFirstNft: number = indexOfLastNft - nftsPerPage;
  const currentNfts: bigint[] = PadArray(allNfts, nftsPerPage).slice(indexOfFirstNft, indexOfLastNft)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div>
      <Preview ids={currentNfts} size={nftsPerPage} />
      <Pagination
        nftsPerPage={nftsPerPage}
        totalNfts={allNfts.length}
        paginate={paginate}
      />
    </div>
  )

}
