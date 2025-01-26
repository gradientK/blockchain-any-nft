import { useAccount } from "wagmi"
import Reconnect from "../components/ui/reconnect.tsx"

export default function HomeMain () {
  const { isConnected } = useAccount()
  if (isConnected) return <Home />
  return <Reconnect />
}

function Home() {
  return (
    <div>
      Owned, sale and not for sale goes here
    </div>
  )
}