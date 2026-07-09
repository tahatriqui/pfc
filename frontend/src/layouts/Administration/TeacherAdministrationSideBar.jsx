import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button.jsx";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboardIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
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
    <div className={cn("pb-12 text-white", className)}>
      <div className="px-3 py-4">
        <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">
          Teacher Space
        </h2>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.path}
                asChild
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={`w-full justify-start ${
                  isActive(item.path)
                    ? "bg-white text-slate-950 hover:bg-white"
                    : "text-white hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Link to={item.path}>
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
