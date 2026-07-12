import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import {
  LOGIN_ROUTE,
  redirectToDashboard,
  STUDENT_DASHBOARD_ROUTE,
} from "../router/index.jsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/StudentContext.jsx";
import UserApi from "../services/Api/UserApi.js";
import { LayoutDashboardIcon, SearchIcon, BellIcon } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle.jsx";
import { StudentAdministrationSideBar } from "./Administration/StudentAdministrationSideBar.jsx";
import StudentDropDownMenu from "./drop-down-menu/StudentDropDownMenu.jsx";

export default function StudentDashboardLayout() {
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

          if (role !== "student") {
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
        <aside className="hidden w-[280px] shrink-0 flex-col border-r border-slate-800 bg-[#06111f] lg:flex">
          <div className="flex h-28 items-center justify-center border-b border-slate-800 px-6">
            <Logo showText={false} size="large" />
          </div>

          <StudentAdministrationSideBar />

          <div className="mx-5 mb-6 mt-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-white">Student Space</p>
            <p className="mt-1 text-xs text-slate-400">
              Projects, tasks and collaboration access
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
                  Student Workspace
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  Follow your projects, tasks and progress
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={STUDENT_DASHBOARD_ROUTE}
                  className="hidden items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 lg:flex"
                >
                  <LayoutDashboardIcon className="h-4 w-4" />
                  Dashboard
                </Link>

               

                <StudentDropDownMenu />
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
