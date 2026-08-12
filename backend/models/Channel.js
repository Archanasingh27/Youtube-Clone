import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Channel name is required"],
      trim: true,
      minlength: [3, "Channel name must be at least 3 characters"],
      maxlength: [50, "Channel name cannot exceed 50 characters"],
    },

    description: {
      type: String,
      required: [true, "Channel description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    avatarUrl: {
      type: String,
      default: "",
      trim: true,
    },

    bannerUrl: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    subscribers: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;