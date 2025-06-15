import express from "express";
import {
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostsByCategory,
  getPosts,
  getLatestPosts,
} from "../controllers/postController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";
import { checkOwnerMiddleware } from "../middlewares/checkOwnerMiddleware.js";
const router = express.Router();

// Route to create a new post
router.post(
  "/",
  protect,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("image").optional().isURL().withMessage("Image must be a valid URL"),
  ],
  createPost
);
// Route to get posts by category
router.get("/category/:category", getPostsByCategory);
//Route to get latest posts
router.get("/latest", getLatestPosts);
// Route to update an existing post
router.put("/:id", protect, checkOwnerMiddleware, updatePost);
// Route to delete a post
router.delete("/:id", protect, checkOwnerMiddleware, deletePost);
// Route to get a post by ID
router.get("/:id", getPostById);
// Route to get all posts
router.get("/", getPosts);

export default router;
