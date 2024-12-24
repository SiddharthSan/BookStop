import React from 'react'
import Books from '../components/Books'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function BookPage() {
  return (
    <>
        <Navbar />
        <div className='min-h-screen'>
          <Books />
        </div>
        <Footer />
    </>
  )
}

export default BookPage