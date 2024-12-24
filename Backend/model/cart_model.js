// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true
    },
    title: String,
    image: String
}, {
    timestamps: true
});

const Cart = mongoose.model("CartItem", cartItemSchema);

export default Cart;