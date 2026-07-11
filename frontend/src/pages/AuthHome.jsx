import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home.jsx";
import { redirectToDashboard } from "../router/index.jsx";
import { useUserContext } from "../context/StudentContext.jsx";
import UserApi from "../services/Api/UserApi.js";

export default function AuthHome() {
  const navigate = useNavigate();
  const { authenticated, setUser, setAuthenticated, logout } = useUserContext();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (authenticated === true) {
      UserApi.getUser()
        .then(({ data }) => {
          setUser(data);
          setAuthenticated(true);
          navigate(redirectToDashboard(data.role), { replace: true });
        })
        .catch(() => {
          logout();
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, [authenticated]);

  if (checking) {
    return (
      <div className="flex min-h-[calc(100vh-96px)] items-center justify-center bg-[#020817] text-white">
        Loading...
      </div>
    );
  }

  return <Home />;
}
