import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import CreateChannelModal from "./CreateChannelModal";
import "./Header.css";

const Header = ({ searchTerm, setSearchTerm, setSidebarOpen }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Mobile search
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }

    // Close mobile search after searching
    setShowMobileSearch(false);
  };

  const handleCreateClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await API.get("/channels/my");

      // Channel already exists
      navigate("/create-video");
    } catch (error) {
      if (error.response?.status === 404) {
        // No channel → create channel
        setShowCreateModal(true);
      } else {
        console.error("Channel check error:", error);
      }
    }
  };

  // Get first letter of username
  const firstLetter = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <>
      <header className="header">
        {/* ================= LEFT ================= */}
        <div className="header-left">
          <button
            type="button"
            className="menu-btn"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>

          <h2>YouTube</h2>
        </div>

        {/* ================= DESKTOP SEARCH ================= */}

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {/* ================= MOBILE SEARCH ================= */}

        <button
          type="button"
          className="mobile-search-btn"
          onClick={() => setShowMobileSearch(true)}
        >
          🔍
        </button>

        {/* ================= RIGHT ================= */}

        <div className="header-right">
          {isAuthenticated ? (
            <>
              {/* Create */}
              <button
                type="button"
                className="create-btn"
                onClick={handleCreateClick}
              >
                + Create
              </button>

              {/* Profile */}
              <div className="profile-container">
                <button
                  type="button"
                  className="profile-avatar"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  {firstLetter}
                </button>

                {/* Profile dropdown */}
                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-info">
                      <div className="profile-avatar large">{firstLetter}</div>

                      <div className="profile-user-info">
                        <strong>{user?.username}</strong>

                        <span>{user?.email}</span>
                      </div>
                    </div>

                    <div className="profile-divider" />

                    <button
                      type="button"
                      className="profile-menu-item"
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                        navigate("/");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              type="button"
              className="signin-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* ================= MOBILE SEARCH OVERLAY ================= */}

      {showMobileSearch && (
        <div className="mobile-search-container">
          <button
            type="button"
            className="mobile-search-back"
            onClick={() => setShowMobileSearch(false)}
          >
            ←
          </button>

          <form onSubmit={handleSearch} className="mobile-search-form">
            <input
              type="text"
              placeholder="Search"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button type="submit">🔍</button>
          </form>
        </div>
      )}

      {/* ================= CREATE CHANNEL MODAL ================= */}

      {showCreateModal && (
        <CreateChannelModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            setShowCreateModal(false);
            navigate("/channel");
          }}
        />
      )}
    </>
  );
};

export default Header;
