import { BrowserRouter, Routes, Route } from "react-router-dom"
import './styles/main.scss';
import NavigationBar from './components/navbar/navigation-bar.tsx'
import Footer from './components/footer/footer.tsx'
import PageNotFound from './components/ui/not-found.tsx'
import AdminMain from './pages/admin.tsx'
import HomeMain from './pages/home.tsx'
import BurnMain from './pages/burn.tsx'
import InstructionsMain from './pages/instructions.tsx'
import LogonMain from './pages/logon.tsx'
import MarketplaceMain from './pages/marketplace.tsx'
import MintMain from './pages/mint.tsx'
import NftMain from './pages/nft.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="body-container">
        <NavigationBar />
        <main className="main-container"> 
          <Routes>
            <Route path="/admin/" element={<AdminMain />} />
            <Route path="/" element={<HomeMain />} />
            <Route path="/burn/" element={<BurnMain />} />
            <Route path="/instructions/" element={<InstructionsMain />} />
            <Route path="/logon/" element={<LogonMain />} />
            <Route path="/marketplace/" element={<MarketplaceMain />} />
            <Route path="/mint/" element={<MintMain />} />
            <Route path="/nft/" element={<NftMain />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
