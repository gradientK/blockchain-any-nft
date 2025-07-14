import { Link } from 'react-router-dom';
import { ethers } from "ethers"
import { GetCoinNetwork } from "../../config/prop-reader.tsx"

const coin = GetCoinNetwork()

export default function PreviewMarketNft({ id, price, name, uri }: { id: bigint, price: bigint, name: string, uri: string }) {

  let priceInWei: string = ethers.formatEther(price)
  return (
    <div>
      <Link           
        to={{
          pathname: "/nft",
          search: `?token=${String(id)}`,
        }}
      >
        <img
          src={ uri }
          alt={ uri }
          style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
        />
      </Link>
      {priceInWei} {coin}
      <br /><p />
    </div>
  )

}
