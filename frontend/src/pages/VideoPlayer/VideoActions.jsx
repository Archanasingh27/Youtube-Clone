// Displays the action buttons for a video
const VideoActions = ({
  videoId,
  likes,
  dislikes,
  saved,
  onReaction,
  onShare,
  onSave,
}) => {
  return (
    <div className="video-actions">
      {/* Like video */}
      <button type="button" onClick={() => onReaction("like")}>
        👍 {likes}
      </button>

      {/* Dislike video */}
      <button type="button" onClick={() => onReaction("dislike")}>
        👎 {dislikes}
      </button>

      {/* Share video */}
      <button type="button" onClick={onShare}>
        Share
      </button>

      {/* Save or unsave video */}
      <button type="button" onClick={onSave}>
        {saved ? "Unsave" : "Save"}
      </button>
    </div>
  );
};

export default VideoActions;
