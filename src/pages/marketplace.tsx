import { useState } from "react"
import { Link } from 'react-router-dom';
import PreviewMarket from "../components/ui/preview-market.tsx"
import Pagination from "../components/ui/pagination.tsx"
import { GetTotalForSale, GetForSaleList } from "../utilities/contract-interface.tsx"
import { RemoveZeros, GetShuffledPageIndices } from "../utilities/misc-util.tsx"

let totalForSale: bigint = BigInt(-1)
let groupForSale: readonly bigint[] = [BigInt(-1)]
let shuffledPageMap: number[] = []

export default function MarketplaceMain() {
  totalForSale = GetTotalForSale()
  
  if (totalForSale === BigInt(-2)) {
    return (
      <div className="loading-state-container">
        <p>Loading marketplace...</p>
      </div>
    )
  } if (totalForSale === BigInt(-1)) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon">⚠️</div>
        <h3>Error Loading Marketplace</h3>
        <p>We couldn't retrieve the NFTs for sale. Please try again later.</p>
        <Link to="/">Return Home</Link>
      </div>
    )
  } else if (totalForSale === BigInt(0)) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon">🏪</div>
        <h3>Marketplace is Empty</h3>
        <p>There are currently no NFTs listed for sale. Check back soon!</p>
        <Link to="/">Browse Your Collection</Link>
      </div>
    )
  }
  return <MarketPlace />
}

function MarketPlace() {
  const nftsPerPage: number = 12
  const [currentPage, setCurrentPage] = useState(1)

  // Initialize shuffled page map on first render
  if (shuffledPageMap.length === 0) {
    const totalPages = Math.ceil(Number(totalForSale) / nftsPerPage)
    shuffledPageMap = GetShuffledPageIndices(totalPages)
  }

  // Get the actual page index from the shuffled map
  const actualPageIndex = shuffledPageMap[currentPage - 1]
  
  let startIndex: bigint = BigInt(actualPageIndex * nftsPerPage - nftsPerPage + 1)
  let endIndex: bigint = BigInt(actualPageIndex * nftsPerPage)
  if (endIndex > totalForSale) {
    endIndex = totalForSale
  }
  groupForSale = GetForSaleList(startIndex, endIndex)

  if (groupForSale.at(0) === BigInt(-2)) {
    return (
      <div className="loading-state-container">
        <p>Loading NFTs...</p>
      </div>
    )
  } else if (groupForSale.at(0) === BigInt(-1)) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon">⚠️</div>
        <h3>Error Loading NFTs</h3>
        <p>Sorry, we failed to retrieve the NFTs for sale.</p>
        <Link to="/">Return Home</Link>
      </div>
    )
  } else if (totalForSale === BigInt(0)) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon">🏪</div>
        <h3>No NFTs Available</h3>
        <p>The marketplace is currently empty.</p>
        <Link to="/mint">Mint an NFT</Link>
      </div>
    )
  }

  const currentNfts: bigint[] = RemoveZeros(groupForSale)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <div>
      <PreviewMarket ids={currentNfts} />
      <Pagination
        nftsPerPage={nftsPerPage}
        totalNfts={Number(totalForSale)}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )

}