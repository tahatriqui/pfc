import { createContext, useContext, useState } from "react";
import UserApi from "../services/Api/UserApi.js";

export const StudentStateContext = createContext({
  user: {},
  authenticated: false,
  setUser: () => {},
  logout: async () => {},
  login: async (email, password) => {},
  setAuthenticated: () => {},
  setToken: () => {},
});

export default function StudentContext({ children }) {
  const [user, setUser] = useState({});
  const [authenticated, _setAuthenticated] = useState(
    window.localStorage.getItem("AUTHENTICATED") === "true",
  );

  const login = async (email, password) => {
    return UserApi.login(email, password);
  };

  const logout = async () => {
    try {
      await UserApi.logout();
    } catch (error) {
      console.log("Logout backend error:", error);
    } finally {
      setUser({});
      setAuthenticated(false);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("AUTHENTICATED");
    }
  };

  const setAuthenticated = (isAuthenticated) => {
    _setAuthenticated(isAuthenticated);

    if (isAuthenticated) {
      window.localStorage.setItem("AUTHENTICATED", "true");
    } else {
      window.localStorage.removeItem("AUTHENTICATED");
    }
  };

  const setToken = (token) => {
    window.localStorage.setItem("token", token);
  };

  return (
    <StudentStateContext.Provider
      value={{
        user,
        login,
        logout,
        setUser,
        authenticated,
        setAuthenticated,
        setToken,
      }}
    >
      {children}
    </StudentStateContext.Provider>
  );
}

export const useUserContext = () => useContext(StudentStateContext);
