import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import VideoInfo from "./VideoPlayer/VideoInfo";
import VideoActions from "./VideoPlayer/VideoActions";
import Comments from "./VideoPlayer/Comments";
import SuggestedVideos from "./VideoPlayer/SuggestedVideos";

import "./VideoPlayer.css";

const VideoPlayer = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [saved, setSaved] = useState(false);

  const [viewCounted, setViewCounted] = useState(false);

  // =========================
  // COUNT VIDEO VIEW
  // =========================

  const handleVideoPlay = async () => {
    if (viewCounted) {
      return;
    }

    try {
      const response = await API.post(`/videos/${id}/view`);

      setViewCounted(true);

      setVideo((prev) => ({
        ...prev,
        views: response.data.views,
      }));
    } catch (error) {
      console.error("View count error:", error);
    }
  };

  // =========================
  // FETCH VIDEO
  // =========================

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${id}`);

        const fetchedVideo = response.data.video;

        setVideo(fetchedVideo);

        setLikes(fetchedVideo.likes);
        setDislikes(fetchedVideo.dislikes);
      } catch (error) {
        console.error("Error fetching video:", error);

        setError("Unable to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // =========================
  // LIKE / DISLIKE
  // =========================

  const handleReaction = async (type) => {
    try {
      const response = await API.post(`/reactions/${id}`, {
        type,
      });

      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
    } catch (error) {
      console.error("Reaction error:", error);

      if (error.response?.status === 401) {
        alert("Please login to react to a video");
      }
    }
  };

  // =========================
  // SHARE
  // =========================

  const handleShare = async () => {
    try {
      const videoUrl = window.location.href;

      await navigator.clipboard.writeText(videoUrl);

      alert("Video link copied!");
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  // =========================
  // SAVE
  // =========================

  const handleSave = async () => {
    try {
      const response = await API.post(`/saved-videos/${id}`);

      setSaved(response.data.saved);

      alert(response.data.message);
    } catch (error) {
      console.error("Save video error:", error);

      if (error.response?.status === 401) {
        alert("Please login to save a video");
      }
    }
  };

  // =========================
  // LOADING / ERROR
  // =========================

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="video-player-page">
      <div className="watch-layout">
        {/* LEFT SIDE */}

        <div className="watch-main">
          <VideoInfo video={video} onPlay={handleVideoPlay} />

          <VideoActions
            videoId={id}
            likes={likes}
            dislikes={dislikes}
            saved={saved}
            onReaction={handleReaction}
            onShare={handleShare}
            onSave={handleSave}
          />

          <Comments videoId={id} />
        </div>

        {/* RIGHT SIDE */}

        <SuggestedVideos currentVideoId={id} />
      </div>
    </main>
  );
};

export default VideoPlayer;
