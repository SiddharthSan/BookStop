import React from 'react';
import list from "../../public/list.json";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from './Cards';

function CheapBooks() {
    const filterData = list.filter((data) => data.category === "Sale");

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
              {filterData.map((item) => (
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
