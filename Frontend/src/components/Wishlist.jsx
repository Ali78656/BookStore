import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWishlist } from "../context/WishlistProvider";
import { useCart } from "../context/CartProvider";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (book) => {
    addToCart(book);
    toast.success(`${book.name} moved to cart`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-24 pb-12 dark:bg-slate-900 dark:text-white">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Your Wishlist</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Save the books you love and come back when you&apos;re ready to
                read them.
              </p>
            </div>
            <Link
              to="/"
              className="btn bg-pink-500 text-white hover:bg-pink-600 border-none"
            >
              Continue browsing
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-lg">
                Your wishlist is empty. Start exploring books to add them here!
              </p>
              <Link
                to="/course"
                className="btn mt-6 bg-pink-500 text-white hover:bg-pink-600 border-none"
              >
                View courses
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((book) => (
                <div
                  key={book._id}
                  className="card bg-base-100 shadow-xl dark:bg-slate-800 dark:border dark:border-slate-700"
                >
                  <figure className="px-4 pt-4">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="rounded-xl h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      {book.name}
                      <div className="badge badge-secondary">
                        {book.category}
                      </div>
                    </h2>
                    <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
                      {book.title}
                    </p>
                    <div className="card-actions justify-between items-center mt-4">
                      <span className="text-lg font-semibold">
                        {book.price === 0 ? "Free" : `$${book.price}`}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => {
                            handleAddToCart(book);
                            removeFromWishlist(book._id);
                          }}
                        >
                          Move to cart
                        </button>
                        <button
                          className="btn btn-sm btn-ghost text-pink-500"
                          onClick={() => {
                            removeFromWishlist(book._id);
                            toast.success("Removed from wishlist");
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Wishlist;
