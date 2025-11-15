import { Link } from 'react-router-dom';
import { ethers } from "ethers"
import { GetCoinNetwork } from "../../config/prop-reader.tsx"

const coin = GetCoinNetwork()

export default function PreviewHomeNft({ id, price, name, uri }: { id: bigint, price: bigint, name: string, uri: string }) {

  if (price === BigInt(0)) {
    return (
      <div className="preview-home-nft">
        <ImagePreview />
        <div className="nft-details">
          <div className="nft-name">{name}</div>
          <div className="nft-price">Not for sale</div>
        </div>
      </div>
    )
  } else {

    let priceInWei: string = ethers.formatEther(price)
    return (
      <div className="preview-home-nft">
        <ImagePreview />
        <div className="nft-details">
          <div className="nft-name">{name}</div>
          <div className="nft-price">{priceInWei} {coin}</div>
        </div>
      </div>
    )
  }

  function ImagePreview() {
    return (
      <Link           
        to={{
          pathname: "/nft/",
          search: `?token=${String(id)}`,
        }}
      >
        <img
          className="nft-image"
          src={ uri }
          alt={ name }
        />
      </Link>
    )
  }

}