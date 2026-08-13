import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Channel.css";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("Home");

  // Store the selected video sorting option
  const [sortBy, setSortBy] = useState("Latest");

  const navigate = useNavigate();

  // Fetch the logged-in user's channel and videos
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        // Get the current user's channel
        const response = await API.get("/channels/my");

        setChannel(response.data.channel);
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error("Get channel error:", error);

        setError(error.response?.data?.message || "Unable to load channel");
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  // Delete a video from the user's channel
  const handleDeleteVideo = async (videoId) => {
   
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?",
    );

    if (!confirmed) return;

    try {
      // Delete the video from the backend
      await API.delete(`/videos/${videoId}`);

      // Remove the deleted video from the local state
      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId),
      );
    } catch (error) {
      console.error("Delete video error:", error);

      alert(error.response?.data?.message || "Failed to delete video");
    }
  };

  // Sort videos according to the selected sorting option
  const getSortedVideos = () => {
    // Create a copy so the original videos array is not modified
    const sortedVideos = [...videos];

    // Latest videos are already returned in the default order
    if (sortBy === "Latest") {
      return sortedVideos;
    }

    // Reverse the order to show oldest videos first
    if (sortBy === "Oldest") {
      return sortedVideos.reverse();
    }

    // Sort videos by view count for the Popular option
    if (sortBy === "Popular") {
      return sortedVideos.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return sortedVideos;
  };


  if (loading) {
    return <p className="channel-message">Loading channel...</p>;
  }

  if (error) {
    return <p className="channel-message">{error}</p>;
  }

  // Handle the case where no channel exists
  if (!channel) {
    return <p className="channel-message">Channel not found</p>;
  }

  // Get the videos after applying the selected sorting option
  const sortedVideos = getSortedVideos();

  return (
    <main className="channel-page">
      {/* ================= BANNER ================= */}

      <div className="channel-banner">
        {/* Display channel banner if available */}
        {channel.bannerUrl ? (
          <img src={channel.bannerUrl} alt={`${channel.name} banner`} />
        ) : (
          // Display default banner when no banner URL exists
          <div className="default-banner" />
        )}
      </div>

      {/* ================= CHANNEL INFO ================= */}

      <section className="channel-header">
        {/* Channel avatar */}
        <div className="channel-avatar-wrapper">
          {channel.avatarUrl ? (
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="channel-avatar"
            />
          ) : (
            // Display the first letter of the channel name
            <div className="channel-avatar default-avatar">
              {channel.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Channel details */}
        <div className="channel-details">
          {/* Channel name */}
          <h1>{channel.name}</h1>

          {/* Channel handle, subscribers and video count */}
          <p className="channel-handle">
            @{channel.owner?.username || "user"}
            <span> · </span>
            {channel.subscribersCount || 0} subscribers
            <span> · </span>
            {videos.length} videos
          </p>

          {/* Channel description */}
          {channel.description && (
            <p className="channel-description">{channel.description}</p>
          )}

          {/* Channel management actions */}
          <div className="channel-actions">
            {/* Navigate to edit channel page */}
            <button
              type="button"
              className="edit-channel-btn"
              onClick={() => navigate("/edit-channel")}
            >
              Edit Channel
            </button>

            {/* Navigate to video upload page */}
            <button
              type="button"
              className="upload-channel-btn"
              onClick={() => navigate("/create-video")}
            >
              Upload Video
            </button>
          </div>
        </div>
      </section>

      {/* ================= TABS ================= */}

      <div className="channel-tabs">
        {/* Render all available channel tabs */}
        {["Home", "Videos", "Shorts", "Live", "Playlists", "Community"].map(
          (tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab ? "channel-tab active" : "channel-tab"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ),
        )}
      </div>

      {/* ================= VIDEO SECTION ================= */}

      {/* Show videos on Home and Videos tabs */}
      {(activeTab === "Home" || activeTab === "Videos") && (
        <section className="channel-content">
          {/* Video section heading and sorting controls */}
          <div className="video-section-header">
            <h2>Videos</h2>

            <div className="video-sort">
              {/* Video sorting options */}
              {["Latest", "Popular", "Oldest"].map((sort) => (
                <button
                  key={sort}
                  type="button"
                  className={sortBy === sort ? "sort-btn active" : "sort-btn"}
                  onClick={() => setSortBy(sort)}
                >
                  {sort}
                </button>
              ))}
            </div>
          </div>

          {/* Empty video state */}
          {sortedVideos.length === 0 ? (
            <div className="empty-videos">
              <h3>No videos yet</h3>

              <p>Upload your first video to see it here.</p>

              {/* Navigate to video upload page */}
              <button type="button" onClick={() => navigate("/create-video")}>
                Upload Video
              </button>
            </div>
          ) : (
            /* Display uploaded videos */
            <div className="channel-video-grid">
              {sortedVideos.map((video) => (
                <article className="channel-video-card" key={video._id}>
                  {/* Video thumbnail */}
                  <div
                    className="channel-thumbnail-wrapper"
                    onClick={() => navigate(`/watch/${video._id}`)}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="channel-video-thumbnail"
                    />
                  </div>

                  {/* Video information */}
                  <div className="channel-video-info">
                    {/* Video title */}
                    <h3>{video.title}</h3>

                    {/* Video views */}
                    <p className="video-meta">{video.views || 0} views</p>

                    {/* Video category */}
                    <p className="video-category">{video.category}</p>
                  </div>

                  {/* Video management actions */}
                  <div className="channel-video-actions">
                    {/* Edit video */}
                    <button
                      type="button"
                      onClick={() => navigate(`/edit-video/${video._id}`)}
                    >
                      Edit
                    </button>

                    {/* Delete video */}
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDeleteVideo(video._id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ================= OTHER TABS ================= */}

      {/* Placeholder for tabs that are not implemented yet */}
      {activeTab !== "Home" && activeTab !== "Videos" && (
        <div className="channel-tab-placeholder">
          <h2>{activeTab}</h2>

          <p>{activeTab} content will be added later.</p>
        </div>
      )}
    </main>
  );
};

export default Channel;
