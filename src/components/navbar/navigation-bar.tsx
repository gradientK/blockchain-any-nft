import { Link } from 'react-router-dom';
import { ConnectionStatus } from "./connection-status.tsx"

function NavigationBar() {
  return (    
    <div className='navBar'>
      <Link to="/">Home</Link>
      <p />
      <Link to="/mint">Mint</Link>
      <p />
      <Link to="/instructions">Mint Instructions</Link>
      <p />
      <Link to="/marketplace">Marketplace</Link>
      <p />
      <ConnectionStatus />
      <p />
      ----------------------------------------------------------------------------------
      <p />
    </div>
  )
}

export default NavigationBar;
