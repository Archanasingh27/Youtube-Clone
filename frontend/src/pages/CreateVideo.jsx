import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./CreateVideo.css";

const CreateVideo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await API.post("/videos", formData);

      alert("Video uploaded successfully");

      navigate("/channel");
    } catch (error) {
      console.error("Create video error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to upload video"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-video-page">
      <h1>Upload Video</h1>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} className="create-video-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter video title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            placeholder="Tell viewers about your video"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="videoUrl">Video URL</label>

          <input
            id="videoUrl"
            type="text"
            name="videoUrl"
            placeholder="Enter video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            required
          />

          <p className="form-hint">Enter the URL of your video file.</p>
        </div>

        <div className="form-group">
          <label htmlFor="thumbnailUrl">Thumbnail URL</label>

          <input
            id="thumbnailUrl"
            type="text"
            name="thumbnailUrl"
            placeholder="Enter thumbnail URL"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Music">Music</option>
            <option value="Gaming">Gaming</option>
            <option value="Programming">Programming</option>
            <option value="News">News</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/channel")}
          >
            Cancel
          </button>

          <button type="submit" className="upload-btn" disabled={loading}>
            {loading ? "Uploading..." : "Upload Video"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateVideo;