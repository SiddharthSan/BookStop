import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

// Create context
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authUser] = useAuth();

  // Fetch cart items when user logs in
  useEffect(() => {
    if (authUser) {
      fetchCartItems();
    } else {
      setCart([]);
    }
  }, [authUser]);

  // Fetch cart items
  const fetchCartItems = async () => {
    if (!authUser) return;
    
    setLoading(true);
    try {
      const { data } = await axios.get(`/cart/${authUser._id}`);
      console.log('Fetched cart items:', data);
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart items:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (item) => {
    if (!authUser) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!item || !item._id) {
      toast.error('Invalid item data');
      return;
    }

    setLoading(true);
    try {
      // Ensure proper price format
      let price = 0;
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^0-9.-]+/g, '')); // Remove any non-numeric characters except decimal point
      } else if (typeof item.price === 'number') {
        price = item.price;
      }

      if (isNaN(price)) {
        throw new Error('Invalid price format');
      }

      // Ensure proper quantity
      const quantity = parseInt(item.quantity) || 1;

      const cartData = {
        userId: authUser._id,
        bookId: item._id,
        quantity: quantity,
        price: price,
        title: item.title || 'Untitled',
        image: item.image || ''
      };

      console.log('Sending cart data:', cartData);

      const { data } = await axios.post('/cart/add', cartData);
      console.log('Server response:', data);
      
      setCart(prev => {
        const existingItemIndex = prev.findIndex(i => i.bookId === item._id);
        if (existingItemIndex >= 0) {
          const newCart = [...prev];
          newCart[existingItemIndex] = data;
          return newCart;
        }
        return [...prev, data];
      });
      
      toast.success('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add item to cart';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update cart item
  const updateCartItem = async (itemId, quantity) => {
    if (!itemId || quantity === undefined) {
      toast.error('Invalid update parameters');
      return;
    }

    setLoading(true);
    try {
      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity < 0) {
        throw new Error('Invalid quantity');
      }

      console.log('Updating cart item:', { itemId, quantity: parsedQuantity });
      
      const { data } = await axios.put(`/cart/update/${itemId}`, { 
        quantity: parsedQuantity 
      });
      
      setCart(prev => prev.map(item => 
        item._id === itemId ? data : item
      ));
      
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error(error.response?.data?.message || 'Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!itemId) {
      toast.error('Invalid item ID');
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`/cart/remove/${itemId}`);
      
      setCart(prev => prev.filter(item => item._id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error(error.response?.data?.message || 'Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => {
    const quantity = parseInt(item.quantity) || 0;
    return sum + quantity;
  }, 0);

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + (price * quantity);
  }, 0);

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading,
      totalItems,
      totalPrice,
      addToCart, 
      updateCartItem, 
      removeFromCart,
      clearCart,
      fetchCartItems // Expose this if you need to manually refresh the cart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

// Export the context for advanced use cases
export { CartContext };