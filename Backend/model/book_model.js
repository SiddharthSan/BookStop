// models/Book.js
import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    author: String,
    title: String,
    price: String,
    category: String,
    image: String,
    description: String
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

export default Book;