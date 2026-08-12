import { useState } from "react";
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

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <div className="app">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="app-body">
          <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home searchTerm={searchTerm} />} />

              <Route path="/register" element={<Register />} />

              <Route path="/login" element={<Login />} />

              <Route path="/watch/:id" element={<VideoPlayer />} />

              <Route path="/channel" element={<Channel />} />

              <Route path="/edit-video/:id" element={<EditVideo />} />

              <Route path="/create-video" element={<CreateVideo />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
