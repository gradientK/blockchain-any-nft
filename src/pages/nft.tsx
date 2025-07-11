import { useState } from "react"
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ethers } from "ethers"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"
import { GetNft } from "../utilities/contract-interface.tsx"
import { IsBigInt, IsValidEth } from "../utilities/misc-util.tsx"

const contractAddress: string = GetContractAddress()

let token: any = null

export default function NftMain() {
  const [searchParams] = useSearchParams()
  token = searchParams.get("token")
  if (token === null || !IsBigInt(token)) {
    return (
      <div>
        Invalid Token ID provided
        <p />
        <Link to="/">Go Home</Link>
      </div>
    )
  }
  return <Nft />
}

function Nft() {
  const { address, isConnected } = useAccount()
  const { writeContract } = useWriteContract()

  let nftData = GetNft(BigInt(token))
  const tokenId: bigint = nftData?.at(0) as bigint
  const owner: string = nftData?.at(1) as string
  const price: bigint = nftData?.at(2) as bigint
  const saleIndex: bigint = nftData?.at(3) as bigint
  const name: string = nftData?.at(4) as string
  const description: string = nftData?.at(5) as string
  const uri: string = nftData?.at(6) as string

  const [newPrice, setPrice] = useState('');

  if (name === 'Pending') {
    return (
      <div>
        Retrieving NFT
      </div>
    )
  } else if (name === 'Error') {
    return (
      <div>
        Failed to find NFT {token}
      </div>
    )
  } else {
    // if owner
    if (owner === address) {
      // if not for sale
      if (price === BigInt(0)) {
        return (
          <div>
            <NftDetails />
            <form>
              <label>For Sale Price (in POL): <span />
                <input
                  type={'text'}
                  name='forSale'
                  value={newPrice}
                  onChange={event => setPrice(event.target.value)}
                  placeholder={'155.3'}
                  maxLength={64}
                  size={14}
                />
              </label>
            </form>
            <button onClick={ListForSale}>List For Sale</button>
          </div>
        )
      // if for sale
      } else {
        return (
          <div>
            <NftDetails />
            <button onClick={DelistForSale}>Remove For Sale</button>
          </div>
        )
      }
    // if not owner
    } else {
      // cannot purchase
      if (price === BigInt(0)) {
        return (
          <div>
            <NftDetails />
          </div>
        )
      // can purchase
      } else {
        return (
          <div>
            <NftDetails />
            {isConnected ? <button onClick={PurchaseNft}>Buy NFT</button> : <Link to="/logon">Your wallet must be connected to purchase</Link>}
          </div>
        )
      }
    }
  }
  
  function NftDetails() {
    const idString: string = String(tokenId)
    const saleIndexString: string = String(saleIndex)
    let priceInPol: string = ethers.formatEther(price)
    return (
      <div>
        <img
          src={uri}
          alt={uri}
          style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
        />
        <p>Token ID: {idString}</p>
        <p>Name: {name}</p>
        <p>Description: {description}</p>
        <p>Owner: {owner === address ? "You're the Owner" : owner}</p>
        <p>Price: {price === BigInt(0) ? "Not For Sale" : priceInPol}</p>
        <p>Sale index: {saleIndexString}</p>
      </div>
    )
  }

  function ListForSale() {
    if (newPrice === "" || !IsValidEth(newPrice)) {
      console.info("Sale Price invalid")
    } else {
      let newPriceInWei = BigInt(ethers.parseEther(newPrice))

      if (newPriceInWei < 1000) {
        console.info("Sale Price must be at least 0.000000000000001 POL")
      } else {
        writeContract({
          abi,
          address: contractAddress as `0x${string}`,
          functionName: 'listForSale',
          args: [tokenId, newPriceInWei]
        })
        console.info("Listing NFT " + name + " for sale, price: " + newPrice)
      } 
    } 
  }

  function DelistForSale() {
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'delistForSale',
      args: [tokenId]
    })
    console.info("Updating " + name + " to no longer for sale")
  }

  function PurchaseNft() {
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'purchaseNFT',
      args: [tokenId]
    })
    console.info("Purchasing " + name)
  }
}
