import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (data) => {
    try {
      setIsAuthenticated(false);
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );
      setIsAuthenticated(true);
      console.log("Login successful: ", response.data);
      useNavigate("/home");
    } catch (error) {
      console.log("Login failed: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
