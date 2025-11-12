import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-slate-900 dark:text-white">
      <div className="max-w-md w-full p-8 bg-white dark:bg-slate-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to our book store app! We are dedicated to providing a wide
          selection of books for all ages and interests. Our mission is to
          foster a love for reading and make books accessible to everyone.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Founded in 2023, we started as a small online store and have grown
          thanks to our loyal customers. We believe in the power of stories to
          inspire, educate, and entertain.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Feel free to explore our collection and discover your next favorite
          book. Happy reading!
        </p>
        <Link to="/">
          <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
