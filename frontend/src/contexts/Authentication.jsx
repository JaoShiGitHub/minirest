import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const checkAuth = async () => {
  //   try {
  //     const data = await axios(`http://localhost:4000/customer/info`, {
  //       withCredentials: true,
  //     });
  //     console.log(data);
  //     setIsAuthenticated(true);
  //   } catch {
  //     setIsAuthenticated(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const login = async (data) => {
    try {
      setIsAuthenticated(false);
      const response = await axios.post(
        "http://localhost:4000/customer/login",
        data,
        { withCredentials: true }
      );
      setIsAuthenticated(true);
      console.log("Login successful: ", response);
      navigate("/home");
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
      setIsAuthenticated(false);
      console.log("Logout successful: ", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Logout error: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
