import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-pink-500">About This Project</h1>
      <p className="mb-4 pt-4">
        This project is a web-based application designed to provide users with an intuitive platform to search for and purchase books online.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Motivation</h2>
      <p className="mb-4">
        The project was developed to enhance my skills in full-stack web development and to create a functional application that addresses the need for a user-friendly online bookstore.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Technologies Used</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Frontend: React, Tailwind CSS</li>
        <li>Backend: Node.js, Express.js</li>
        <li>Database: MongoDB</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <ul className="list-disc list-inside mb-4">
        <li>User authentication and authorization</li>
        <li>Book search functionality with real-time filtering</li>
        <li>Shopping cart for managing book purchases</li>
        <li>Responsive design for optimal viewing on various devices</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Challenges and Learning Outcomes</h2>
      <p className="mb-4">
        One of the main challenges was implementing the search feature. Through this, I gained a deeper understanding of managing databases to use them efficiently.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Future Enhancements</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Integration of a payment gateway for seamless transactions</li>
        <li>Implementation of user reviews and ratings for books</li>
        <li>Addition of an admin panel for inventory management</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
        <p>
          For any inquiries or feedback, please connect with me on LinkedIn at{' '}
          <a
            href="https://www.linkedin.com/in/siddharth-sandeep-a4a85122a"
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Siddharth Sandeep
          </a>
          .
        </p>
    </div>
  );
};

export default About;
