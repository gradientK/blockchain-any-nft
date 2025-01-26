import { useState } from "react"
import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"

export default function MintMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Mint />
  return <Reconnect />
}

function Mint() {
  const { address } = useAccount()
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    console.log("i am the name " + inputs.name)
    console.log("i am the description " + inputs.description)
    console.log("i am the tokenid " + inputs.tokenID)
    console.log("i am the price " + inputs.price)
  }

  return (
    <div>
      <div>
        <p>See Mint Instructions prior to minting</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
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

          <label>Price (in POL) (enter '0' if not for sale): <span />
            <input
              type={'text'}
              name='price'
              value={inputs.price}
              onChange={handleChange}
              placeholder={'0'}
              maxLength={64}
            />
          </label>
          <br />

          <button type='submit' >Mint NFT</button>
        </form>
      </div>
    </div>
  )
}