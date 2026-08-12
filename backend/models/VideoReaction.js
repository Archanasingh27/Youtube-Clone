import mongoose from "mongoose";

const videoReactionSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["like", "dislike"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One user can have only one reaction per video
videoReactionSchema.index(
  { video: 1, user: 1 },
  { unique: true }
);

const VideoReaction = mongoose.model(
  "VideoReaction",
  videoReactionSchema
);

export default VideoReaction;