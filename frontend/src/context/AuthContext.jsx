import { createContext, useContext, useState } from "react";

// Create a context for managing authentication state
const AuthContext = createContext();

// Provides authentication data and functions to the application
export const AuthProvider = ({ children }) => {
  // Get the logged-in user from localStorage when the app starts
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Get the JWT token from localStorage when the app starts
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Store user information and JWT token after successful login
  const login = (userData, jwtToken) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);

    setUser(userData);
    setToken(jwtToken);
  };

  // Remove authentication data during logout
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    // Make authentication state and functions available
    // to all child components
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,

        // Convert the token value into a boolean
        // to determine whether the user is logged in
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
