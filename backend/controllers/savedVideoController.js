import SavedVideo from "../models/SavedVideo.js";
import Video from "../models/Video.js";

export const toggleSavedVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const userId = req.user.userId;

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Check if already saved
    const existingSavedVideo = await SavedVideo.findOne({
      user: userId,
      video: videoId,
    });

    // Already saved → remove it
    if (existingSavedVideo) {
      await SavedVideo.findByIdAndDelete(existingSavedVideo._id);

      return res.status(200).json({
        message: "Video removed from saved videos",
        saved: false,
      });
    }

    // Not saved → save it
    await SavedVideo.create({
      user: userId,
      video: videoId,
    });

    res.status(201).json({
      message: "Video saved successfully",
      saved: true,
    });
  } catch (error) {
    console.error("Toggle saved video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};