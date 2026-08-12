import express from "express";
import {
  toggleSavedVideo,
} from "../controllers/savedVideoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", authMiddleware, toggleSavedVideo);

export default router;