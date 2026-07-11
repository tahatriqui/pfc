import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
  GraduationCapIcon,
} from "lucide-react";

import {
  TEACHER_DASHBOARD_ROUTE,
  TEACHER_PROJECTS_ROUTE,
  TEACHER_TASKS_ROUTE,
} from "../../router/index.jsx";

export function TeacherAdministrationSideBar({ className }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      label: "Dashboard",
      path: TEACHER_DASHBOARD_ROUTE,
      icon: LayoutDashboardIcon,
    },
    {
      label: "My Projects",
      path: TEACHER_PROJECTS_ROUTE,
      icon: FolderKanbanIcon,
    },
    {
      label: "Project Tasks",
      path: TEACHER_TASKS_ROUTE,
      icon: ClipboardListIcon,
    },
  ];

  return (
    <div className={cn("px-4 py-6 text-white", className)}>
      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        Teacher
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
                  ? "border border-cyan-500/60 bg-cyan-600/20 text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:bg-cyan-600/25"
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
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300">
          <GraduationCapIcon className="h-5 w-5" />
        </div>

        <p className="text-sm font-semibold text-white">Encadrant</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">
          Suivez les projets, créez des tâches et contrôlez l’avancement des
          étudiants.
        </p>
      </div>
    </div>
  );
}
