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

  function MintToChain() {
    let validInputs: boolean = true 
    let priceInWei: bigint = 0.0 as unknown as bigint

    if (inputs.name !== "" || inputs.description !== "" || inputs.tokenID !== "" || inputs.price !== "") {
      priceInWei = ethers.parseEther(inputs.price) as bigint
          
      if (inputs.name.length > 100 || inputs.name.length === 0) {
        console.log("ERROR: NFT Name must be less than 100 characters")
        validInputs = false
      } else if (inputs.description.length > 500 || inputs.description.length === 0) {
        console.log("ERROR: Description must be less than 500 characters")
        validInputs = false
      } else if (inputs.tokenID.length > 16 || inputs.tokenID.length === 0) {
        console.log("ERROR: TokenID must match Instagram from URL")
        validInputs = false
      } else if (priceInWei < 1000 && priceInWei !== 0.0 as unknown as bigint) {
        console.log("ERROR: Price must be at least 0.000000000000001")
        validInputs = false
      }

      if (validInputs) {
        writeContract({
          abi,
          address: props.NFTGRAM_SMART_CONTRACT_ADDRESS as unknown as `0x${string}`,
          functionName: 'mintNFT',
          args: [
            inputs.tokenID,
            priceInWei,
            inputs.name,
            inputs.description
          ]
        })
        console.log("INFO: Successfully minted " + inputs.name)

        // reset forms
        setInputs({
          name: "",
          description: "",      
          tokenID: "",
          price: ""
        })
      } else {
        console.log("ERROR: Failed to mint NFT")
      }
    } else {
      console.log("ERROR: Fields may not be empty")
    }
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
              maxLength={100}
            />
          </label>
          <br />

          <label>Description: <span />
            <input
              type={'text'}
              name='description'
              value={inputs.description}
              onChange={handleChange}
              placeholder={'Young Link clashing with Small Zelda'}
              maxLength={500}
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
              maxLength={16}
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

        {/* Put Message here, Warning or Success */}
        <button onClick={MintToChain}>Mint NFT</button>
      </div>
    </div>
  )
}