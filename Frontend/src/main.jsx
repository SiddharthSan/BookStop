import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import { CartProvider } from './context/cartProvider.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
    <div >
      <App />
    </div>
    </CartProvider>
  </AuthProvider>
  </BrowserRouter>,
)
