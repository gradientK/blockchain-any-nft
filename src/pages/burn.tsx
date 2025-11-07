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
      <div>
        Invalid Token ID provided
        <p />
        <Link to="/">Go Home</Link>
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
    <div>
      <img
        src={ uri }
        alt={ uri }
        style={{ maxWidth: '200px', height: '200', width: '200', display: 'block' }}
      />
      {name}
      <p />
      {owner === address ? 
        <div>
          Are you sure your want to burn your NFT? This cannot be undone
          <br />
          <button onClick={BurnNft}>Burn NFT</button>
        </div> : <div>
          This NFT is not yours to burn
          <br />
          <Link to="/Home/">Go Home</Link>
        </div>}     
    </div>
  )
}