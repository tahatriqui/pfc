import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  UserIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
} from "lucide-react";

import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_MANAGE_PARENTS_ROUTE,
  ADMIN_MANAGE_STUDENTS_ROUTE,
  ADMIN_PROJECTS_ROUTE,
  ADMIN_TASKS_ROUTE,
} from "../../router/index.jsx";

export function AdminAdministrationSideBar({ className }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      label: "Dashboard",
      path: ADMIN_DASHBOARD_ROUTE,
      icon: LayoutDashboardIcon,
    },
    {
      label: "Parents",
      path: ADMIN_MANAGE_PARENTS_ROUTE,
      icon: UserIcon,
    },
    {
      label: "Students",
      path: ADMIN_MANAGE_STUDENTS_ROUTE,
      icon: GraduationCapIcon,
    },
    {
      label: "Projects",
      path: ADMIN_PROJECTS_ROUTE,
      icon: FolderKanbanIcon,
    },
    {
      label: "Tasks",
      path: ADMIN_TASKS_ROUTE,
      icon: ClipboardListIcon,
    },
  ];

  return (
    <div className={cn("px-4 py-6 text-white", className)}>
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Main
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
                  ? "border border-blue-500/60 bg-blue-600/20 text-white shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:bg-blue-600/25"
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
    </div>
  );
}
