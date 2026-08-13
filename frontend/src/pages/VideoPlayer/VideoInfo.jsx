// Displays the video player and basic video information
const VideoInfo = ({ video, onPlay }) => {
  return (
    <>
      {/* Video player */}
      <div className="video-container">
        <video
          controls
          width="100%"
          poster={video.thumbnailUrl}
          // Trigger the view-count handler when the video starts playing
          onPlay={onPlay}
        >
          <source src={video.videoUrl} type="video/mp4" />
          {/* Fallback message for unsupported browsers */}
          Your browser does not support the video player.
        </video>
      </div>

      {/* Video information */}
      <div className="video-details">
        {/* Video title */}
        <h1>{video.title}</h1>

        {/* Number of views */}
        <p>{video.views} views</p>

        {/* Channel/uploader name */}
        <p>Uploaded by {video.uploader?.username || "Unknown User"}</p>

        {/* Video category */}
        <p>Category: {video.category}</p>

        {/* Video description */}
        <div className="video-description">
          <p>{video.description}</p>
        </div>
      </div>
    </>
  );
};

export default VideoInfo;
