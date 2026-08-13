import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

// Login page 
const Login = () => {
  const navigate = useNavigate();

  // Store the user's login form data.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Get the login function from AuthContext.
  const { login } = useAuth();

  // Store login errors.
  const [error, setError] = useState("");

  // Track the login request state.
  const [loading, setLoading] = useState(false);

  // Update the corresponding form field.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors and start loading.
    setError("");
    setLoading(true);

    try {
      // Send login credentials to the backend.
      const response = await API.post("/auth/login", formData);

      // Save the logged-in user and JWT token
      // through the authentication context.
      login(response.data.user, response.data.token);

      // Redirect to the home page after successful login.
      navigate("/");
    } catch (error) {
      // Display the backend error message if available.
      setError(error.response?.data?.message || "Login failed");
    } finally {
      // Stop the loading state after the request finishes.
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Sign In</h1>

        <p className="auth-subtitle">Sign in to continue watching videos</p>

        {/* Display login error when available. */}
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email field */}
          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field */}
          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit login form */}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Link to registration page for new users. */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <button type="button" onClick={() => navigate("/register")}>
            Create account
          </button>
        </p>
      </div>
    </main>
  );
};

export default Login;
