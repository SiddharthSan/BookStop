import React from 'react';

function Cards({ item }) {
    return (
        <>
            <div className="my-10">
                {/* Hover effect for card pop out*/}
                <div className="card bg-base-100 w-96 shadow-2xl group hover:shadow-4xl hover:scale-105 transition-all duration-300 ">
                    <figure>
                        <img
                            src={item.image}
                            alt="Book Cover"
                            style={{
                                width: '150px',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '8px',
                            }}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {item.title || "Book Title"}
                            <div className="badge badge-secondary">{item.price}</div>
                        </h2>
                        <p>{item.description || "Book description goes here."}</p>
                        <div className="card-actions justify-between">
                            <div className="badge badge-outline py-3">{item.category || "Category"}</div>
                            <div className="cursor-pointer badge badge-outline border-[2px] hover:bg-pink-500 hover:text-white px-2 py-3 duration-200">
                                Buy Now
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cards;
