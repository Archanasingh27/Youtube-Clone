import { useEffect, useState } from "react";
import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Comments = ({ videoId }) => {
  const { user } = useAuth();

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editText, setEditText] = useState("");

  // =========================
  // FETCH COMMENTS
  // =========================

  const fetchComments = async () => {
    try {
      const response = await API.get(`/comments/video/${videoId}`);

      setComments(response.data.comments);
    } catch (error) {
      console.error("Get comments error:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  // =========================
  // ADD COMMENT
  // =========================

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    try {
      const response = await API.post(`/comments/video/${videoId}`, {
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

  // =========================
  // UPDATE COMMENT
  // =========================

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

  // =========================
  // DELETE COMMENT
  // =========================

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

  // =========================
  // UI
  // =========================

  return (
    <section className="comments-section">
      <h2>Comments ({comments.length})</h2>

      {/* Add Comment */}
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <button type="submit">Comment</button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => {
            // Logged-in user ID
            const currentUserId = user?.id;

            // Comment owner's MongoDB ID
            const commentUserId = comment.user?._id;

            // Check whether current user owns this comment
            const isCommentOwner =
              currentUserId?.toString() === commentUserId?.toString();

            return (
              <div key={comment._id} className="comment">
                <strong>{comment.user?.username || "Unknown User"}</strong>

                {/* =========================
                    EDIT MODE
                ========================= */}

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
                  /* =========================
                     NORMAL MODE
                  ========================= */

                  <>
                    <p>{comment.text}</p>

                    {/* 
                      Only show Edit/Delete
                      to the comment owner
                    */}

                    {isCommentOwner && (
                      <>
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
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default Comments;
