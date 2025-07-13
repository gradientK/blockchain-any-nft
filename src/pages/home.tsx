import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import PreviewHome from "../components/ui/preview-home.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import Pagination from "../components/ui/pagination.tsx"
import { GetNftsOwned } from "../utilities/contract-interface.tsx"

let allNfts: readonly bigint[] = [BigInt(-1)]

export default function HomeMain() {
  const { isConnected } = useAccount()
  if (isConnected) {
    allNfts = GetNftsOwned()
    if (allNfts.at(0) === BigInt(-2)) {
      return <div>Retrieving</div>
    } else if (allNfts.at(0) === BigInt(-1)) {
      return <div>Error: Failed to get all NFTs owned</div>
    } else if (allNfts.length === 0) {
      return <div><Link to="/mint">Mint your first NFT</Link></div>
    }

    //
    // For TESTING ONLY, remove me
    allNfts = [BigInt(1), BigInt(2), BigInt(3), BigInt(4), BigInt(5), BigInt(6), BigInt(7), BigInt(8), BigInt(9), BigInt(10), BigInt(11), BigInt(12), BigInt(13), BigInt(14)]
    //

    return <Home />
  }
  return <LogonLink />
}

function Home() {
  const nftsPerPage: number = 12 // corresponds to smart contract GetNineNFTs
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastNft: number = currentPage * nftsPerPage;
  const indexOfFirstNft: number = indexOfLastNft - nftsPerPage;
  const currentNfts: bigint[] = allNfts.slice(indexOfFirstNft, indexOfLastNft)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div>
      <PreviewHome ids={currentNfts} />
      <Pagination
        nftsPerPage={nftsPerPage}
        totalNfts={allNfts.length}
        paginate={paginate}
      />
    </div>
  )

}
