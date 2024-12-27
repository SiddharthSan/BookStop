// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import bookRoute from './route/book_route.js';
import userRoute from './route/user_route.js';
import cartRoute from './route/cart_route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const URI = process.env.MongoDB_URI;

mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define routes
app.use('/book', bookRoute);
app.use('/user', userRoute);
app.use('/cart', cartRoute); 

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});