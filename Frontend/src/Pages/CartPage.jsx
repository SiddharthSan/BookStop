import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <Navbar />
      </div>
      <div className='mb-14' style={{ minHeight: 'calc(100vh - 60px)', overflowY: 'auto' }}>
        <Cart />
      </div>
      <Footer />
    </>
  );
}

export default CartPage;