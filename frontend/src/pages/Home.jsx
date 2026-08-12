import { useEffect, useState } from "react";
import API from "../services/api";
import VideoCard from "../components/VideoCard";
import CategoryBar from "../components/CategoryBar";

const Home = ({ searchTerm }) => {
     const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await API.get("/videos");

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

 const filteredVideos = videos.filter((video) => {
   const matchesSearch = video.title
     .toLowerCase()
     .includes(searchTerm.toLowerCase());

   const matchesCategory =
     selectedCategory === "All" ||
     video.category.toLowerCase() === selectedCategory.toLowerCase();

   return matchesSearch && matchesCategory;
 });

 if (loading) {
  return (
    <main className="home-page">
      <p className="home-message">Loading videos...</p>
    </main>
  );
}

if (error) {
  return (
    <main className="home-page">
      <p className="home-error">{error}</p>
    </main>
  );
}

 return (
   <main className="home-page">

     <CategoryBar
       selectedCategory={selectedCategory}
       setSelectedCategory={setSelectedCategory}
     />

     {filteredVideos.length === 0 ? (
       <div className="no-videos">
         <h2>No videos found</h2>
         <p>Try a different search or choose another category.</p>
       </div>
     ) : (
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
