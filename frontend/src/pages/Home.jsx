import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import CategoryBar from "../components/CategoryBar";


const Home = ({ searchTerm }) => {

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch videos.
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Request all videos from the backend.
        const response = await API.get("/videos");

        // Store the returned videos in state.
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);

        setError("Unable to load videos");
      } finally {
      
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Filter videos based on the search term
  // and the selected category.
  const filteredVideos = videos.filter((video) => {
    // Check whether the video title matches the search term.
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check whether the video belongs to the selected category.
   
    const matchesCategory =
      selectedCategory === "All" ||
      video.category.toLowerCase().includes(selectedCategory.toLowerCase());

    // Video must match both conditions.
    return matchesSearch && matchesCategory;
  });

  // Display loading message while videos are being fetched.
  if (loading) {
    return (
      <main className="home-page">
        <p className="home-message">Loading videos...</p>
      </main>
    );
  }

  // Display error message if fetching videos fails.
  if (error) {
    return (
      <main className="home-page">
        <p className="home-error">{error}</p>
      </main>
    );
  }

  return (
    <main className="home-page">
      {/* Category filter buttons */}
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Display message when no video matches
          the current search/category filters. */}
      {filteredVideos.length === 0 ? (
        <div className="no-videos">
          <h2>No videos found</h2>

          <p>Try a different search or choose another category.</p>
        </div>
      ) : (
        /* Display filtered videos in a responsive grid. */
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Home;
