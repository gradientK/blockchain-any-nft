import { Link } from 'react-router-dom';
import { ConnectionStatus } from "./connection-status.tsx"

export default function NavigationBar() {
  return (    
    <div className='navBar'>
      <Link to="/">Home</Link>
      <br />
      <Link to="/mint/">Mint</Link>
      <br />
      <Link to="/instructions/">Mint Instructions</Link>
      <br />
      <Link to="/marketplace/">Marketplace</Link>
      <p />
      <ConnectionStatus />
      --------------------------------------------------------------------------
      <p />
    </div>
  )
}
