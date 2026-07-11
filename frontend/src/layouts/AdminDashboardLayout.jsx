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
import { LayoutDashboardIcon, SearchIcon, BellIcon } from "lucide-react";
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

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-[280px] shrink-0 border-r border-slate-800 bg-[#06111f] lg:block">
          <div className="flex h-28 items-center justify-center border-b border-slate-800 px-6">
            <Logo showText={false} size="large" />
          </div>

          <AdminAdministrationSideBar />

          <div className="absolute bottom-6 left-6 w-[232px] rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-white">Admin Access</p>
            <p className="mt-1 text-xs text-slate-400">
              Full administrator permissions
            </p>
          </div>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOPBAR */}
          <header className="sticky top-0 z-20 border-b border-slate-800 bg-[#020817]/95 backdrop-blur">
            <div className="flex h-28 items-center justify-between px-6 lg:px-10">
              <div>
                <h1 className="text-xl font-bold text-white lg:text-2xl">
                  Student Project Management
                </h1>
                <p className="mt-1 text-sm text-slate-400">Admin workspace</p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={ADMIN_DASHBOARD_ROUTE}
                  className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 lg:flex"
                >
                  <LayoutDashboardIcon className="h-4 w-4" />
                  Dashboard
                </Link>

                <button className="hidden rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800 md:block">
                  <SearchIcon className="h-5 w-5" />
                </button>

                <button className="relative hidden rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-slate-300 transition hover:bg-slate-800 md:block">
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                    3
                  </span>
                </button>

                <AdminDropDownMenu />
                <ModeToggle />
              </div>
            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
