/**
 * Checks if object is a BigInt
 * @param value
 * @returns boolean
 */
export function IsBigInt(value: any): boolean {
  try {
    if (isNaN(value)) {
      return false
    }
    return BigInt(parseInt(value)) === BigInt(value)
  } catch (e) {
    console.error("Failed to parse Big Integer: " + value)
    return false
  }
}

/**
 * Checks if value is a valid Eth price
 * @param value
 * @returns boolean
 */
export function IsValidEth(value: string): boolean {
  try {
    if (isNaN(value as unknown as number) || isNaN(parseFloat(value))) {
      return false
    } else if (parseFloat(value) < 0.000000000000000001) {
      return false
    }
    return true
  } catch (e) {
    console.error("Failed to parse Eth price: " + value)
    return false
  }
}

/**
 * Fisher–Yates Shuffle
 * @param array
 * @returns shuffled array
 */
export function ShuffleArray(array: []) {
  for (let i = array.length - 1; i >= 1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

/**
 * Adds extra zeros to end of array to make array evenly divisible
 * ex. divSize 6: [2,3,5,8] becomes [2,3,5,8,0,0]
 * @param array
 * @param divSize divisible number, must be positive integer
 * @returns 
 */
export function PadArray(array: readonly bigint[], divSize: number): bigint[] {
  const desiredLength: number = Math.ceil(array.length / divSize) * divSize
  const newArray: bigint[] = []
  for (let value of array) {
    newArray.push(value)
  }
  for (let i = array.length; i < desiredLength; i++) {
    newArray.push(BigInt(0))
  }
  return newArray
}

/**
 * If value equals 0, replace with value at index 0
 * ex. [2,3,5,8,0,0] becomes [2,3,5,8,2,2]
 * @param array 
 */
export function ReplaceZeros(array: bigint[]): bigint[] {
  let replaced: bigint[] = []
  for (let i = 0; i < array.length; i++) {
    if (array.at(i) === BigInt(0)) {
      replaced.push(array.at(0) as bigint)
    } else {
      replaced.push(array.at(i) as bigint)
    }
  }
  return replaced
}

/**
 * If value equals value at index 0, remove
 * ex. [2,3,5,8,2,2] becomes [2,3,5,8]
 * @param array 
 */
export function DedupArray(array: bigint[]): bigint[] {
  let deduped: bigint[] = []
  deduped.push(array.at(0) as bigint)
  for (let i = 1; i < array.length; i++) {
    if (array.at(i) !== array.at(0)) {
      deduped.push(array.at(i) as bigint)
    }
  }
  return deduped
}
