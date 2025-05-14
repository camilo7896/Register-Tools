import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import IndexRouters from './routes/IndexRouters'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <IndexRouters />
    </BrowserRouter>
  </StrictMode>,
)