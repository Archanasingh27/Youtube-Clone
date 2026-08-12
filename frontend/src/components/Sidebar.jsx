import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>⌂</span>
            <span>Home</span>
          </NavLink>

          <NavLink
            to="/trending"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>🔥</span>
            <span>Trending</span>
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>▶</span>
            <span>Subscriptions</span>
          </NavLink>

          <NavLink
            to="/library"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>▣</span>
            <span>Library</span>
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>◷</span>
            <span>History</span>
          </NavLink>

          <div className="sidebar-divider" />

          <NavLink
            to="/channel"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>◉</span>
            <span>My Channel</span>
          </NavLink>

          <NavLink
            to="/create-video"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>＋</span>
            <span>Upload Video</span>
          </NavLink>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
