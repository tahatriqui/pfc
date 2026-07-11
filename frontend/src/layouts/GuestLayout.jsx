import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { LOGIN_ROUTE } from "../router/index.jsx";
import { HomeIcon, LogInIcon } from "lucide-react";

export default function GuestLayout() {
  return (
    <div className="min-h-screen bg-[#020817] text-white">
      <header className="border-b border-slate-800 bg-[#020817]/95">
        <div className="mx-auto flex h-[150px] items-center justify-between px-10">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
            >
              <HomeIcon className="h-4 w-4" />
              Home page
            </Link>

            <Link
              to={LOGIN_ROUTE}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              <LogInIcon className="h-4 w-4" />
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
