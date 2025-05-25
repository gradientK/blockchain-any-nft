import { useState } from "react"
import { ethers } from "ethers"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import Reconnect from "../components/ui/reconnect.tsx"
import { GetContractAddress } from "../config/prop-reader.tsx"

const contractAddress: string = GetContractAddress()

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
    uri: "",
    price: ""
  });

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  function MintToChain() {
    let validInputs: boolean = true 
    let priceInWei: bigint = BigInt(0)

    if (inputs.name !== "" || inputs.description !== "" || inputs.uri !== "" || inputs.price !== "") {
      priceInWei = BigInt(ethers.parseEther(inputs.price))
          
      if (inputs.name.length > 100 || inputs.name.length === 0) {
        console.log("NFT Name must be less than 100 characters")
        validInputs = false
      } else if (inputs.description.length > 500 || inputs.description.length === 0) {
        console.log("Description must be less than 500 characters")
        validInputs = false
      } else if (inputs.uri.length > 500 || inputs.uri.length === 0) {
        console.log("URI must be less than 500 characters")
        validInputs = false
      } else if (priceInWei < 1000 && priceInWei !== BigInt(0)) {
        console.log("Price must be at least 0.000000000000001 POL")
        validInputs = false
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
        console.log("Successfully minted " + inputs.name)

        // reset forms
        setInputs({
          name: "",
          description: "",      
          uri: "",
          price: ""
        })
      }
    } else {
      console.log("Fields may not be empty")
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
              placeholder={'Cat in Space'}
              maxLength={100}
              size={40}
            />
          </label>
          <br />

          <label>Description: <span />
            <input
              type={'text'}
              name='description'
              value={inputs.description}
              onChange={handleChange}
              placeholder={'Trippy cat flying through space'}
              maxLength={500}
              size={52}
            />
          </label>
          <br />

          <label>DropBox Address: <span />
            <input
              type={'text'}
              name='uri'
              value={inputs.uri}
              onChange={handleChange}
              placeholder={'https://www.dropbox.com/scl/fi/4vaord3u3y8xno276xj46/catinspace.jpg?rlkey=jes15hupgepzkbmz7rm8cat7h&st=j03auq1x&dl=0'}
              maxLength={500}
              size={52}
            />
          </label>
          <br />

          <label>Price (in POL) (enter '0' if not for sale): <span />
            <input
              type={'text'}
              name='price'
              value={inputs.price}
              onChange={handleChange}
              placeholder={'155.3'}
              maxLength={64}
              size={14}
            />
          </label>
        </form>

        {/* Put Message here, Warning or Success */}
        <button onClick={MintToChain}>Mint NFT</button>
      </div>
    </div>
  )
}