import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { PortfolioProvider } from './context/PortfolioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PortfolioProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PortfolioProvider>
  </StrictMode>,
)