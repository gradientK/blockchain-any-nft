import { useAccount } from "wagmi"
import { Reconnect } from "./../components/reconnect.tsx"

export function Home() {
  const { isConnected } = useAccount()
  if (isConnected) return <HomeMain />
  return <Reconnect />
}

function HomeMain() {
  return (
    <div>
      Owned, sale and not for sale goes here
    </div>
  )
}