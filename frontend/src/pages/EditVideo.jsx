import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import "./EditVideo.css";


const EditVideo = () => {
  // Get the video ID from the URL.
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Fetch the existing video details when the page loads.
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Get the video using its ID.
        const response = await API.get(`/videos/${id}`);

        const video = response.data.video;

        // Fill the form with the existing video data.
        setFormData({
          title: video.title || "",
          description: video.description || "",
          videoUrl: video.videoUrl || "",
          thumbnailUrl: video.thumbnailUrl || "",
          category: video.category || "",
        });
      } catch (error) {
        console.error("Get video error:", error);

        // Display the backend error message if available.
        setError(error.response?.data?.message || "Failed to load video");
      } finally {
        // Stop loading after the request completes.
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Update the corresponding form field

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the updated video information.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      // Send the updated video data to the backend.
      await API.put(`/videos/${id}`, formData);

      alert("Video updated successfully");
      navigate("/channel");
    } catch (error) {
      console.error("Update video error:", error);
      setError(error.response?.data?.message || "Failed to update video");
    } finally {
    
      setSaving(false);
    }
  };

  // Show loading message while fetching video data.
  if (loading) {
    return <p>Loading video...</p>;
  }

  // display the error message.
  if (error && !formData.title) {
    return <p>{error}</p>;
  }

  return (
    <main className="edit-video-page">
      <h1>Edit Video</h1>

      {/* Display an error message if the update fails. */}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit} className="edit-video-form">
        {/* Video title */}
        <div className="edit-form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Video title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Video description */}
        <div className="edit-form-group">
          <label htmlFor="description">Description</label>

          <textarea
            id="description"
            name="description"
            placeholder="Video description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Video URL */}
        <div className="edit-form-group">
          <label htmlFor="videoUrl">Video URL</label>

          <input
            id="videoUrl"
            type="text"
            name="videoUrl"
            placeholder="Video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* Thumbnail URL */}
        <div className="edit-form-group">
          <label htmlFor="thumbnailUrl">Thumbnail URL</label>

          <input
            id="thumbnailUrl"
            type="text"
            name="thumbnailUrl"
            placeholder="Thumbnail URL"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* Video category */}
        <div className="edit-form-group">
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

        {/* Form action buttons */}
        <div className="edit-form-actions">
          {/* Cancel editing and return to channel. */}
          <button
            type="button"
            className="edit-cancel-btn"
            onClick={() => navigate("/channel")}
          >
            Cancel
          </button>

          {/* Submit updated video details. */}
          <button type="submit" className="update-video-btn" disabled={saving}>
            {saving ? "Updating..." : "Update Video"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EditVideo;
