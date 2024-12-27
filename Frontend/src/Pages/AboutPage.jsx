import React from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className='mt-20'>
        <About />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
