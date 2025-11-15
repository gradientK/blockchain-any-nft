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
  let paused: boolean | undefined = undefined
  
  try {
    paused = IsPaused()
  } catch (error) {
    console.error("Failed to get smart contract Paused status.")
  }

  const royalty: String = String(GetRoyalty())
  const minted: String = String(GetTotalMinted())
  const mintable: String = String(GetTotalMintable(address))

  const [newRoyaltyPercentage, setNewRoyaltyPercentage] = useState('');
  const [totalMintableIncreaseAmount, setTotalMintableIncreaseAmount] = useState('');
  const [newContractOwner, setNewContractOwner] = useState('');

  if (owner.toUpperCase() === address?.toUpperCase()) {
    if (paused === undefined) {
      return (
        <div className="admin-container">
          <h2>Smart Contract Administration</h2>
          <AdminDetails />
          <div className="pause-status">
            Pause status unknown, unable to modify at this time.
          </div>
        </div>
      )
    } else if (paused) {
      return (
        <div className="admin-container">
          <h2>Smart Contract Administration</h2>
          <div className="pause-status paused">⚠️ Contract is Paused</div>
          <AdminDetails />
          <h3>Contract Controls</h3>
          <button onClick={UnpauseSmartContract} className="success">
            Unpause Contract
          </button>
        </div>
      )
    } else {
      return (
        <div className="admin-container">
          <h2>Smart Contract Administration</h2>
          <div className="pause-status active">✓ Contract is Active</div>
          <AdminDetails />
          <h3>Contract Controls</h3>
          <button onClick={PauseSmartContract} className="danger">
            Pause Contract
          </button>
        </div>
      )
    }
  } else {
    return (
      <div className="admin-container">
        <h2>AnyNFT Smart Contract</h2>
        <p>You do not have administrator access to this contract.</p>
      </div>
    )
  }
  
  function AdminDetails() {
    return (
      <div>
        <div className="admin-section">
          <h3>Contract Information</h3>
          <div className="admin-info">Contract Owner: {owner}</div>
          <div className="admin-info">Total Minted: {minted} NFTs</div>
          <div className="admin-info">Total Mintable: {mintable} NFTs</div>
        </div>

        <div className="admin-section">
          <h3>Royalty Settings</h3>
          <div className="admin-info">Current Royalty: {royalty}%</div>
          <div className="utility-form">
            <div className="form-group">
              <label>Update Royalty Percentage</label>
              <input
                type="text"
                name="updateRoyalty"
                value={newRoyaltyPercentage}
                onChange={event => setNewRoyaltyPercentage(event.target.value)}
                placeholder="3"
                maxLength={64}
              />
            </div>
            <button onClick={UpdateRoyalty}>Update Royalty</button>
          </div>
        </div>

        <div className="admin-section">
          <h3>Mintable Supply</h3>
          <div className="utility-form">
            <div className="form-group">
              <label>Increase Total Mintable</label>
              <input
                type="text"
                name="increaseTotalMintable"
                value={totalMintableIncreaseAmount}
                onChange={event => setTotalMintableIncreaseAmount(event.target.value)}
                placeholder="100"
                maxLength={16}
              />
            </div>
            <button onClick={IncreaseTotalMintable}>Increase Supply</button>
          </div>
        </div>

        <div className="admin-section">
          <h3>Transfer Ownership</h3>
          <div className="utility-form">
            <div className="form-group">
              <label>New Owner's Address</label>
              <input
                type="text"
                name="transferContract"
                value={newContractOwner}
                onChange={event => setNewContractOwner(event.target.value)}
                placeholder="0x..."
                maxLength={256}
              />
            </div>
            <button onClick={TransferContractOwner} className="danger">
              Transfer Ownership
            </button>
          </div>
        </div>
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