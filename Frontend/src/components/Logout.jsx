import React from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate(); // Hook to navigate to other routes.

  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem('Users'); // Clear user data from localStorage.
      
      // Toast for successful logout.
      toast.success("Logout successful", {
        position: "top-left",
        autoClose: 1000,
        hideProgressBar: false,
        onClose: () => {
          navigate('/'); // Redirect to the home page.
          window.location.reload(); // Force refresh.
        }
      });
      
    } catch (error) {
      toast.error("Error: " + error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-pink-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
