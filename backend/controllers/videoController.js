import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

// Create a new video
export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !videoUrl ||
      !thumbnailUrl ||
      !category
    ) {
      return res.status(400).json({
        message:
          "Title, description, video URL, thumbnail URL and category are required",
      });
    }

    // Find the logged-in user's channel
    const channel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (!channel) {
      return res.status(400).json({
        message: "Please create a channel before uploading a video",
      });
    }

    // Create video
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channel._id,
      uploader: req.user.userId,
    });

    res.status(201).json({
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    console.error("Create video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// Get all videos
export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      videos,
    });
  } catch (error) {
    console.error("Get videos error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get a single video
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id)
      .populate("uploader", "username")
     

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    res.status(200).json({
      video,
    });
  } catch (error) {
    console.error("Get video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Update a video
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Only the uploader can update the video
    if (video.uploader.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this video",
      });
    }

    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
    } = req.body;

    // Update only provided fields
    if (title !== undefined) video.title = title;
    if (description !== undefined) video.description = description;
    if (videoUrl !== undefined) video.videoUrl = videoUrl;
    if (thumbnailUrl !== undefined) {
      video.thumbnailUrl = thumbnailUrl;
    }
    if (category !== undefined) video.category = category;

    await video.save();

    res.status(200).json({
      message: "Video updated successfully",
      video,
    });
  } catch (error) {
    console.error("Update video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    // Only the uploader can delete the video
    if (video.uploader.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You are not allowed to delete this video",
      });
    }

    await Video.findByIdAndDelete(id);

    res.status(200).json({
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Delete video error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

