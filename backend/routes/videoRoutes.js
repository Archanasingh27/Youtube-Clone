import express from "express";
import {
  createVideo,
  getVideos,
    getVideoById,
    updateVideo,
     deleteVideo,
} from "../controllers/videoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create video - protected
router.post("/", authMiddleware, createVideo);

// Get all videos - public
router.get("/", getVideos);

router.get("/:id", getVideoById);

router.put("/:id", authMiddleware, updateVideo);

router.delete("/:id", authMiddleware, deleteVideo);

export default router;