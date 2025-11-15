import { useState } from "react"
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
      return (
        <div className="loading-state-container">
          <p>Retrieving your NFTs...</p>
        </div>
      )
    } else if (allNfts.at(0) === BigInt(-1)) {
      return (
        <div className="empty-state-container">
          <div className="empty-icon">🖼️</div>
          <h3>No NFTs Found</h3>
          <p>You don't have any NFTs yet. Start your collection today!</p>
          <Link to="/mint">Mint Your First NFT</Link>
        </div>
      )
    } else if (allNfts.length === 0) {
      return (
        <div className="empty-state-container">
          <div className="empty-icon">✨</div>
          <h3>Welcome to AnyNFT</h3>
          <p>Your NFT collection is empty. Let's create something amazing!</p>
          <Link to="/mint">Mint Your First NFT</Link>
        </div>
      )
    }
    return <Home />
  }
  return <LogonLink />
}

function Home() {
  const nftsPerPage: number = 12
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
        currentPage={currentPage}
      />
    </div>
  )

}