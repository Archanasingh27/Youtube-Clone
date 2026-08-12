import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);

     login(response.data.user, response.data.token);

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

 return (
   <main className="auth-page">
     <div className="auth-card">
       <h1>Sign In</h1>

       <p className="auth-subtitle">Sign in to continue watching videos</p>

       {error && <p className="auth-error">{error}</p>}

       <form onSubmit={handleSubmit} className="auth-form">
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

         <button type="submit" className="auth-submit" disabled={loading}>
           {loading ? "Signing In..." : "Sign In"}
         </button>
       </form>

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
