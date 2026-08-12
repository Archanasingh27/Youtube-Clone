import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Like and dislike counts
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [saved, setSaved] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");
//new add
  const [suggestedVideos, setSuggestedVideos] = useState([]);

  useEffect(() => {
  const fetchSuggestedVideos = async () => {
    try {
      const response = await API.get("/videos");

      const videos = response.data.videos || [];

      // Don't show the currently playing video
      const suggestions = videos.filter(
        (video) => video._id !== id
      );

      setSuggestedVideos(suggestions);
    } catch (error) {
      console.error("Suggested videos error:", error);
    }
  };

  fetchSuggestedVideos();
}, [id]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await API.get(`/videos/${id}`);

        setVideo(response.data.video);

        // Set initial reaction counts
        setLikes(response.data.video.likes);
        setDislikes(response.data.video.dislikes);
      } catch (error) {
        console.error("Error fetching video:", error);

        setError("Unable to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  // Like / Dislike
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

  const handleShare = async () => {
    try {
      const videoUrl = window.location.href;

      await navigator.clipboard.writeText(videoUrl);

      alert("Video link copied!");
    } catch (error) {
      console.error("Share error:", error);
    }
  };

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

  const fetchComments = async () => {
    try {
      const response = await API.get(`/comments/video/${id}`);

      setComments(response.data.comments);
    } catch (error) {
      console.error("Get comments error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const response = await API.post(`/comments/video/${id}`, {
        text: commentText,
      });

      setComments((prevComments) => [response.data.comment, ...prevComments]);

      setCommentText("");
    } catch (error) {
      console.error("Add comment error:", error);

      if (error.response?.status === 401) {
        alert("Please login to comment");
      }
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) {
      return;
    }

    try {
      const response = await API.put(`/comments/${commentId}`, {
        text: editText,
      });

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? response.data.comment : comment,
        ),
      );

      setEditingCommentId(null);
      setEditText("");
    } catch (error) {
      console.error("Update comment error:", error);

      if (error.response?.status === 403) {
        alert("You can only edit your own comment");
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.error("Delete comment error:", error);

      if (error.response?.status === 403) {
        alert("You can only delete your own comment");
      }
    }
  };

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  return (
    <main className="video-player-page">
      <div className="watch-layout">
        {/* LEFT SIDE */}
        <div className="watch-main">
          <div className="video-container">
            <video controls width="100%" poster={video.thumbnailUrl}>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video player.
            </video>
          </div>

          <div className="video-details">
            <h1>{video.title}</h1>

            <p>{video.views} views</p>

            <p>Uploaded by {video.uploader?.username || "Unknown User"}</p>

            <p>Category: {video.category}</p>

            <div className="video-description">
              <p>{video.description}</p>
            </div>

            <div className="video-actions">
              <button type="button" onClick={() => handleReaction("like")}>
                👍 {likes}
              </button>

              <button type="button" onClick={() => handleReaction("dislike")}>
                👎 {dislikes}
              </button>

              <button type="button" onClick={handleShare}>
                Share
              </button>

              <button type="button" onClick={handleSave}>
                {saved ? "Unsave" : "Save"}
              </button>
            </div>
          </div>

          {/* COMMENTS */}
          <section className="comments-section">
            <h2>Comments ({comments.length})</h2>

            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />

              <button type="submit">Comment</button>
            </form>

            <div className="comments-list">
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="comment">
                    <strong>{comment.user?.username || "Unknown User"}</strong>

                    {editingCommentId === comment._id ? (
                      <>
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />

                        <button
                          type="button"
                          onClick={() => handleUpdateComment(comment._id)}
                        >
                          Update
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingCommentId(null);
                            setEditText("");
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <p>{comment.text}</p>

                        <button
                          type="button"
                          onClick={() => {
                            setEditingCommentId(comment._id);
                            setEditText(comment.text);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <aside className="suggested-videos">
          <h2>Suggested videos</h2>

          {suggestedVideos.map((suggestedVideo) => (
            <a
              key={suggestedVideo._id}
              href={`/watch/${suggestedVideo._id}`}
              className="suggested-video"
            >
              <img
                src={suggestedVideo.thumbnailUrl}
                alt={suggestedVideo.title}
              />

              <div>
                <h3>{suggestedVideo.title}</h3>

                <p>{suggestedVideo.uploader?.username || "Unknown Channel"}</p>

                <p>{suggestedVideo.views} views</p>
              </div>
            </a>
          ))}
        </aside>
      </div>
    </main>
  );
};

export default VideoPlayer;
