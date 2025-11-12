import express from "express";
import {
  addReview,
  getReviewsByBookId,
  deleteReview,
} from "../controller/review.controller.js";

const router = express.Router();

// Route to add a new review
router.post("/add", addReview);

// Route to get all reviews for a specific book
router.get("/:bookId", getReviewsByBookId);

// Route to delete a review
router.delete("/delete/:id", deleteReview);

export default router;
