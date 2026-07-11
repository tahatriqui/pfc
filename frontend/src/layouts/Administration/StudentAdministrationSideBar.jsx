import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
  UserIcon,
} from "lucide-react";

import {
  STUDENT_DASHBOARD_ROUTE,
  STUDENT_PROJECTS_ROUTE,
  STUDENT_TASKS_ROUTE,
} from "../../router/index.jsx";

export function StudentAdministrationSideBar({ className }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      label: "Dashboard",
      path: STUDENT_DASHBOARD_ROUTE,
      icon: LayoutDashboardIcon,
    },
    {
      label: "My Projects",
      path: STUDENT_PROJECTS_ROUTE,
      icon: FolderKanbanIcon,
    },
    {
      label: "My Tasks",
      path: STUDENT_TASKS_ROUTE,
      icon: ClipboardListIcon,
    },
  ];

  return (
    <div className={cn("px-4 py-6 text-white", className)}>
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
        Student
      </p>

      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Button
              key={item.path}
              asChild
              variant="ghost"
              className={`h-12 w-full justify-start rounded-xl text-sm font-semibold transition ${
                active
                  ? "border border-emerald-500/60 bg-emerald-600/20 text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:bg-emerald-600/25"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Link to={item.path}>
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
          <UserIcon className="h-5 w-5" />
        </div>

        <p className="text-sm font-semibold text-white">Student Member</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Consultez vos projets, suivez vos tâches et mettez à jour votre
          avancement.
        </p>
      </div>
    </div>
  );
}
