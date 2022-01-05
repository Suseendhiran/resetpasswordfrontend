import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const AuthContext = createContext();
function AuthProvider({ children }) {
  const [token, setToken] = useState({});
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    } else {
      setToken(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      token,
      setToken,
    };
  }, [token, setToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
