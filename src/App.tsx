import React from "react"
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from './components/navigation-bar.tsx';
import { Home } from './pages/home.tsx';
import { Mint } from './pages/mint.tsx';
import { Instructions } from './pages/instructions.tsx';
import { Marketplace } from './pages/marketplace.tsx';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
