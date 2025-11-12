import express from "express";
import {
  getBook,
  createBook,
  deleteBook,
  getBookById,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/:id", getBookById);
router.post("/create", createBook);
router.delete("/delete/:id", deleteBook);

export default router;
