import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx'; // ✅ NEW
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider> {/* ✅ Wrap the entire app */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
