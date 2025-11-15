import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"

export function ConnectionStatus() {
  const { isConnected } = useAccount()
  if (isConnected) return <Connected />
  return <NotConnected />
}

function Connected() {
  return (
    <div className="connection-status">
      <span className="status-indicator connected"></span>
      <span className="status-text">Connected</span>
      <Link to="/logon/">Disconnect</Link>
    </div>
  )
}

function NotConnected() {
  return (
    <div className="connection-status">
      <span className="status-indicator disconnected"></span>
      <span className="status-text">Disconnected</span>
    </div>
  )
}
