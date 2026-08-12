import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// Create a channel
export const createChannel = async (req, res) => {
  try {
    const { name, description, avatarUrl, bannerUrl } = req.body;

    // Check required fields
    if (!name || !description) {
      return res.status(400).json({
        message: "Channel name and description are required",
      });
    }

    // Check if user already has a channel
    const existingChannel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (existingChannel) {
      return res.status(400).json({
        message: "You already have a channel",
      });
    }

    // Create channel
    const channel = await Channel.create({
      name,
      description,
      avatarUrl: avatarUrl || "",
      bannerUrl: bannerUrl || "",
      owner: req.user.userId,
    });

    res.status(201).json({
      message: "Channel created successfully",
      channel,
    });
  } catch (error) {
    console.error("Create channel error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get my channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({
      owner: req.user.userId,
    }).populate("owner", "username");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: channel._id,
    })
      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      channel,
      videos,
      videoCount: videos.length,
    });
  } catch (error) {
    console.error("Get my channel error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Update my channel
export const updateChannel = async (req, res) => {
  try {
    const { name, description, avatarUrl, bannerUrl } = req.body;

    const channel = await Channel.findOne({
      owner: req.user.userId,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    // Update only provided fields
    if (name !== undefined) {
      channel.name = name;
    }

    if (description !== undefined) {
      channel.description = description;
    }

    if (avatarUrl !== undefined) {
      channel.avatarUrl = avatarUrl;
    }

    if (bannerUrl !== undefined) {
      channel.bannerUrl = bannerUrl;
    }

    await channel.save();

    res.status(200).json({
      message: "Channel updated successfully",
      channel,
    });
  } catch (error) {
    console.error("Update channel error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Get channel by ID with its videos
export const getChannelById = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findById(id)
      .populate("owner", "username");

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found",
      });
    }

    const videos = await Video.find({
      channel: channel._id,
    })
      .populate("uploader", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      channel,
      videoCount: videos.length,
      videos,
    });
  } catch (error) {
    console.error("Get channel error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};