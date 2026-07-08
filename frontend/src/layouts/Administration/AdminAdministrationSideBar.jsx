import { cn } from "@/lib/utils";
import { Button } from "../../components/ui/button.jsx";
import { Link } from "react-router-dom";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_MANAGE_PARENTS_ROUTE,
  ADMIN_MANAGE_STUDENTS_ROUTE,
  ADMIN_PROJECTS_ROUTE,
  ADMIN_TASKS_ROUTE,
} from "../../router/index.jsx";
import {
  LayoutDashboardIcon,
  GraduationCapIcon,
  UserIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
} from "lucide-react";

export function AdminAdministrationSideBar({ className }) {
  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Administration
          </h2>

          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to={ADMIN_DASHBOARD_ROUTE}>
                <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to={ADMIN_MANAGE_PARENTS_ROUTE}>
                <UserIcon className="mr-2 h-4 w-4" />
                Parents
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to={ADMIN_MANAGE_STUDENTS_ROUTE}>
                <GraduationCapIcon className="mr-2 h-4 w-4" />
                Students
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to={ADMIN_PROJECTS_ROUTE}>
                <FolderKanbanIcon className="mr-2 h-4 w-4" />
                Projects
              </Link>
            </Button>

            <Button asChild variant="ghost" className="w-full justify-start">
              <Link to={ADMIN_TASKS_ROUTE}>
                <ClipboardListIcon className="mr-2 h-4 w-4" />
                Tasks
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
