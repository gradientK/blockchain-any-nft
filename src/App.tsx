import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavigationBar from './components/navbar/navigation-bar.tsx'
import PageNotFound from './components/ui/not-found.tsx'
import HomeMain from './pages/home.tsx'
import InstructionsMain from './pages/instructions.tsx'
import MarketplaceMain from './pages/marketplace.tsx'
import MintMain from './pages/mint.tsx'
import NftMain from './pages/nft.tsx'
import LogonMain from './pages/logon.tsx'
import AdminMain from './pages/admin.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/instructions" element={<InstructionsMain />} />
        <Route path="/marketplace" element={<MarketplaceMain />} />
        <Route path="/mint" element={<MintMain />} />
        <Route path="/nft" element={<NftMain />} />
        <Route path="/logon" element={<LogonMain />} />
        <Route path="/admin" element={<AdminMain />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
