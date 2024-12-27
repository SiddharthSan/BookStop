import React from 'react';
import { useCart } from '../context/cartProvider';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const [authUser] = useAuth(); // Retrieve authUser from context
  const navigate = useNavigate();

  const handleBackToShop = () => {
    clearCart()
    navigate('/book')
  };

  return (
    <div className="max-w-screen-2xl container mx-auto mt-28">
      <h1 className="text-4xl font-bold text-center mb-7">
        Thank You <br />
        <span className='text-pink-500'> {authUser?.fullname || 'Guest'} </span>, for your Purchase!
      </h1>

      <div className="bg-slate-800 p-6 rounded-md shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-pink">Your Order Summary:</h2>

        <p className="text-xl mb-2">Hello, {authUser?.fullname || 'Guest'}!</p>
        <p className="text-lg mb-4">
          Thank you for buying from us.
        </p>
        <p className="text-lg mb-4">
          Your total order value is: <span className='text-pink-500'>₹{totalPrice.toFixed(2)}</span>
        </p>

        <h3 className="text-xl font-bold mb-4">Purchased Books:</h3>
        <ul className="list-disc list-inside mb-6 text-pink-500">
          {cart.map((item) => (
            <li key={item._id}>
              {item.title} - ₹{(item.price * item.quantity).toFixed(2)} (x{item.quantity})
            </li>
          ))}
        </ul>

        <p className="text-lg mt-6">We hope you enjoy your new reads!</p>

        <button
          onClick={handleBackToShop}
          className="mt-6 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 duration-300"
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
}

export default Checkout;
