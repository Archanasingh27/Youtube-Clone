import VideoReaction from "../models/VideoReaction.js";
import Video from "../models/Video.js";

export const reactToVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { type } = req.body;

    // Validate reaction type
    if (!["like", "dislike"].includes(type)) {
      return res.status(400).json({
        message: "Reaction must be either like or dislike",
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Find user's existing reaction
    const existingReaction = await VideoReaction.findOne({
      video: videoId,
      user: req.user.userId,
    });

    // No previous reaction → create one
    if (!existingReaction) {
      await VideoReaction.create({
        video: videoId,
        user: req.user.userId,
        type,
      });
    }

    // Same reaction → remove it
    else if (existingReaction.type === type) {
      await VideoReaction.findByIdAndDelete(existingReaction._id);
    }

    // Different reaction → change it
    else {
      existingReaction.type = type;
      await existingReaction.save();
    }

    // Count reactions
    const likes = await VideoReaction.countDocuments({
      video: videoId,
      type: "like",
    });

    const dislikes = await VideoReaction.countDocuments({
      video: videoId,
      type: "dislike",
    });

    // Keep Video counts updated
    video.likes = likes;
    video.dislikes = dislikes;

    await video.save();

    res.status(200).json({
      message: "Reaction updated successfully",
      likes,
      dislikes,
    });
  } catch (error) {
    console.error("React to video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

