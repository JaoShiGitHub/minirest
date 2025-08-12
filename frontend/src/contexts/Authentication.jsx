import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:4000/customer/status",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(response?.data?.success);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
    } catch (error) {
      if (error.message) {
        setErrorMessage(`Login Error: ${error.message}`);
      }
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
    } catch (error) {
      if (error.message) {
        setErrorMessage(`Logout Error: ${error.message}`);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        setLoading,
        errorMessage,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
