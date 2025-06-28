import React from "react"
import { Link } from 'react-router-dom';

export default function InstructionsMain() {
  return (
    <div>
      <p>instructions</p>
      <br />
      <Link to="/mint">Now go mint your NFT</Link>
    </div>
  )
}