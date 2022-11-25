import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme/theme'
import './theme/style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
