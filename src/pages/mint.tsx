import { useState } from "react"
import { ethers } from "ethers"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import props from "../config/properties.json"
import Reconnect from "../components/ui/reconnect.tsx"

export default function MintMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Mint />
  return <Reconnect />
}

function Mint() {
  const { writeContract } = useWriteContract()
  const [inputs, setInputs] = useState({
    name: "",
    description: "",      
    tokenID: "",
    price: ""
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  return (
    <div>
      <div>
        <p>See Mint Instructions prior to minting</p>
      </div>
      <div>
        <form>
          <label>NFT Name: <span />
            <input
              type={'text'}
              name='name'
              value={inputs.name}
              onChange={handleChange}
              placeholder={'Mini Legend of Zelda'}
              maxLength={64}
            />
          </label>
          <br />

          <label>Description: <span />
            <input
              type={'text'}
              name='description'
              value={inputs.description}
              onChange={handleChange}
              placeholder={'Small Link clashing with Young Zelda'}
              maxLength={400}
              size={50}
            />
          </label>
          <br />

          <label>Token ID (must be from Instagram URL): <span />
            <input
              type={'text'}
              name='tokenID'
              value={inputs.tokenID}
              onChange={handleChange}
              placeholder={'DAYuMcUvTEj'}
              maxLength={64}
            />
          </label>
          <br />

          <label>Price (in POL) (enter '0.0' if not for sale): <span />
            <input
              type={'text'}
              name='price'
              value={inputs.price}
              onChange={handleChange}
              placeholder={'0.0'}
              maxLength={64}
            />
          </label>
        </form>

        <button onClick={() =>
          writeContract({
            abi,
            address: props.NFTGRAM_SMART_CONTRACT_ADDRESS as unknown as `0x${string}`,
            functionName: 'mintNFT',
            args: [
              inputs.tokenID,
              ethers.parseEther(inputs.price) as bigint,
              inputs.name,
              inputs.description
            ]
          })
        }>Mint NFT</button>
      </div>
    </div>
  )
}