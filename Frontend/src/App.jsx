import React from 'react'
import Home from './home/Home'
import {Routes, Route } from "react-router-dom";
import BookPage from './BookPage/BookPage';
import Signup from './components/Signup';


function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookPage />} />
          <Route path='signup' element={<Signup />}/>
        </Routes>
      </div>
    </>
  )
}

export default App