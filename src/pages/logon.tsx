import React from "react"
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { WalletOptions } from "../components/wallet/wallet-options.tsx"

export default function LogonMain() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()
  if (isConnected) return (
    <div>
      <p />
      {address && <div>Wallet Connected: {ensName ? `${ensName} (${address})` : address}</div>}
      <button onClick={() => disconnect()}>Disconnect MetaMask</button>
    </div>
  )
  return <Reconnect />
}

function Reconnect() {
  return (
    <div>
      <p />
      Connect Wallet
      <br />
      <WalletOptions />
    </div>
  )
}