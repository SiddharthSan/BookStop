# BookStop

BookStop is an e-commerce platform built with the MERN stack, designed for book enthusiasts to discover, manage, and purchase books online.

## Features

- **User Authentication**: Secure login/registration system
- **Book Management**: 
  - Advanced search with filters
  - Category-based organization
  - Detailed book information
- **Shopping Experience**:
  - Cart management
  - Wishlist functionality
  - Responsive book browsing
- **Daily Quotes**: Integration with Gemini API for inspirational quotes
- **Responsive Design**: Optimized for all devices using Tailwind CSS

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **External APIs**: Gemini API for quotes

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm/yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/bookstop.git

# Install dependencies
cd bookstop
npm install

# Setup environment variables
cp .env.example .env
# Add your MongoDB URI and Gemini API key

# Start development server
npm run dev
```

### Environment Variables

```env
MONGODB_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
```

## Future Enhancements

- Payment gateway integration
- User reviews and ratings
- Admin dashboard for inventory management
- Enhanced search algorithms
- Social sharing features
---
