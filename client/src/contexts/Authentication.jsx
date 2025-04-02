import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState({
    user: null,
  });

  const login = async (data) => {
    try {
      setIsAuthenticated(false);
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        data
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      const userDataFromToken = jwtDecode(token);

      setState({ user: userDataFromToken });
      setIsAuthenticated(true);
      console.log("Login successful: ", response.data);
      navigate("/home");
    } catch (error) {
      console.log("Login failed: ", error);
    }
  };

  return (
    <AuthContext.Provider value={{ state, isAuthenticated, login }}>
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
