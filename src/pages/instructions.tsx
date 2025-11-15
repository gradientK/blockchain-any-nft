import React from "react"
import { Link } from 'react-router-dom';

export default function InstructionsMain() {
  return (
    <div className="instructions-container">
      <h2>How to Mint an NFT</h2>
      
      <div className="prerequisites">
        <h3>What You'll Need:</h3>
        <p>1. Dropbox account</p>
        <p>2. MetaMask Wallet browser extension</p>
        <p>3. Polygon (POL) crypto tokens</p>
      </div>

      <div className="instruction-step">
        <h3>Step 1 - MetaMask</h3>
        <p>Login to your MetaMask wallet browser extension</p>
        <img src={require("../images/instructions/1login.jpg")} alt="Login to MetaMask" />
      </div>

      <div className="instruction-step">
        <h3>Step 2 - Dropbox</h3>
        <p>1. Upload your future NFT's image to Dropbox</p>
        <img src={require("../images/instructions/2upload.jpg")} alt="Upload to Dropbox" />
        
        <p>2. Select your image, click "Share", and click "Copy link"</p>
        <img src={require("../images/instructions/3share.jpg")} alt="Dropbox click Share" />
        
        <p>3. Ensure your image is shareable to "Anyone with link"</p>
        <img src={require("../images/instructions/4anyonewithlink.jpg")} alt="Dropbox is shareable" />
      </div>

      <div className="instruction-step">
        <h3>Step 3 - Mint Form</h3>
        <p>1. Paste your Dropbox link into the Dropbox Address field</p>
        <p>2. Fill out the rest: NFT Name, Description, and Price (enter '0' if not for sale)</p>
        <img src={require("../images/instructions/5form.jpg")} alt="Fill out form" />
        <p>3. Click "Mint NFT"</p>
      </div>

      <div className="instruction-step">
        <h3>Step 4 - Approve Transaction</h3>
        <p>MetaMask will ask for your approval. Review the transaction and click "Confirm"</p>
        <img src={require("../images/instructions/6approve.jpg")} alt="Click Confirm" />
      </div>

      <Link to="/mint" className="cta-link">
        Start Minting Your NFT →
      </Link>
    </div>
  )
}