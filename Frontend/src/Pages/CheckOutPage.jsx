import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Checkout from '../components/CheckOut'

function CheckOutPage() {
  return (
    <>
        <Navbar />
        <div className='min-h-screen'>
          <Checkout />
        </div>
        <Footer />
    </>
  )
}

export default CheckOutPage