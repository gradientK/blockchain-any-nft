import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import Preview from "../components/ui/preview-home.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import Pagination from "../components/ui/pagination.tsx"
import { GetTotalForSale, GetTwelveForSale } from "../utilities/contract-interface.tsx"
import { RemoveZeros } from "../utilities/misc-util.tsx"

let totalForSale: bigint = BigInt(-1)
let groupForSale: readonly bigint[] = [BigInt(-1)]

export default function MarketplaceMain() {
  const { isConnected } = useAccount()
  if (isConnected) {
    totalForSale = GetTotalForSale()
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
  const nftsPerPage: number = 12 // corresponds to smart contract GetTwelveNFTs
  const [currentPage, setCurrentPage] = useState(1)

  groupForSale = GetTwelveForSale(BigInt(currentPage)) // todo: add parameter nftsPerPage
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
      <Preview ids={currentNfts} />
      <Pagination
        nftsPerPage={nftsPerPage}
        totalNfts={Number(totalForSale)}
        paginate={paginate}
      />
    </div>
  )

}
