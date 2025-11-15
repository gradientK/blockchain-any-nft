import { Link } from 'react-router-dom';
import { ethers } from "ethers"
import { GetCoinNetwork } from "../../config/prop-reader.tsx"

const coin = GetCoinNetwork()

export default function PreviewMarketNft({ id, price, name, uri }: { id: bigint, price: bigint, name: string, uri: string }) {

  let priceInWei: string = ethers.formatEther(price)
  return (
    <div className="preview-market-nft">
      <Link           
        to={{
          pathname: "/nft",
          search: `?token=${String(id)}`,
        }}
      >
        <img
          className="nft-image"
          src={ uri }
          alt={ name }
        />
      </Link>
      <div className="nft-details">
        <div className="nft-name">{name}</div>
        <div className="nft-price">
          <span className="price-label">Price:</span> {priceInWei} {coin}
        </div>
      </div>
    </div>
  )

}