import { useState } from "react"
import { useSearchParams, Link } from 'react-router-dom';
import { ethers } from "ethers"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"
import { GetNft, GetRoyalty } from "../utilities/contract-interface.tsx"
import { IsBigInt, IsValidEth } from "../utilities/misc-util.tsx"

const contractAddress: string = GetContractAddress()

let token: any = null

export default function NftMain() {
  const [searchParams] = useSearchParams()
  token = searchParams.get("token")
  if (token === null || !IsBigInt(token)) {
    return (
      <div className="nft-error-state">
        <p>Invalid Token ID provided</p>
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
  const name: string = nftData?.at(4) as string
  const description: string = nftData?.at(5) as string
  const uri: string = nftData?.at(6) as string

  const priceInPol: string = ethers.formatEther(price)
  const royalty: bigint = GetRoyalty()

  const [newPrice, setPrice] = useState('');

  if (name === 'Pending') {
    return (
      <div className="nft-loading-state">
        <p>Retrieving NFT...</p>
      </div>
    )
  } else if (name === 'Error') {
    return (
      <div className="nft-error-state">
        <p>Failed to find NFT #{token}</p>
        <Link to="/">Go Home</Link>
      </div>
    )
  } else {
    // if owner
    if (owner === address) {
      // if not for sale
      if (price === BigInt(0)) {
        return (
          <div className="nft-detail-container">
            <div className="nft-detail-content">
              <NftImageSection />
              <div className="nft-info-section">
                <h1 className="nft-title">{name}</h1>
                <p className="nft-description">{description}</p>
                <NftMetadata />
                <div className="nft-actions">
                  <div className="action-form">
                    <label>
                      List For Sale Price (in POL):
                      <input
                        type="text"
                        name="forSale"
                        value={newPrice}
                        onChange={event => setPrice(event.target.value)}
                        placeholder="155.3"
                        maxLength={64}
                      />
                    </label>
                  </div>
                  <button onClick={ListForSale} className="primary-action">
                    List For Sale
                  </button>
                  <LinkToBurn />
                </div>
              </div>
            </div>
          </div>
        )
      // if for sale
      } else {
        return (
          <div className="nft-detail-container">
            <div className="nft-detail-content">
              <NftImageSection />
              <div className="nft-info-section">
                <h1 className="nft-title">{name}</h1>
                <p className="nft-description">{description}</p>
                <NftMetadata />
                <div className="nft-actions">
                  <button onClick={DelistForSale}>Remove From Sale</button>
                  <LinkToBurn />
                </div>
              </div>
            </div>
          </div>
        )
      }
    // if not owner
    } else {
      // cannot purchase
      if (price === BigInt(0)) {
        return (
          <div className="nft-detail-container">
            <div className="nft-detail-content">
              <NftImageSection />
              <div className="nft-info-section">
                <h1 className="nft-title">{name}</h1>
                <p className="nft-description">{description}</p>
                <NftMetadata />
              </div>
            </div>
          </div>
        )
      // purchase
      } else {
        return (
          <div className="nft-detail-container">
            <div className="nft-detail-content">
              <NftImageSection />
              <div className="nft-info-section">
                <h1 className="nft-title">{name}</h1>
                <p className="nft-description">{description}</p>
                <NftMetadata />
                <div className="nft-actions">
                  {isConnected ? (
                    <button onClick={PurchaseNft} className="primary-action">
                      Buy NFT
                    </button>
                  ) : (
                    <Link to="/logon/">Connect Wallet to Purchase</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }
  
  function NftImageSection() {
    return (
      <div className="nft-image-section">
        <img
          className="nft-main-image"
          src={uri}
          alt={name}
        />
        <p className="nft-token-id">Token ID: #{String(tokenId)}</p>
      </div>
    )
  }

  function NftMetadata() {
    const isOwner = owner === address
    const displayOwner = isOwner ? "You" : owner
    
    return (
      <div className="nft-metadata">
        <div className="metadata-item">
          <span className="metadata-label">Owner</span>
          <span className={`metadata-value ${!isOwner ? 'owner-address' : ''}`}>
            {displayOwner}
          </span>
        </div>
        <div className="metadata-item">
          <span className="metadata-label">Price</span>
          <span className={`metadata-value ${price === BigInt(0) ? 'not-for-sale' : 'price-highlight'}`}>
            {price === BigInt(0) ? "Not For Sale" : `${priceInPol} POL`}
          </span>
        </div>
      </div>
    )
  }

  function LinkToBurn() {
    return (
      <Link 
        to={{ pathname: "/burn/", search: `?token=${String(tokenId)}` }}
        className="danger-action"
      >
        Burn NFT
      </Link>
    )
  }

  function ListForSale() {
    if (newPrice === "" || !IsValidEth(newPrice)) {
      console.info("Sale Price invalid")
    } else {
      let newPriceInWei: bigint = BigInt(ethers.parseEther(newPrice))

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
    const feeInWei: bigint = (price * (royalty + BigInt(1))) / BigInt(100)
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'purchaseNFT',
      args: [tokenId],
      value: price + feeInWei
    })
    console.info("Purchasing " + name + " for " + priceInPol + " POL, plus fee of " + String(royalty + BigInt(1)) + "%")
  }
}