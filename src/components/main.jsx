import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode> 
    <BrowserRouter>
      <CartProvider>
        <App />
        <ToastContainer />
      </CartProvider>
    </BrowserRouter>
   </React.StrictMode>
);
