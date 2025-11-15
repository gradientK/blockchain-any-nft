import { Link } from 'react-router-dom';

export default function LogonLink() {
  return (
    <div className="logon-prompt">
      <h3>Any NFT Marketplace</h3>
      <Link to="/logon/">Connect Your Wallet</Link>
    </div>
  )
}