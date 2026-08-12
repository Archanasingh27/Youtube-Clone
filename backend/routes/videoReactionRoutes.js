import express from "express";
import {
  reactToVideo,
} from "../controllers/videoReactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", authMiddleware, reactToVideo);

export default router;