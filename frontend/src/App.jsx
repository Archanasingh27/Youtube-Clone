import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./pages/VideoPlayer";
import Channel from "./pages/Channel";
import EditVideo from "./pages/EditVideo";
import CreateVideo from "./pages/CreateVideo";
import EditChannel from "./pages/EditChannel";

import API from "./services/api";
import { useAuth } from "./context/AuthContext";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  // Desktop → sidebar open
  // Mobile → sidebar closed
  const [sidebarOpen, setSidebarOpen] = useState(
    window.innerWidth >= 600
  );

  const [hasChannel, setHasChannel] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If user is not logged in,
    // there is no need to check for a channel.
    if (!isAuthenticated) {
      setHasChannel(false);
      return;
    }

    const checkChannel = async () => {
      try {
        await API.get("/channels/my");

        // Channel exists
        setHasChannel(true);
      } catch (error) {
        if (error.response?.status === 404) {
          // User does not have a channel
          setHasChannel(false);
        } else {
          console.error("Channel check error:", error);
        }
      }
    };

    checkChannel();
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <div className="app">

        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="app-body">

          <Sidebar
            isOpen={sidebarOpen}
            hasChannel={hasChannel}
          />

          <main
            className={`main-content ${
              sidebarOpen ? "sidebar-open" : ""
            }`}
          >
            <Routes>

              <Route
                path="/"
                element={<Home searchTerm={searchTerm} />}
              />

              <Route
                path="/register"
                element={<Register />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/watch/:id"
                element={<VideoPlayer />}
              />

              <Route
                path="/channel"
                element={<Channel />}
              />

              <Route
                path="/edit-channel"
                element={<EditChannel />}
              />

              <Route
                path="/edit-video/:id"
                element={<EditVideo />}
              />

              <Route
                path="/create-video"
                element={<CreateVideo />}
              />

            </Routes>
          </main>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;