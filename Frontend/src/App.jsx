import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home/Home';
import BookPage from './BookPage/BookPage';
import Signup from './components/Signup';
import Login from './components/Login';
import { CartProvider } from './context/cartProvider'

function App() {
  return (
    <CartProvider>
      <Login />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
