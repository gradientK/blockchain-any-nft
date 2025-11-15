import React from "react"
import { Link } from 'react-router-dom';
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { WalletOptions } from "../components/wallet/wallet-options.tsx"

export default function LogonMain() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="wallet-connect-container">
        <h3>Wallet Connected</h3>
        
        <div className="connection-status">
          <span className="status-icon"></span>
          <span className="status-text">Active Connection</span>
        </div>

        {address && (
          <div className="wallet-address">
            {ensName ? `${ensName} (${address})` : address}
          </div>
        )}

        <button 
          onClick={() => disconnect()} 
          className="action-button disconnect-button"
        >
          Disconnect Wallet
        </button>

        <Link to="/">Return Home</Link>
      </div>
    )
  }
  return <Reconnect />
}

function Reconnect() {
  return (
    <div className="wallet-connect-container">
      <h3>Connect Your Wallet</h3>
      <p>Choose a wallet to connect to the marketplace</p>
      <WalletOptions />
    </div>
  )
}