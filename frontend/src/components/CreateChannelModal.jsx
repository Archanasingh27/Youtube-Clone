import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const CreateChannelModal = ({ onClose, onCreated }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.username || "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
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

    setError("");

    if (!formData.name.trim() || !formData.description.trim()) {
      setError("Channel name and description are required");
      return;
    }

    setLoading(true);

    try {
      await API.post("/channels", formData);

      onCreated();
    } catch (error) {
      console.error("Create channel error:", error);

      setError(error.response?.data?.message || "Failed to create channel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="create-channel-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>How you'll appear</h2>

          <button type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="channel-avatar-preview">
          {formData.avatarUrl ? (
            <img src={formData.avatarUrl} alt="Channel avatar" />
          ) : (
            <div className="default-avatar">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Channel name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Channel description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="avatarUrl"
            placeholder="Avatar URL (optional)"
            value={formData.avatarUrl}
            onChange={handleChange}
          />

          <input
            type="text"
            name="bannerUrl"
            placeholder="Banner URL (optional)"
            value={formData.bannerUrl}
            onChange={handleChange}
          />

          {error && <p className="modal-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

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
