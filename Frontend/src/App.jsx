import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './home/Home';
import BookPage from './Pages/BookPage';
import Signup from './components/Signup';
import Login from './components/Login';
import { CartProvider } from './context/cartProvider'
import CartPage from './Pages/CartPage';
import CheckOutPage from './Pages/CheckOutPage';
import AuthProvider from './context/AuthProvider';
import AboutPage from './Pages/AboutPage';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Login />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
