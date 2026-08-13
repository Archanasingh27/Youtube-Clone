import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// Sidebar navigation component
const Sidebar = ({ isOpen, hasChannel }) => {
  return (
    // Add "open" class when the sidebar is open
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <nav className="sidebar-nav">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>⌂</span>
          <span>Home</span>
        </NavLink>

        {/* Trending videos */}
        <NavLink
          to="/trending"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>🔥</span>
          <span>Trending</span>
        </NavLink>

        {/* User subscriptions */}
        <NavLink
          to="/subscriptions"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>▶</span>
          <span>Subscriptions</span>
        </NavLink>

        {/* Saved/library videos */}
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>▣</span>
          <span>Library</span>
        </NavLink>

        {/* Watch history */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span>◷</span>
          <span>History</span>
        </NavLink>

        {/* Divider between general and channel navigation */}
        <div className="sidebar-divider" />

        {/* Show My Channel only when the user has created a channel */}
        {hasChannel && (
          <NavLink
            to="/channel"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span>◉</span>
            <span>My Channel</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
