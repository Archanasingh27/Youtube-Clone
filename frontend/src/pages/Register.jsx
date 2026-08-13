
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import API from "../services/api";


import "./Auth.css";

const Register = () => {
  
  const navigate = useNavigate();

  // Store registration form data.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  // Update the corresponding form field
  // whenever the user enters a value.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors and start loading.
    setError("");
    setLoading(true);

    try {
      // Send registration data to the backend.
      await API.post("/auth/register", formData);
      navigate("/login");
    } catch (error) {

      setError(error.response?.data?.message || "Registration failed");
    } finally {

      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="auth-subtitle">Create an account to start watching</p>

        {/* Display registration error when available. */}
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username field */}
          <div className="auth-field">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit registration form */}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        {/* Redirect existing users to the login page. */}
        <p className="auth-switch">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")}>
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
};

export default Register;
