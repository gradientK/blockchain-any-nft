import props from "./properties.json"

export function GetCoinNetwork() {
  return props.BLOCKCHAIN_NETWORK
}

export function GetContractAddress() {
  return props.POLYGON_MAINNET_ANYNFT_SMART_CONTRACT_ADDRESS
}
