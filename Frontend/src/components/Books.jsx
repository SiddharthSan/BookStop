// Books.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

function Books() {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const getBook = async () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search') || '';
        
        let response;
        try {
          response = await axios.get(`/book?query=${encodeURIComponent(searchQuery)}`);
        } catch {
          response = await axios.get(`http://localhost:4001/book?query=${encodeURIComponent(searchQuery)}`, {
            headers: {
              'Authorization': `Bearer ${JSON.parse(user).token}`
            }
          });
        }
        
        if (response.data) {
          setBook(response.data);
          setError(null);
        } else {
          setError('No data received from server');
        }
      } catch(error) {
        console.error('Error details:', error);
        setError(error.message || 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    
    getBook();
  }, [navigate, location.search]);

  if (loading) {
    return <div className="text-center mt-28">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-28">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4'>
        <div className='mt-28 items-center justify-center text-center'>
          <h1 className='text-2xl font-semibold md:text-4xl'>
            We are delighted to have you <span className='text-pink-500'>here!</span>
          </h1>
          <p className='mt-12'>
            We're excited to have you here! Whether you're searching for classic tales or modern favorites, 
            our collection has something for every reader. Dive into captivating stories, explore new worlds, 
            and find your next favorite book—all at great prices.
          </p>
          <Link to='/'>
            <button className='mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300'>
              Back
            </button>
          </Link>
        </div>
        {book.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-lg">No books found matching your search.</p>
            <Link to="/book">
              <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                View All Books
              </button>
            </Link>
          </div>
        ) : (
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-5'>
            {book.map((item) => (
              <Cards key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Books;