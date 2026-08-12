import express from "express";
import {
  createChannel,
  getMyChannel,
   updateChannel,
   getChannelById
} from "../controllers/channelController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create channel - protected
router.post("/", authMiddleware, createChannel);

// Get my channel - protected
router.get("/my", authMiddleware, getMyChannel);

router.put("/my", authMiddleware, updateChannel);

router.get("/:id", getChannelById);

export default router;