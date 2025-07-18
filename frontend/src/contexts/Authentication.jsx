import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      await axios.get(`http://localhost:4000/customer/info`, {
        withCredentials: true,
      });
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (data) => {
    try {
      setIsAuthenticated(false);
      const response = await axios.post(
        "http://localhost:4000/customer/login",
        data,
        { withCredentials: true }
      );
      setUser(response);
      setIsAuthenticated(true);
      console.log("Login successful: ", response.data);
      navigate("/home");
    } catch (error) {
      console.log("Login error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, login }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
