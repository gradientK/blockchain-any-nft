import { useReadContract } from "wagmi"
import { abi } from "../config/abi.ts"
import props from "../config/properties.json"

// Contract Owner

/**
 * Get Contract Owner
 * @returns owner
 */
export function GetContractOwner() {
  const { data, error } = useReadContract({
    abi,
    address: props.NFTGRAM_SMART_CONTRACT_ADDRESS as unknown as `0x${string}`,
    functionName: 'getContractOwner',
  })
  if (error) {
    console.log("ERROR: Failed to get contract owner. " + error)
    return "Error"
  } else { 
    return data
  }
}

/**
 * Get Royalty percentage
 * @returns royalty
 */
export function GetRoyalty(walletAddress: `0x${string}` | undefined) {
  const { data, error } = useReadContract({
    abi,
    address: props.NFTGRAM_SMART_CONTRACT_ADDRESS as unknown as `0x${string}`,
    functionName: 'getRoyalty',
    account: walletAddress,
  })
  if (error) {
    console.log("ERROR: Failed to get royalty. " + error)
    return "Error"
  } else { 
    return data
  }
}

/**
 * Get Total Minted
 * @returns minted
 */
export function GetTotalMinted() {
  const { data, error } = useReadContract({
    abi,
    address: props.NFTGRAM_SMART_CONTRACT_ADDRESS as unknown as `0x${string}`,
    functionName: 'getTotalMinted',
  })
  if (error) {
    console.log("ERROR: Failed to get total minted. " + error)
    return -1
  } else { 
    return data
  }
}
