import { Link } from 'react-router-dom';
import { ConnectionStatus } from "./connection-status.tsx"

export default function NavigationBar() {
  return (    
    <div>
      <div className='nav-bar'>
        <div className='nav-home'>
          <Link to="/">Home</Link>
        </div>
        <div className='nav-links'>
          <Link to="/mint/">Mint</Link>
          <Link to="/instructions/">Mint Instructions</Link>
          <Link to="/marketplace/">Marketplace</Link>
        </div>
        <div className='nav-status'>
          <ConnectionStatus />
        </div>
      </div>
      <div className='logo-banner'>
        <img src={require("../../images/LogoBanner.jpg")} alt="Any NFT Marketplace"></img>
      </div>
    </div>
  )
}
