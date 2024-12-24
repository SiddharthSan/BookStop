import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';
import axios from 'axios';

function CheapBooks() {
  const [book, setBook]=useState([])
  useEffect(() => {
    const getBook=async()=>{
      try{
        const res = await axios.get("http://localhost:4001/book")
        const data = res.data.filter((data) => data.category === "Sale")
        setBook(data)
        console.log(data)
      }catch(error){
        console.log(error)
      }
    }
    getBook()
  }, [])


    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <>
        <div className='max w-screen-2xl container mx-auto md:px-20 px-4'>
          <div>
            <h1 className='font-bold pb-2 text-xl semibold'>Books on Sale</h1>
            <p className='bp-2'>
              Looking for some great reads without breaking the bank?
              Check out our collection of amazing books on sale, with something for everyone—whether you love heartwarming stories, thrilling adventures, or inspiring tales. Dive into your next favorite book at a price that’ll make you smile!
            </p>
          </div>

          <div>
            <Slider {...settings}>
              {book.map((item) => (
                <div key={item.id}> {/* Ensure each slide is wrapped in its own div */}
                  <Cards item={item} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </>
    );
}

export default CheapBooks;
