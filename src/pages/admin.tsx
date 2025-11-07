import { useState } from "react"
import { useAccount, useWriteContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"
import LogonLink from "../components/ui/logon-link.tsx"
import { 
  GetContractOwner, GetRoyalty, GetTotalMinted, GetTotalMintable, IsPaused 
} from "../utilities/contract-interface.tsx"

const contractAddress: string = GetContractAddress()

export default function AdminMain() {
  const { isConnected } = useAccount()
  if (isConnected) return <Admin />
  return <LogonLink />
}

function Admin() {
  const { address } = useAccount()
  const { writeContract } = useWriteContract()

  const owner: string = GetContractOwner()
  const royalty: String = String(GetRoyalty())
  const minted: String = String(GetTotalMinted())
  const mintable: String = String(GetTotalMintable(address))
  let paused: boolean | undefined = IsPaused()

  const [newRoyaltyPercentage, setNewRoyaltyPercentage] = useState('');
  const [totalMintableIncreaseAmount, setTotalMintableIncreaseAmount] = useState('');
  const [newContractOwner, setNewContractOwner] = useState('');

  if (owner === address) {
    if (paused === undefined) {
      return (
        <div>
          <AdminDetails />
          <br />
          Pause status unknown, unable to modify at this time.
        </div>
      )
    } else if (paused) {
      return (
        <div>
          <AdminDetails />
          <br />
          Unpause Smart Contract &nbsp;
          <br />
          <button onClick={UnpauseSmartContract}>Unpause</button>
        </div>
      )
    } else {
      return (
        <div>
          <AdminDetails />
          <br />
          Pause Smart Contract &nbsp;
          <br />
          <button onClick={PauseSmartContract}>Pause</button>
        </div>
      )
    }
  } else {
    return (
      <div>
        AnyNft Smart Contract
      </div>
    )
  }
  
  function AdminDetails() {
    return (
      <div>
        Contract Owner: {owner}
        <br />
        <br />
        Royalty: {royalty}%
        <br />
        <form>
          <label>Update Royalty - Enter new royalty percentage: <span />
            <input
              type={'text'}
              name='updateRoyalty'
              value={newRoyaltyPercentage}
              onChange={event => setNewRoyaltyPercentage(event.target.value)}
              placeholder={'3'}
              maxLength={64}
              size={14}
            />
          </label>
        </form>
        <button onClick={UpdateRoyalty}>Update</button>
        <br />
        <br />
        Total Minted: {minted}
        <br />
        Total Mintable: {mintable}
        <br />
        <form>
          <label>Increase Total Mintable - Enter how many to increase by: <span />
            <input
              type={'text'}
              name='increaseTotalMintable'
              value={totalMintableIncreaseAmount}
              onChange={event => setTotalMintableIncreaseAmount(event.target.value)}
              placeholder={'1'}
              maxLength={16}
              size={14}
            />
          </label>
        </form>
        <button onClick={IncreaseTotalMintable}>Increase</button>
        <br />
        <br />
        <form>
          <label>Transfer Smart Contract - Enter new owner's address: <span />
            <input
              type={'text'}
              name='transferContract'
              value={newContractOwner}
              onChange={event => setNewContractOwner(event.target.value)}
              placeholder={'0x'}
              maxLength={256}
              size={14}
            />
          </label>
        </form>
        <button onClick={TransferContractOwner}>Transfer</button>
      </div>
    )
  }

  function UpdateRoyalty() {
    if (newRoyaltyPercentage === "") {
      console.warn("Royalty percentage update is blank")
    } else {
      writeContract({
        abi,
        address: contractAddress as `0x${string}`,
        functionName: 'updateRoyalty',
        args: [BigInt(newRoyaltyPercentage)]
      })
      console.info("Royalty percentage has been updated to " + newRoyaltyPercentage)
    } 
  }

  function IncreaseTotalMintable() {
    if (totalMintableIncreaseAmount === "") {
      console.warn("Total mintable increase amount is blank")
    } else {
      writeContract({
        abi,
        address: contractAddress as `0x${string}`,
        functionName: 'increaseTotalMintable',
        args: [BigInt(totalMintableIncreaseAmount)]
      })
      console.info("Total mintable increased by " + totalMintableIncreaseAmount)
    } 
  }

  function TransferContractOwner() {
    if (newContractOwner.length !== 42 || !newContractOwner.startsWith("0x")) {
      console.warn("New contract owner address is not valid")
    } else {
      writeContract({
        abi,
        address: contractAddress as `0x${string}`,
        functionName: 'transferContractOwner',
        args: [newContractOwner as `0x${string}`]
      })
      console.info("New Smart Contract Owner: " + newContractOwner)
    } 
  }

  function PauseSmartContract() {
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'pause'
    })
    console.info("Smart Contract is now Paused")
  }

  function UnpauseSmartContract() {
    writeContract({
      abi,
      address: contractAddress as `0x${string}`,
      functionName: 'unpause'
    })
    console.info("Smart Contract is now Unpaused")
  }
}
