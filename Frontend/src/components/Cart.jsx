import React from 'react';
import { useCart } from '../context/cartProvider';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, totalItems, totalPrice, updateCartItem, removeFromCart } = useCart();

  if (!cart.length) {
    return (
      <div className="max-w-screen-lg mx-auto text-center mt-16 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Your Cart is Empty</h2>
        <p className="mt-4 mb-6 text-gray-600">
          Browse our collection to add books to your cart.
        </p>
        <Link
          to="/book"
          className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300"
        >
          Explore Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-16 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-7">
        Your Cart
      </h1>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap sm:flex-nowrap items-center justify-between p-4 bg-slate-800 shadow rounded-md min-h-[96px]"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-base sm:text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Controls Container */}
              <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                {/* Quantity Selector */}
                <div className="flex items-center border rounded-md h-10">
                  <button
                    onClick={() => updateCartItem(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1 text-base"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItem(item._id, item.quantity + 1)}
                    className="px-3 py-1 text-base"
                  >
                    +
                  </button>
                </div>
                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="bg-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-pink-700 duration-300"
                >
                  Remove
                </button>
              </div>

              <p className="text-lg font-bold mt-4 sm:mt-0 sm:text-right">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="p-4 sm:p-6 bg-slate-800 rounded-md shadow h-fit">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between text-base sm:text-lg mb-2">
            <p>Total Items:</p>
            <p>{totalItems}</p>
          </div>
          <div className="flex justify-between text-base sm:text-lg mb-4">
            <p>Total Price:</p>
            <p>₹{totalPrice.toFixed(2)}</p>
          </div>
          <Link
            to="/checkout"
            className="mt-6 bg-green-700 text-white px-4 py-2 w-full rounded-md hover:bg-green-800 duration-300 block text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
