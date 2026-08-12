import mongoose from "mongoose";

const savedVideoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent saving the same video twice
savedVideoSchema.index(
  { user: 1, video: 1 },
  { unique: true }
);

const SavedVideo = mongoose.model(
  "SavedVideo",
  savedVideoSchema
);

export default SavedVideo;