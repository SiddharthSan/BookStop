// controller/cart_Controller.js
import Cart from '../model/cart_model.js';

export const addToCart = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { userId, bookId, quantity, price, title, image } = req.body;
        
        // Validate required fields
        if (!userId || !bookId || !quantity || price === undefined) {
            return res.status(400).json({ 
                message: 'Missing required fields',
                received: { userId, bookId, quantity, price }
            });
        }

        const existingItem = await Cart.findOne({ userId, bookId });
        
        let savedItem;
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
            savedItem = await existingItem.save();
        } else {
            const newCartItem = new Cart({
                userId,
                bookId,
                quantity: parseInt(quantity),
                price: parseFloat(price),
                title,
                image
            });
            savedItem = await newCartItem.save();
        }
        
        res.status(existingItem ? 200 : 201).json(savedItem);
    } catch (error) {
        console.error('Server error in addToCart:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Fetching cart items for user:', userId);
        
        const cartItems = await Cart.find({ userId }).sort({ createdAt: -1 });
        console.log('Found cart items:', cartItems);
        
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error in getCart:', error);
        res.status(500).json({ message: error.message });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        console.log('Updating cart item:', { itemId, quantity });

        const updatedItem = await Cart.findByIdAndUpdate(
            itemId,
            { quantity: parseInt(quantity) },
            { new: true }
        );
        
        if (!updatedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        
        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error in updateCartItem:', error);
        res.status(500).json({ message: error.message });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const deletedItem = await Cart.findByIdAndDelete(itemId);
        
        if (!deletedItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }
        
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        res.status(500).json({ message: error.message });
    }
};

export default {
    addToCart,
    getCart,
    updateCartItem,
    removeFromCart
};