import { Link } from 'react-router-dom';

function Navbar() {
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
    </div>
  )
}

export default Navbar;