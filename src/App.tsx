import React from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import NavigationBar from './components/navbar/navigation-bar.tsx';
import { Home } from './pages/home.tsx';
import { Mint } from './pages/mint.tsx';
import { Instructions } from './pages/instructions.tsx';
import { Marketplace } from './pages/marketplace.tsx';
import { Owner } from './pages/owner.tsx';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/owner" element={<Owner />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
