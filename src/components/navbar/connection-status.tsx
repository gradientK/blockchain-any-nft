import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"

export function ConnectionStatus() {
  const { isConnected } = useAccount()
  if (isConnected) return <Connected />
  return <NotConnected />
}

function Connected() {
  return (
    <div>
      <Link to="/logon/">Disconnect Wallet</Link>
    </div>
  )
}

function NotConnected() {
  return (
    <div>
      <div>Wallet is Disconnected</div>
    </div>
  )
}