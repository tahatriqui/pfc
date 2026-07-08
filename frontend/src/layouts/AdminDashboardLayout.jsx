import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import {
  LOGIN_ROUTE,
  redirectToDashboard,
  ADMIN_DASHBOARD_ROUTE,
} from "../router/index.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/StudentContext.jsx";
import UserApi from "../services/Api/UserApi.js";
import { LayoutDashboardIcon } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle.jsx";
import { AdminAdministrationSideBar } from "./Administration/AdminAdministrationSideBar.jsx";
import AdminDropDownMenu from "./drop-down-menu/AdminDropDownMenu.jsx";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const {
    authenticated,
    setUser,
    setAuthenticated,
    logout: contextLogout,
  } = useUserContext();

  useEffect(() => {
    if (authenticated === true) {
      setIsLoading(false);

      UserApi.getUser()
        .then(({ data }) => {
          const { role } = data;

          if (role !== "admin") {
            navigate(redirectToDashboard(role));
            return;
          }

          setUser(data);
          setAuthenticated(true);
        })
        .catch(() => {
          contextLogout();
        });
    } else {
      navigate(LOGIN_ROUTE);
    }
  }, [authenticated]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-800 bg-[#020817]">
        <div className="mx-auto flex h-28 items-center justify-between px-10">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Right menu */}
          <nav>
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  to={ADMIN_DASHBOARD_ROUTE}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  <LayoutDashboardIcon className="h-5 w-5" />
                  Dashboard
                </Link>
              </li>

              <li>
                <AdminDropDownMenu />
              </li>

              <li>
                <ModeToggle />
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto px-10 py-6">
        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="w-full rounded-xl border border-slate-800 bg-[#020817] p-3 md:w-2/12">
            <AdminAdministrationSideBar />
          </aside>

          {/* Content */}
          <section className="w-full rounded-xl border border-slate-800 bg-[#020817] md:w-10/12">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}
