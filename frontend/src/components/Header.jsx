import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

const Header = ({ searchTerm, setSearchTerm, setSidebarOpen }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/");
    }
  };

  return (
    <header className="header">
      {/* Left */}
      <div className="header-left">
        <button
          type="button"
          className="menu-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <button type="button" className="logo" onClick={() => navigate("/")}>
          <span className="logo-icon">▶</span>
          <span className="logo-text">YouTube Clone</span>
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit" className="search-btn" aria-label="Search">
          🔍
        </button>
      </form>

      {/* Right */}
      <div className="header-right">
        {isAuthenticated ? (
          <>
            <button
              type="button"
              className="channel-btn"
              onClick={() => navigate("/channel")}
            >
              My Channel
            </button>

            <span className="username">{user?.username}</span>

            <button type="button" className="logout-btn" onClick={logout}>
              Logout
            </button>
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
  );
};

export default Header;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import "./Header.css";

// const Header = ({ searchTerm, setSearchTerm, setSidebarOpen }) => {
//   const { user, isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();

//     if (searchTerm.trim()) {
//       navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <button type="button" onClick={() => setSidebarOpen((prev) => !prev)}>
//           ☰
//         </button>

//         <h2>YouTube Clone</h2>
//       </div>

//       <form onSubmit={handleSearch} className="search-form">
//         <input
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <button type="submit">Search</button>
//       </form>

//       <div className="header-right">
//         {isAuthenticated ? (
//           <>
//             <span>{user.username}</span>

//             <button type="button" onClick={logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <button type="button" onClick={() => navigate("/login")}>
//             Sign In
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;
