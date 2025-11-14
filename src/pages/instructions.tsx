import React from "react"
import { Link } from 'react-router-dom';

export default function InstructionsMain() {
  return (
    <div>
      <h2>How to Mint an NFT Instructions</h2>
      <h3>Things you need:</h3>
      <p>Dropbox account</p>
      <p>Metamask Wallet browser extension</p>
      <p>Polygon crypto tokens</p>
      <br />
      <h3>Step 1 - Dropbox</h3>
      <p>Upload your future NFT's image to Dropbox</p>
      <br />
      <Link to="/mint">Now go mint a NFT</Link>
    </div>
  )
}