import { useEffect, useState } from "react";
import {
  UsersIcon,
  FolderKanbanIcon,
  ClipboardListIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
} from "lucide-react";

import UserApi from "../../../services/Api/UserApi.js";
import StudentApi from "../../../services/Api/StudentApi.js";
import ProjectApi from "../../../services/Api/ProjectApi.js";
import ProjectTaskApi from "../../../services/Api/ProjectTaskApi.js";

export default function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    students: 0,
    projects: 0,
    tasks: 0,
    completedTasks: 0,
  });

  const normalizeArray = (data, key) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.[key])) return data[key];
    return [];
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userRes = await UserApi.getUser();
        setAdmin(userRes.data);

        const [studentsRes, projectsRes, tasksRes] = await Promise.allSettled([
          StudentApi.all(),
          ProjectApi.all(),
          ProjectTaskApi.all(),
        ]);

        const students =
          studentsRes.status === "fulfilled"
            ? normalizeArray(studentsRes.value.data, "students")
            : [];

        const projects =
          projectsRes.status === "fulfilled"
            ? normalizeArray(projectsRes.value.data, "projects")
            : [];

        const tasks =
          tasksRes.status === "fulfilled"
            ? normalizeArray(tasksRes.value.data, "tasks")
            : [];

        setStats({
          students: students.length,
          projects: projects.length,
          tasks: tasks.length,
          completedTasks: tasks.filter((task) => task.status === "done").length,
        });
      } catch (error) {
        console.log("Dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    {
      label: "Total Students",
      value: stats.students,
      icon: UsersIcon,
      accent: "from-blue-600 to-cyan-500",
      change: "+12%",
    },
    {
      label: "Projects",
      value: stats.projects,
      icon: FolderKanbanIcon,
      accent: "from-cyan-500 to-teal-400",
      change: "+8%",
    },
    {
      label: "Tasks",
      value: stats.tasks,
      icon: ClipboardListIcon,
      accent: "from-violet-600 to-blue-500",
      change: "+15%",
    },
    {
      label: "Completed",
      value: stats.completedTasks,
      icon: GraduationCapIcon,
      accent: "from-emerald-500 to-cyan-500",
      change: "+5%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Overview of users, projects, tasks and platform activity.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-300">
          Today:{" "}
          <span className="font-semibold text-white">
            {new Date().toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`rounded-2xl bg-gradient-to-br ${card.accent} p-4`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div className="flex items-center gap-1 text-sm font-medium text-emerald-400">
                  <ArrowUpIcon className="h-4 w-4" />
                  {card.change}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-sm text-slate-400">{card.label}</p>
                <h2 className="mt-1 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADMIN INFO TABLE */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600/20 p-3 text-blue-400">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold text-white">Current Admin</h2>
              <p className="text-sm text-slate-400">
                Connected administrator account details
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-5">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs uppercase tracking-wider text-slate-400">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-slate-900 text-slate-300">
                <td className="px-4 py-4">{admin?.id || "1"}</td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 font-bold text-white">
                      {admin?.firstname?.[0] || "A"}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {admin
                          ? `${admin.firstname} ${admin.lastname}`
                          : "Admin Admin"}
                      </p>
                      <p className="text-xs text-slate-500">You</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {admin?.email || "admin@admin.admin"}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                    Administrator
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* WELCOME CARD */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 to-blue-950/50 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">Welcome back, Admin!</h2>
        <p className="mt-2 text-sm text-slate-400">
          You can manage students, projects, tasks, and collaboration workflows
          from this dashboard.
        </p>
      </div>
    </div>
  );
}
