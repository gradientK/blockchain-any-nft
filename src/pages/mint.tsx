import { useState } from "react"
import { Link } from 'react-router-dom';
import { ethers } from "ethers"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { IsValidEth } from "../utilities/misc-util.tsx"

const contractAddress: string = GetContractAddress()

export default function MintMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Mint />
  return <LogonLink />
}

function Mint() {
  const { writeContract } = useWriteContract()
  const [inputs, setInputs] = useState({
    name: "",
    description: "",      
    uri: "",
    price: ""
  })

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  function MintToChain() {
    let validInputs: boolean = true 
    let priceInWei: bigint = BigInt(0)

    if (inputs.name !== "" || inputs.description !== "" || inputs.uri !== "" || inputs.price !== "") {         
      if (inputs.name.length > 100 || inputs.name.length === 0) {
        console.info("NFT Name must be less than 100 characters")
        validInputs = false
      } else if (inputs.description.length > 500 || inputs.description.length === 0) {
        console.info("Description must be less than 500 characters")
        validInputs = false
      } else if (inputs.uri.length > 500 || inputs.uri.length === 0) {
        console.info("URI must be less than 500 characters")
        validInputs = false
      } else if (!IsValidEth(inputs.price)) { 
        console.info("Price entered is not a valid price")
        validInputs = false
      } else {
        priceInWei = BigInt(ethers.parseEther(inputs.price))
        if (priceInWei < 1000 && priceInWei !== BigInt(0)) {
          console.info("Price must be at least 0.000000000000001 POL")
          validInputs = false
        }
      }

      let rawUri = inputs.uri.replace('dl=0', 'raw=1') // needed for DropBox

      if (validInputs) {
        writeContract({
          abi,
          address: contractAddress as `0x${string}`,
          functionName: 'mintNFT',
          args: [
            inputs.name,
            inputs.description,
            rawUri,
            priceInWei
          ]
        })
        console.info("Minting " + inputs.name)

        setInputs({
          name: "",
          description: "",      
          uri: "",
          price: ""
        })
      }
    } else {
      console.info("Fields may not be empty")
    }
  }

  return (
    <div className="mint-container">
      <h2>Mint Your NFT</h2>
      
      <div className="mint-intro">
        <p>
          New to minting? Check out our{' '}
          <Link to="/instructions">step-by-step instructions</Link>{' '}
          before you begin.
        </p>
      </div>

      <div className="mint-form">
        <div className="form-group">
          <label>NFT Name</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            placeholder="Cat in Space"
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleChange}
            placeholder="A trippy cat flying through the cosmos..."
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label>Dropbox Image Link</label>
          <input
            type="text"
            name="uri"
            value={inputs.uri}
            onChange={handleChange}
            placeholder="https://www.dropbox.com/scl/fi/..."
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label>Price in POL (enter '0' if not for sale)</label>
          <input
            type="text"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="155.3"
            maxLength={64}
          />
        </div>

        <button onClick={MintToChain}>Mint NFT</button>
      </div>
    </div>
  )
}