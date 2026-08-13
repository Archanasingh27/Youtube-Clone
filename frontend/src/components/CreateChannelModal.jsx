import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreateChannelModal = ({ onClose, onCreated }) => {
  // Get the currently logged-in user
  const { user } = useAuth();

  // Used for navigating to different pages
  const navigate = useNavigate();

  // Store channel form data
  // Username is used as the default channel name
  const [formData, setFormData] = useState({
    name: user?.username || "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
  });

  // Track form submission status
  const [loading, setLoading] = useState(false);

  // Store validation or API error messages
  const [error, setError] = useState("");

  // Update form data when the user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle channel creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Channel name and description are required");
      return;
    }

    setLoading(true);

    try {
      // Send channel data to the backend
      await API.post("/channels", formData);

      // Notify the parent component that the channel was created
      onCreated();
    } catch (error) {
      console.error("Create channel error:", error);

      // Display the backend error message if available
      setError(
        error.response?.data?.message || "Failed to create channel"
      );
    } finally {
      // Stop loading after the request finishes
      setLoading(false);
    }
  };

  return (
    // Close the modal when clicking on the overlay
    <div className="modal-overlay" onClick={onClose}>
      {/* Prevent clicks inside the modal from closing it */}
      <div
        className="create-channel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>How you'll appear</h2>

          {/* Close modal button */}
          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Channel avatar preview */}
        <div className="channel-avatar-preview">
          {formData.avatarUrl ? (
            <img
              src={formData.avatarUrl}
              alt="Channel avatar"
            />
          ) : (
            // Show the first letter of the username
            // when no avatar URL is provided
            <div className="default-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Channel name */}
          <input
            type="text"
            name="name"
            placeholder="Channel name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* Channel description */}
          <textarea
            name="description"
            placeholder="Channel description"
            value={formData.description}
            onChange={handleChange}
          />

          {/* Optional channel avatar URL */}
          <input
            type="text"
            name="avatarUrl"
            placeholder="Avatar URL (optional)"
            value={formData.avatarUrl}
            onChange={handleChange}
          />

          {/* Optional channel banner URL */}
          <input
            type="text"
            name="bannerUrl"
            placeholder="Banner URL (optional)"
            value={formData.bannerUrl}
            onChange={handleChange}
          />

          {/* Display validation or API errors */}
          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            {/* Cancel channel creation */}
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            {/* Submit channel creation form */}
            <button
              type="submit"
              className="create-channel-btn"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;