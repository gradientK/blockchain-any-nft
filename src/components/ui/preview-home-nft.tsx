import { Link } from 'react-router-dom';
import { ethers } from "ethers"
import { GetCoinNetwork } from "../../config/prop-reader.tsx"

const coin = GetCoinNetwork()

export default function PreviewHomeNft(params: any) {
  const { id, price, name, uri } = params

  let priceInWei: string = ethers.formatEther(price)

  function ImagePreview() {
    return (
      <div>
        <Link           
          to={{
            pathname: "/nft",
            search: `?token=${id}`,
          }}
        >
          <img
            src={ uri }
            alt={ uri }
            style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
          />
        </Link>
        <p>{name}</p>
      </div>
    )
  }

  if (price === BigInt(0)) {
    return (
      <div>
        <ImagePreview />
        <p>Not for sale</p>
      </div>
    )
  } else {
    return (
      <div>
        <ImagePreview />
        <p>Sale price: {priceInWei} {coin}</p>
      </div>
    )
  }
}

