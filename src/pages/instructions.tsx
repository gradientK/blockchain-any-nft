import React from "react"
import { Link } from 'react-router-dom';

export default function InstructionsMain() {
  return (
    <div>
      <h2>How to Mint an NFT Instructions</h2>
      <h3>Things you need:</h3>
      <p>1. Dropbox account</p>
      <p>2. Metamask Wallet browser extension</p>
      <p>3. Polygon crypto tokens</p>
      <br />
      <h3>Step 1 - MetaMask</h3>
      <p>1. Login to your MetaMask wallet browser extension</p>
      <p><img src={require("../images/instructions/1login.jpg")} alt="Login to MetaMask" height="170px" /></p>
      <br />
      <h3>Step 2 - Dropbox</h3>
      <p>1. Upload your future NFT's image to Dropbox</p>
      <p><img src={require("../images/instructions/2upload.jpg")} alt="Upload to Dropbox" height="83px" /></p>
      <p>2. Select your image, click "Share", and click "Copy link"</p>
      <img src={require("../images/instructions/3share.jpg")} alt="Dropbox click Share" height="100px" />
      <p>3. Ensure your image is shareable to Anyone with link</p>
      <img src={require("../images/instructions/4anyonewithlink.jpg")} alt="Dropbox is shareable" height="247px" />
      <br /><br />
      <h3>Step 3 - Mint Form</h3>
      <p>1. Paste your Dropbox link into Dropbox Address</p>
      <p>2. Fill out the rest: NFT Name, Description, and Price ('0' if not for sale)</p>
      <img src={require("../images/instructions/5form.jpg")} alt="Fill out form" height="167px" />
      <p>3. Click Mint NFT</p>
      <br />
      <h3>Step 4 - Approve</h3>
      <p>1. MetaMask will ask for your approval, click Confirm</p>
      <img src={require("../images/instructions/6approve.jpg")} alt="Click Confirm" height="275px" />
      <br /><br />
      <Link to="/mint">Now go mint a NFT</Link>
    </div>
  )
}