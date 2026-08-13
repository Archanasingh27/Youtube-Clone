import { Link } from "react-router-dom";
import "./VideoCard.css";

// Displays a single video card on the home page
const VideoCard = ({ video }) => {
  return (
    // Navigate to the video player when the card is clicked
    <Link to={`/watch/${video._id}`} className="video-card">
      {/* Video thumbnail */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="video-thumbnail"
      />

      <div className="video-info">
        {/* Video title */}
        <h3 className="video-title">{video.title}</h3>

        {/* Channel/uploader name */}
        <p className="video-channel">
          {video.uploader?.username || "Unknown Channel"}
        </p>

        {/* Number of video views */}
        <p className="video-meta">{video.views} views</p>
      </div>
    </Link>
  );
};

export default VideoCard;
