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
    return BigInt(parseInt(value, 20)) === BigInt(value)
  } catch (e) {
    console.log("Failed to parse Big Integer: Search Parameter 'token'")
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
 * Split Array into Array within Array
 * @param array
 * @param size of sub arrays, must be positive integer
 * @returns 
 */
export function SplitArray(array: bigint[], subSize: number): (bigint | undefined)[][] {
  let newArray: (bigint | undefined)[][] = []

  let tmpArray: (bigint | undefined)[] = []
  for (let i = 0; i < array.length; i++) {
    if (tmpArray.length < subSize) {
      tmpArray.push(array.at(i))
    } else {
      newArray.push(tmpArray)
      tmpArray.length = 0 // reset array
    }
    // don't forget to push the last sub array, however incomplete
    if (i === array.length - 1 && tmpArray.length > 0) {
      newArray.push(tmpArray)
    }
  }
  // fill in the remainder so all sub arrays are of equal length
  for (let j = tmpArray.length; j < subSize; j++) {
    newArray.at(newArray.length - 1)?.push(BigInt(0))
  } 
  return newArray
}