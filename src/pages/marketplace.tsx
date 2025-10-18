import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import PreviewMarket from "../components/ui/preview-market.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import Pagination from "../components/ui/pagination.tsx"
import { GetTotalForSale, GetForSaleList } from "../utilities/contract-interface.tsx"
import { RemoveZeros } from "../utilities/misc-util.tsx"
import { GetMockTotalSale, GetMockTwelveIds } from "../utilities/test-util.tsx"

let totalForSale: bigint = BigInt(-1)
let groupForSale: readonly bigint[] = [BigInt(-1)]

export default function MarketplaceMain() {
  const { isConnected } = useAccount()
  if (isConnected) {
    totalForSale = GetTotalForSale()

    //
    // for TESTING ONLY delete me later
    //totalForSale = GetMockTotalSale()
    //
    //

    if (totalForSale === BigInt(-1)) {
      return <div>Retrieving</div>
    } else if (totalForSale === BigInt(0)) {
      return <div><Link to="/mint">There are currently no NFTs for sale</Link></div>
    }
    return <MarketPlace />
  }
  return <LogonLink />
}

function MarketPlace() {
  const nftsPerPage: number = 12 // single variable to manipulate
  const [currentPage, setCurrentPage] = useState(1)

  let startIndex: bigint = BigInt(currentPage * nftsPerPage - nftsPerPage + 1)
  let endIndex: bigint = BigInt(currentPage * nftsPerPage)
  if (endIndex > totalForSale) {
    endIndex = totalForSale
  }
  groupForSale = GetForSaleList(startIndex, endIndex)

  //
  // for TESTING ONLY delete me later
  //groupForSale = GetMockTwelveIds(currentPage)
  //
  //

  if (groupForSale.at(0) === BigInt(-2)) {
    return <div>Retrieving</div>
  } else if (groupForSale.at(0) === BigInt(-1)) {
    return <div>Sorry about that, failed to get NFTs for sale</div>
  } else if (totalForSale === BigInt(0)) {
    return <div><Link to="/mint">There are currently no NFTs for sale</Link></div>
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
      />
    </div>
  )

}
