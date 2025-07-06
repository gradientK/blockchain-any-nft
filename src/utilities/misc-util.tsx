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
 * @param array
 * @param divSize divisible number, must be positive integer
 * @returns 
 */
export function PadArray(array: bigint[], divSize: number): (bigint)[] {
  const desiredLength: number = Math.ceil(array.length / divSize) * divSize
  const newArray: bigint[] = array
  for (let i = array.length; i < desiredLength; i++) {
    newArray.push(BigInt(0))
  }
  return newArray
}