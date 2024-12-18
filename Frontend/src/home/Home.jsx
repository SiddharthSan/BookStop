import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import CheapBooks from '../components/CheapBooks'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <CheapBooks />
      <Footer />
    </>
  )
}

export default Home