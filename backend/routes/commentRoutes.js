import express from "express";

import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all comments for a video
router.get("/video/:videoId", getComments);

// Add a comment
router.post("/video/:videoId", authMiddleware, addComment);

// Update your own comment
router.put("/:commentId", authMiddleware, updateComment);

// Delete your own comment
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;