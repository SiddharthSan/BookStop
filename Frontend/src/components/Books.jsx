import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import {Link} from "react-router-dom"
import axios from "axios"

function Books() {
  const [book, setBook]=useState([])
  useEffect(() => {
    const getBook=async()=>{
      try{
        const res = await axios.get("http://localhost:4001/book")
        console.log(res.data)
        setBook(res.data)
      }catch(error){
        console.log(error)
      }
    }
    getBook()
  }, [])
  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div className='mt-28 items-center justify-center text-center'>
          <h1 className='text-2xl font-semibold md:text-4xl'>
            We are delighted to have you <span className='text-pink-500'>here!</span>
          </h1>
          <p className='mt-12'>
            We’re excited to have you here! Whether you’re searching for classic tales or modern favorites, our collection has something for every reader. Dive into captivating stories, explore new worlds, and find your next favorite book—all at great prices. From inspiring journeys to thrilling adventures, there’s a book waiting just for you. Browse through a wide range of genres, including fiction, nonfiction, and more. Discover timeless classics, contemporary reads, and everything in between. Whatever your taste, we’ve got something that’s sure to spark your interest. Happy reading!
          </p>
          <Link to='/'>
          <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
            Back
          </button>
          </Link>
        </div>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-5'>
          {book.map((item) => (
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books;
