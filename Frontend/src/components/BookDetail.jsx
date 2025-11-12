import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [authUser] = useAuth();

  const fetchBookDetails = async () => {
    try {
      // Fetch book details
      const bookRes = await axios.get(`http://localhost:4001/book/${id}`);
      setBook(bookRes.data);

      // Fetch reviews for the book
      const reviewRes = await axios.get(`http://localhost:4001/review/${id}`);
      setReviews(reviewRes.data);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please login to add a review.");
      return;
    }
    if (rating === 0) {
      toast.error("Please provide a star rating.");
      return;
    }

    try {
      const reviewData = {
        bookId: id,
        userId: authUser._id, // Assuming authUser contains _id
        rating,
        comment,
      };
      await axios.post("http://localhost:4001/review/add", reviewData);
      toast.success("Review added successfully!");
      setRating(0);
      setComment("");
      fetchBookDetails(); // Refresh reviews
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!authUser) {
      toast.error("Please login to delete a review.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4001/review/delete/${reviewId}`);
      toast.success("Review deleted successfully!");
      fetchBookDetails(); // Refresh reviews
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-slate-900 dark:text-white">
        Loading book details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-slate-900 dark:text-white">
        Error: {error.message}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen dark:bg-slate-900 dark:text-white">
        Book not found.
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen container mx-auto px-4 py-8 pt-20 dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-4">{book.name}</h1>
        <img
          src={book.image}
          alt={book.name}
          className="w-48 h-64 object-cover mb-4 rounded-md"
        />
        <p className="text-lg mb-2">
          <strong>Category:</strong> {book.category}
        </p>
        <p className="text-lg mb-2">
          <strong>Price:</strong> {book.price === 0 ? "Free" : `$${book.price}`}
        </p>
        <p className="text-lg mb-4">
          <strong>Title:</strong> {book.title}
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border p-4 rounded-md shadow-sm dark:border-gray-700"
              >
                <p>
                  <strong>Rating:</strong> {review.rating} / 5
                </p>
                <p>
                  <strong>Comment:</strong>{" "}
                  {review.comment || "No comment provided."}
                </p>
                <p className="text-sm text-gray-500">
                  By {review.userId ? review.userId.fullname : "Anonymous"} on{" "}
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
                {authUser && authUser._id === review.userId._id && (
                  <button
                    className="btn btn-sm btn-error text-white mt-2"
                    onClick={() => handleDeleteReview(review._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to review this book!</p>
        )}

        <h2 className="text-2xl font-semibold mt-8 mb-4">Add Your Review</h2>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Rating:</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl ${
                    star <= rating ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-lg font-medium mb-2">
              Comment (optional):
            </label>
            <textarea
              id="comment"
              className="textarea textarea-bordered w-full p-2 dark:bg-slate-800 dark:text-white"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn bg-pink-500 text-white hover:bg-pink-700"
          >
            Submit Review
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;
