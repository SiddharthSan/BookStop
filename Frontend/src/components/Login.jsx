import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const modal = document.getElementById('my_modal_3');

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
    setEmail('');
    setPassword('');
    const modal = document.getElementById('my_modal_3');
    if (modal) {
      modal.close();
    }
  };

  const closeModalAndNavigate = (path) => {
    closeModal();
    window.location.href = path;
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill out all fields before logging in.', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: true,
      });
      return;
    }

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:4001/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          position: 'top-left',
          autoClose: 1000,
          hideProgressBar: false,
          onClose: () => {
            const modal = document.getElementById('my_modal_3');
            if (modal) modal.close(); // Close modal immediately after success
            window.location.reload(); // Reload after modal is closed
          },
        });

        localStorage.setItem('Users', JSON.stringify(data.user));
        console.log('User logged in:', data.user);
      } else {
        const errorData = await response.json();
        toast.error('Invalid credentials. Please try again.', {
          position: 'top-left',
          autoClose: 2000,
          hideProgressBar: false,
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      toast.error('An unexpected error occurred. Please try again later.', {
        position: 'top-left',
        autoClose: 2000,
        hideProgressBar: false,
      });
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <ToastContainer />
      <dialog
        id="my_modal_3"
        className="modal"
      >
        <div
          className="modal-box max-w-sm flex flex-col justify-between"
          style={{ width: '90vw', maxWidth: '500px', height: '450px' }}
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>

          <div className="flex-grow flex flex-col justify-evenly">
            <div className="login-header p-4 border-b-2">
              <h3 className="font-bold text-xl text-center">Login</h3>
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
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
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              className={`bg-pink-500 text-white rounded-md px-3 py-2 hover:bg-pink-700 duration-200 ${
                !email || !password ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleLogin}
              disabled={!email || !password}
            >
              Login
            </button>
            <p className="text-sm">
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
