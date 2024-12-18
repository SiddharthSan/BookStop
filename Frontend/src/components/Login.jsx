import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const modal = document.getElementById("my_modal_3");

    if (modal && location.pathname === '/login') {
      modal.showModal();
    }

    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, [location.pathname]);

  const closeModal = () => {
    setEmail(''); // Clear email input
    setPassword(''); // Clear password input
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      modal.close();
    }
  };

  const closeModalAndNavigate = (path) => {
    closeModal(); // Clear inputs before navigating
    window.location.href = path;
  };

  const handleLogin = () => {
    if (!email || !password) {
      // Show toast notification if fields are empty
      toast.error('Please fill out all fields before logging in.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }

    const formData = {
      email: email,
      password: password,
    };
    console.log(formData);

    // Clear the form inputs after submitting
    setEmail('');
    setPassword('');
    toast.success('Login successful!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div>
      <ToastContainer />
      <dialog
        id="my_modal_3"
        className="modal"
      >
        <div className="modal-box max-w-sm">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>

          <h3 className="font-bold text-xl">Login</h3>

          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none bg-slate-200 text-[#4B4B4B]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none bg-slate-200 text-[#4B4B4B]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-4 flex justify-around pt-3">
            <button
              className={`bg-pink-500 text-white rounded-md px-3 py-2 hover:bg-pink-700 duration-200 ${
                !email || !password ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleLogin}
              disabled={!email || !password} // Disable button if fields are empty
            >
              Login
            </button>
            <p className="pt-2">
              Not registered?&nbsp;
              <button
                className="underline text-blue-500 cursor-pointer"
                onClick={() => closeModalAndNavigate('/signup')}
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
