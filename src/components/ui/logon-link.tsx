import { Link } from 'react-router-dom';

export default function LogonLink() {
  return (
    <div>
      <h3>Welcome to PhysNFT</h3>
      <Link to="/logon">Log in to your wallet</Link>
    </div>
  )
}