import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskUIProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Tokenize Anything",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </React.StrictMode>
);
