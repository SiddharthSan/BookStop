// components/Cards.jsx
import React, { useState } from 'react';
import { useCart } from '../context/cartProvider';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';

function Cards({ item }) {
  const [quantity, setQuantity] = useState(1);
  const [isBuying, setIsBuying] = useState(false);
  const { addToCart, loading } = useCart();
  const [authUser] = useAuth();

  const handleBuyNow = () => {
    if (!authUser) {
      toast.error('Please login to continue');
      document.getElementById("my_modal_3").showModal();
      return;
    }
    setIsBuying(true);
  };

  const handleAddToCart = async () => {
    await addToCart({ ...item, quantity });
    setIsBuying(false);
    setQuantity(1);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      setIsBuying(false);
    }
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="my-10">
      <div className="card bg-base-100 w-96 shadow-2xl group hover:shadow-4xl hover:scale-105 transition-all duration-300">
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
            {item.title}
            <div className="badge badge-secondary">{item.price}</div>
          </h2>
          <p>{item.description}</p>
          <div className="card-actions justify-between">
            <div className="badge badge-outline py-3">{item.category}</div>
            {!isBuying ? (
              <button
                className="cursor-pointer badge badge-outline border-[2px] hover:bg-pink-500 hover:text-white px-2 py-3 duration-200"
                onClick={handleBuyNow}
                disabled={loading}
              >
                Buy Now
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={decreaseQuantity}
                  disabled={loading}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={increaseQuantity}
                  disabled={loading}
                >
                  +
                </button>
                <button
                  className="cursor-pointer badge badge-outline border-[2px] hover:bg-pink-500 hover:text-white px-2 py-3 duration-200"
                  onClick={handleAddToCart}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Confirm'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;