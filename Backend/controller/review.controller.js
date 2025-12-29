import Review from "../model/review.model.js";
import Book from "../model/book.model.js";

export const addReview = async (req, res) => {
  try {
    const { bookId, userId, rating, comment } = req.body;

    // Basic validation
    if (!bookId || !userId || !rating) {
      return res
        .status(400)
        .json({ message: "Book ID, User ID, and Rating are required." });
    }
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5." });
    }

    const newReview = new Review({
      bookId,
      userId,
      rating,
      comment,
    });
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate(
      "userId",
      "fullname email"
    ); // Populate user details
    res.status(200).json(reviews);
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params; // Review ID
    // Optionally, you might want to add a check here to ensure the user deleting the review is the author or an admin
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
