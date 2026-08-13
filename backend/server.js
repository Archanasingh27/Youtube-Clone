import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import videoRoutes from "./routes/videoRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoReactionRoutes from "./routes/videoReactionRoutes.js";
import savedVideoRoutes from "./routes/savedVideoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/videos", videoRoutes);
app.use("/channels", channelRoutes);
app.use("/reactions", videoReactionRoutes);
app.use("/saved-videos", savedVideoRoutes);
app.use("/comments", commentRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
