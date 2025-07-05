import { Link } from 'react-router-dom';
import { useAccount } from "wagmi"
import LogonLink from "../components/ui/logon-link.tsx"

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) {
    return <Home />
  } else {
    return <LogonLink />
  }
}

function Home() {
  return (
    <div>
      <h3>Welcome to PhysNFT</h3>
      <Link to="/1">Click to see your NFTs</Link>  
    </div>
  )
}