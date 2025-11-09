import { useAccount, useReadContract } from "wagmi"
import { abi } from "../config/abi.ts"
import { GetContractAddress } from "../config/prop-reader.tsx"

const contractAddress: string = GetContractAddress()

/**
 * Get NFT information
 * @returns token ID, price, sale index, name, description, address uri
 */
export function GetNft(tokenId: bigint): readonly [bigint, string, bigint, bigint, string, string, string] | undefined {
  const { address } = useAccount()
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getNFT',
    account: address,
    args: [
      tokenId
    ]
  })
  if (isPending) return [BigInt(-2), 'Pending', BigInt(-2), BigInt(-2), 'Pending', 'Pending', 'Pending']
  else if (error) {
    console.warn("Failed to get NFT. " + error)
    return [BigInt(-1), 'Error', BigInt(-1), BigInt(-1), 'Error', 'Error', 'Error']
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
  if (isPending) return [BigInt(-2)]
  else if (error) {
    console.warn("Failed to get owned by owner. " + error)
    return [BigInt(-1)]
  } else {
    return data
  }
}

/**
 * Get data for multiple NFTs
 * @returns [[sale price], [token name], [uri location]]
 */
export function GetNftsData(tokenIDs: bigint[]): readonly [readonly bigint[], readonly string[], readonly string[]] | undefined {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getNftsData',
    args: [tokenIDs]
  })
  if (isPending) return [[BigInt(-2)], ['Pending'], ['Pending']]
  else if (error) {
    console.warn("Failed to get NFTs data. " + error)
    return [[BigInt(-1)], ['Error'], ['Error']]
  } else {
    return data
  }
}

/**
 * Get IDs for NFTs on sale
 * @returns [token IDs]
 */
export function GetForSaleList(startIndex: bigint, endIndex: bigint): readonly bigint[] {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getForSaleList',
    args: [startIndex, endIndex]
  })
  if (isPending) return [BigInt(-2)]
  else if (error) {
    console.warn("Failed to get group of NFT IDs for sale. " + error)
    return [BigInt(-1)]
  } else {
    return data
  }
}

/**
 * Get total number of NFTs currently for sale
 * @returns total
 */
export function GetTotalForSale(): bigint {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalForSale'
  })
  if (isPending) return BigInt(-2)
  else if (error) {
    console.warn("Failed to get total NFTs for sale. " + error)
    return BigInt(-1)
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
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getContractOwner',
  })
  if (isPending) return 'Pending'
  else if (error) {
    console.warn("Failed to get contract owner. " + error)
    return "Error"
  } else return data as string
}

/**
 * Get Royalty percentage
 * @returns royalty
 */
export function GetRoyalty(): bigint {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getRoyalty',
  })
  if (isPending) return BigInt(-2)
  else if (error) {
    console.warn("Failed to get royalty. " + error)
    return BigInt(-1)
  } else return data
}

/**
 * Get Total Minted
 * @returns minted
 */
export function GetTotalMinted(): (bigint | undefined) {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalMinted',
  })
  if (isPending) return BigInt(-2)
  else if (error) {
    console.warn("Failed to get total minted. " + error)
    return BigInt(-1)
  } else return data
}

/**
 * Get Total Mintable
 * @returns total mintable
 */
export function GetTotalMintable(walletAddress: `0x${string}` | undefined): (bigint | undefined ) {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'getTotalMintable',
    account: walletAddress
  })
  if (isPending) return BigInt(-2)
  else if (error) {
    console.warn("Failed to get total mintable. " + error)
    return BigInt(-1)
  } else return data
}

/**
 * Is Contract Paused
 * @returns is paused is true
 */
export function IsPaused(): boolean | undefined {
  const { data, error, isPending } = useReadContract({
    abi,
    address: contractAddress as `0x${string}`,
    functionName: 'isPaused'
  })
  if (isPending) return undefined
  if (error) {
    console.warn("Failed to get isPaused status. " + error)
    throw new Error("Error retrieving is paused status.");
  } else return data
}
