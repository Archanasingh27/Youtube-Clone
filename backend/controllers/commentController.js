import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

// Add comment
export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    const comment = await Comment.create({
      text: text.trim(),
      user: req.user.userId,
      video: videoId,
    });

    const populatedComment = await comment.populate(
      "user",
      "username"
    );

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
  } catch (error) {
    console.error("Add comment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get comments for a video
export const getComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({
      video: videoId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    console.error("Get comments error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update own comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can edit
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only edit your own comment",
      });
    }

    comment.text = text.trim();

    await comment.save();

    const updatedComment = await comment.populate(
      "user",
      "username"
    );

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Update comment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete own comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // Only comment owner can delete
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: "You can only delete your own comment",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Delete comment error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};