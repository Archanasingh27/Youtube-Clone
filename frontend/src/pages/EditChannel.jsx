import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./EditChannel.css";

const EditChannel = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    avatarUrl: "",
    bannerUrl: "",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // Fetch the current user's channel when the page loads.
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await API.get("/channels/my");

        const channel = response.data.channel;

        // Fill the form with existing channel data.
        setFormData({
          name: channel.name || "",
          description: channel.description || "",
          avatarUrl: channel.avatarUrl || "",
          bannerUrl: channel.bannerUrl || "",
        });
      } catch (error) {
        console.error("Get channel error:", error);

        // Show the backend error message if available.
        setError(error.response?.data?.message || "Failed to load channel");
      } finally {
      
        setLoading(false);
      }
    };

    fetchChannel();
  }, []);

  // Update the corresponding form field whenever

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit updated channel information.
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      // Send updated channel data to the backend.
      await API.put("/channels/my", formData);

      alert("Channel updated successfully");

      // Navigate back to the channel page.
      navigate("/channel");
    } catch (error) {
      console.error("Update channel error:", error);

      setError(error.response?.data?.message || "Failed to update channel");
    } finally {
     
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading channel...</p>;
  }

  // display the error message.
  if (error && !formData.name) {
    return <p>{error}</p>;
  }

  return (
    <main className="edit-channel-page">
      <div className="edit-channel-card">
        <h1>Edit Channel</h1>

        {/* Display an error message if something goes wrong. */}
        {error && <p className="edit-channel-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Channel name */}
          <div className="form-group">
            <label htmlFor="name">Channel Name</label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Channel description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Channel avatar URL */}
          <div className="form-group">
            <label htmlFor="avatarUrl">Avatar Image URL</label>

            <input
              id="avatarUrl"
              type="text"
              name="avatarUrl"
              placeholder="https://example.com/avatar.jpg"
              value={formData.avatarUrl}
              onChange={handleChange}
            />
          </div>

          {/* Channel banner URL */}
          <div className="form-group">
            <label htmlFor="bannerUrl">Banner Image URL</label>

            <input
              id="bannerUrl"
              type="text"
              name="bannerUrl"
              placeholder="https://example.com/banner.jpg"
              value={formData.bannerUrl}
              onChange={handleChange}
            />
          </div>

          {/* Form action buttons */}
          <div className="edit-channel-actions">
          
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/channel")}
            >
              Cancel
            </button>

            {/* Submit updated channel information. */}
            <button
              type="submit"
              className="save-channel-btn"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditChannel;
