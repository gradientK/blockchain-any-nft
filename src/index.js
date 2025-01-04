import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Any NFT App",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        checkInstallationImmediately: false
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
