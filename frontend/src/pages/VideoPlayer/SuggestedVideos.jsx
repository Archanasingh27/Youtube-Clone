import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";

// Displays videos related to the currently playing video
const SuggestedVideos = ({ currentVideoId }) => {
  // Store the list of suggested videos
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  // Fetch videos whenever the current video changes
  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      try {
        // Get all available videos from the backend
        const response = await API.get("/videos");

        const videos = response.data.videos || [];

        // Remove the currently playing video
        const suggestions = videos.filter(
          (video) => video._id !== currentVideoId,
        );

        setSuggestedVideos(suggestions);
      } catch (error) {
        console.error("Suggested videos error:", error);
      }
    };

    fetchSuggestedVideos();
  }, [currentVideoId]);

  return (
    <aside className="suggested-videos">
      <h2>Suggested videos</h2>

      {/* Display each suggested video */}
      {suggestedVideos.map((video) => (
        <Link
          key={video._id}
          to={`/watch/${video._id}`}
          className="suggested-video"
        >
          {/* Video thumbnail */}
          <img src={video.thumbnailUrl} alt={video.title} />

          <div>
            {/* Video title */}
            <h3>{video.title}</h3>

            {/* Channel/uploader name */}
            <p>{video.uploader?.username || "Unknown Channel"}</p>

            {/* Video view count */}
            <p>{video.views} views</p>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default SuggestedVideos;
