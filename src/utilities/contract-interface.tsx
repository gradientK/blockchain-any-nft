import { useAccount, useReadContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"

const contractAddress: string = GetContractAddress()

/**
 * Get NFT information
 * @returns token ID, price, sale index, name, description, address uri
 */
export function GetNft(tokenId: bigint): readonly [bigint, bigint, bigint, string, string, string] | undefined {
  const { address } = useAccount()
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getNFT',
    account: address,
    args: [
      tokenId
    ],
  })
  if (isPending) return [BigInt(-1), BigInt(-1), BigInt(-1), 'Pending', 'Pending', 'Pending']
  else if (error) {
    console.log("Failed to get contract owner. " + error)
    return [BigInt(-1), BigInt(-1), BigInt(-1), 'Error', 'Error', 'Error']
  } else {
    return data
  }
}

/**
 * Get NFTs Owned
 * @returns array of NFT token IDs owned
 */
export function GetNftsOwned(): readonly bigint[] {
  const { address } = useAccount()
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getNftsOwned',
    account: address
  })
  if (isPending) return [BigInt(-1)]
  else if (error) {
    console.log("Failed to get contract owner. " + error)
    return [BigInt(-1)]
  } else {
    return data
  }
}

// Contract Owner

/**
 * Get Contract Owner
 * @returns owner
 */
export function GetContractOwner(): string {
  const { data, error } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getContractOwner',
  })
  if (error) {
    console.log("Failed to get contract owner. " + error)
    return "Error"
  } else return data as string
}

/**
 * Get Royalty percentage
 * @returns royalty
 */
export function GetRoyalty(walletAddress: `0x${string}` | undefined): (bigint | undefined ) {
  const { data, error } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getRoyalty',
    account: walletAddress,
  })
  if (error) {
    console.log("Failed to get royalty. " + error)
    return BigInt(-1)
  } else return data
}

/**
 * Get Total Minted
 * @returns minted
 */
export function GetTotalMinted(): (bigint | undefined) {
  const { data, error } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalMinted',
  })
  if (error) {
    console.log("Failed to get total minted. " + error)
    return BigInt(-1)
  } else return data
}
