import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      toast.error('All fields are required!', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
      });
      return;
    }

    const formData = {
      fullname: name,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:4001/user/signup', formData);
      console.log(response.data);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      setName('');
      setEmail('');
      setPassword('');

      // Show success toast
      toast.success('Signup successful!', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.error('Error during signup:', error);
      // Show error toast
      toast.error(error.response?.data?.message || 'Signup failed!', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <ToastContainer />
      <div className="relative border-2 shadow-md rounded-md p-5 w-full max-w-sm bg-grey">
        <form method="dialog">
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            style={{ zIndex: 10 }} // Ensure it stays on top
          >
            ✕
          </Link>
        </form>
        <h3 className="font-bold text-lg text-center">Signup</h3>

        {/* Name Field */}
        <div className="mt-4 space-y-1">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-200 text-[#4B4B4B]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="mt-4 space-y-1">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-200 text-[#4B4B4B]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mt-4 space-y-1">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-md outline-none bg-slate-200 text-[#4B4B4B]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <button
            type="button"
            className={`w-full bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 duration-200 ${
              !name || !email || !password ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={handleSignup}
            disabled={!name || !email || !password} // Disable button if fields are empty
          >
            Signup
          </button>
          <p className="text-md">
            Have an account?&nbsp;
            <button
              className="underline text-blue-500 cursor-pointer"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
