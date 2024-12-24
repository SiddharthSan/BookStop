import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/cartProvider';
import Login from './Login';
import Logout from './Logout';
import { toast } from 'react-toastify';

function Navbar() {
  const [authUser] = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleBooksClick = (e) => {
    if (!authUser) {
      e.preventDefault();
      toast.error('Please login to access Books', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
      });
      document.getElementById("my_modal_3").showModal();
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Books', path: '/books', requireAuth: true, onClick: handleBooksClick },
    {
      label: (
        <div className="relative">
          Cart
          {cart.length > 0 && (
            <span
              className="absolute -top-1 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {cart.length}
            </span>
          )}
        </div>
      ),
      path: '/cart',
    },
    { label: 'About', path: '/about' },
  ];

  return (
    <div
      className={`max-w-screen-2xl container mx-auto md:px-20 px-4 fixed top-0 left-0 right-0 z-50 ${
        sticky ? 'sticky-navbar shadow-2xl bg-base-200 duration-300 transition-all ease-in-out' : ''
      }`}
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          {/* Mobile Dropdown Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={item.requireAuth ? item.onClick : undefined}
                    className={!authUser && item.requireAuth ? 'opacity-50' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold cursor-pointer">
            BookStop
          </Link>
        </div>

        {/* Navbar End - Combined navigation items and actions */}
        <div className="navbar-end">
          {/* Navigation Items */}
          <ul className="hidden lg:flex menu menu-horizontal px-1 mr-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={item.requireAuth ? item.onClick : undefined}
                  className={!authUser && item.requireAuth ? 'opacity-50' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search Input */}
          <div className="hidden md:block mr-4">
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>

          {/* Auth Buttons */}
          {authUser ? (
            <Logout />
          ) : (
            <div>
              <button
                className="bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300"
                onClick={() => document.getElementById("my_modal_3").showModal()}
              >
                Login
              </button>
            </div>
          )}
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Navbar;