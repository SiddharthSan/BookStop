import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !email || !password) {
      // Show toast notification if any field is empty
      toast.error('All fields are required!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    // Log the input values
    const formData = {
      name: name,
      email: email,
      password: password,
    };
    console.log(formData);

    // Clear the form inputs after successful submission
    setName('');
    setEmail('');
    setPassword('');

    // Show success toast
    toast.success('Signup successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <ToastContainer />
      <div 
        className="relative border-2 shadow-md rounded-md p-5 w-full max-w-sm bg-grey"
      >
        <form method="dialog">
          {/* Close button */}
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
