import React from 'react'
import ReactDOM from 'react-dom'
import { MsalProvider } from '@azure/msal-react'
import { Configuration, PublicClientApplication } from '@azure/msal-browser'
import { StoreContextProvider } from './context/storeProvider'

import App from './App'

const configuration: Configuration = {
  auth: {
    clientId: 'bd29d0e0-7ba8-409a-b609-429b66a82603',
  },
}

const pca = new PublicClientApplication(configuration)

const AppProvider = () => (
  <MsalProvider instance={pca}>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </MsalProvider>
)

ReactDOM.render(<AppProvider />, document.getElementById('root'))
