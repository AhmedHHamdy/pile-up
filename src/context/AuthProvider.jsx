import { createContext, useState, useContext, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  // State to hold the authentication token
  const [token, setToken_] = useState(Cookies.get("token")); 

  // Function to set the authentication token
  const setToken = (newToken) => {
    console.log(newToken)
    setToken_(newToken);
    if (newToken === undefined) {
      return;
    }
    Cookies.set("token", newToken); 
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};