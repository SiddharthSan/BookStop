// routes/cart_route.js
import express from 'express';
import { addToCart, getCart, updateCartItem, removeFromCart } from '../controller/cart_Controller.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/:userId', getCart);        
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeFromCart);

export default router;