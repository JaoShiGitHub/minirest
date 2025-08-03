import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);

      try {
        console.log("start");
        const response = await axios.get("http://localhost:4000/checkme", {
          withCredentials: true,
        });
        setIsAuthenticated(response?.data?.success);
        setLoading(false);
        console.log("Passed");
      } catch (err) {
        console.log(err);
      }
    };
    checkAuth();
  }, []);

  const login = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/customer/login",
        data,
        { withCredentials: true }
      );
      setIsAuthenticated(response?.data?.success);
      console.log("Login successful: ", response);
    } catch (error) {
      console.log("Login error: ", error.message);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/customer/logout",
        {},
        { withCredentials: true }
      );
      setIsAuthenticated(response?.data?.success);
      console.log("Logout successful: ", response.data);
      // navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, setLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
