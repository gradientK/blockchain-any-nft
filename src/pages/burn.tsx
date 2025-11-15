import { useSearchParams, Link } from 'react-router-dom';
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { GetNft } from "../utilities/contract-interface.tsx"
import { IsBigInt } from "../utilities/misc-util.tsx"

const contractAddress: string = GetContractAddress()

export default function BurnMain() {
  const { isConnected } = useAccount()

  const [searchParams] = useSearchParams()
  let token = searchParams.get("token")
  if (token === null || !IsBigInt(token)) {
    return (
      <div className="burn-container">
        <h2>Invalid Token</h2>
        <p>The Token ID provided is not valid.</p>
        <Link to="/">Return Home</Link>
      </div>
    )
  }

  let nftData = GetNft(BigInt(token))
  const owner: string = nftData?.at(1) as string
  const name: string = nftData?.at(4) as string
  const uri: string = nftData?.at(6) as string

  if (isConnected) {
    return <Burn token={BigInt(token)} owner={owner} name={name} uri={uri} />
  }
  return <LogonLink />
}

function Burn({ token, owner, name, uri }: { token: bigint, owner: string, name: string, uri: string }) {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  function BurnNft() {
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'burnNFT',
      args: [token]
    })
  }

  return (
    <div className="burn-container">
      <h2>Burn NFT</h2>
      
      <img
        className="nft-preview"
        src={uri}
        alt={name}
      />
      
      <div className="nft-name">{name}</div>

      {owner === address ? (
        <div>
          <div className="warning-message">
            <p>⚠️ Warning: This action cannot be undone!</p>
            <p>Are you sure you want to permanently burn this NFT?</p>
          </div>
          <div className="burn-actions">
            <button onClick={BurnNft}>Burn NFT Forever</button>
            <Link to="/">Cancel and Return Home</Link>
          </div>
        </div>
      ) : (
        <div className="error-message">
          <p>You do not own this NFT and cannot burn it.</p>
          <Link to="/">Return Home</Link>
        </div>
      )}
    </div>
  )
}