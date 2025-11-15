import { Link } from 'react-router-dom';
import { ConnectionStatus } from "./connection-status.tsx"
import polygonIcon from "../../images/polygon-token.svg"

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
        <div className="logo-container">
          <img src={require("../../images/LogoBanner.jpg")} alt="Any NFT Marketplace" className="logo-main" />
          <div className="polygon-branding">
            <span className="polygon-text">Powered by</span>
            <img src={polygonIcon} alt="Polygon" className="polygon-icon" />
            <span className="polygon-name">Polygon</span>
          </div>
        </div>
      </div>
    </div>
  )
}