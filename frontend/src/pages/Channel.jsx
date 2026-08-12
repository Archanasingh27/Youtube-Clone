import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Channel.css";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
  });

  const navigate = useNavigate();

  // =========================
  // GET MY CHANNEL
  // =========================

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await API.get("/channels/my");

        setChannel(response.data.channel);
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error("Get channel error:", error);

        // User doesn't have a channel yet
        if (error.response?.status === 404) {
          setChannel(null);
          setVideos([]);
          setError("");
        } else {
          setError(error.response?.data?.message || "Unable to load channel");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // CREATE CHANNEL
  // =========================

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    setCreating(true);
    setError("");

    try {
      const response = await API.post("/channels", formData);

      setChannel(response.data.channel);
      setVideos([]);

      setFormData({
        name: "",
        description: "",
        avatarUrl: "",
        bannerUrl: "",
      });
    } catch (error) {
      console.error("Create channel error:", error);

      setError(error.response?.data?.message || "Failed to create channel");
    } finally {
      setCreating(false);
    }
  };

  // =========================
  // DELETE VIDEO
  // =========================

  const handleDeleteVideo = async (videoId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this video?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await API.delete(`/videos/${videoId}`);

      setVideos((prevVideos) =>
        prevVideos.filter((video) => video._id !== videoId),
      );
    } catch (error) {
      console.error("Delete video error:", error);

      alert(error.response?.data?.message || "Failed to delete video");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <p>Loading channel...</p>;
  }

  // =========================
  // ERROR
  // =========================

  if (error && !channel) {
    return <p>{error}</p>;
  }

  // =========================
  // NO CHANNEL
  // =========================

  if (!channel) {
    return (
      <main className="create-channel-page">
        <div className="create-channel-card">
          <h1>Create Your Channel</h1>

          <p>Create a channel to upload and manage your videos.</p>

          {error && <p>{error}</p>}

          <form onSubmit={handleCreateChannel}>
            <input
              type="text"
              name="name"
              placeholder="Channel name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Channel description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="avatarUrl"
              placeholder="Profile picture URL"
              value={formData.avatarUrl}
              onChange={handleChange}
            />

            <input
              type="text"
              name="bannerUrl"
              placeholder="Channel banner URL"
              value={formData.bannerUrl}
              onChange={handleChange}
            />

            <div className="create-channel-actions">
              <button type="submit" disabled={creating}>
                {creating ? "Creating..." : "Create Channel"}
              </button>

              <button type="button" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  // =========================
  // CHANNEL EXISTS
  // =========================

  return (
    <main className="channel-page">
      <div className="channel-banner">
        {channel.bannerUrl && (
          <img src={channel.bannerUrl} alt={`${channel.name} banner`} />
        )}
      </div>

      <div className="channel-info">
        {channel.avatarUrl && (
          <img
            src={channel.avatarUrl}
            alt={channel.name}
            className="channel-avatar"
          />
        )}

        <div>
          <h1>{channel.name}</h1>

          <p>{channel.description}</p>

          <p>Owner: {channel.owner?.username || "You"}</p>
        </div>
      </div>

      <section className="channel-videos">
        <div className="channel-videos-header">
          <h2>My Videos ({videos.length})</h2>

          <button
            type="button"
            className="upload-video-btn"
            onClick={() => navigate("/create-video")}
          >
            Upload Video
          </button>
        </div>

        {videos.length === 0 ? (
          <p>No videos uploaded yet.</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <div className="channel-video-card" key={video._id}>
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="video-thumbnail"
                />

                <h3>{video.title}</h3>

                <p>{video.category}</p>

                <p>{video.views} views</p>

                <div className="channel-video-actions">
                  <button
                    type="button"
                    onClick={() => navigate(`/edit-video/${video._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => handleDeleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Channel;
