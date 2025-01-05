import { useSDK } from "@metamask/sdk-react";
import React, {useState} from 'react';

const MetaMask = () => {
  const [account, setAccount] = useState(null);
  const { sdk, connected, connecting, provider, chainId } = useSDK(); 
  
  const connectWallet = async () => {
    try {
      const accounts = await sdk.connect();
      setAccount(accounts[0]);
    } catch (err) {
      console.warn("Failed to connect to MetaMask..", err);
    }
  }

  return (
    <div>
      <button onClick={(connectWallet)}>
        Connect to MetaMask
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  )
}

export default MetaMask;