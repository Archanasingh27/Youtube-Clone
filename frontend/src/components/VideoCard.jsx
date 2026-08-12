import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video._id}`} className="video-card">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="video-thumbnail"
      />

      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>

        <p className="video-channel">
          {video.uploader?.username || "Unknown Channel"}
        </p>

        <p className="video-meta">{video.views} views</p>
      </div>
    </Link>
  );
};

export default VideoCard;
