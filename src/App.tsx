import React from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import NavigationBar from './components/navbar/navigation-bar.tsx';
import HomeMain from './pages/home.tsx';
import InstructionsMain from './pages/instructions.tsx';
import MarketplaceMain from './pages/marketplace.tsx';
import MintMain from './pages/mint.tsx';
import NftMain from './pages/nft.tsx';
import OwnerMain from './pages/owner.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeMain />} />
        <Route path="/instructions" element={<InstructionsMain  />} />
        <Route path="/marketplace" element={<MarketplaceMain  />} />
        <Route path="/mint" element={<MintMain  />} />
        <Route path="/nft" element={<NftMain />} />
        <Route path="/owner" element={<OwnerMain  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
