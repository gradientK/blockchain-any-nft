import { useAccount } from "wagmi"
import { Account } from "./../components/wallet/account.tsx"
import { Disconnected } from './../components/disconnected.tsx';

export function Home() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <Disconnected />
}