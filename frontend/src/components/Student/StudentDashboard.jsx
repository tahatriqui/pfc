import { useEffect, useState } from "react";
import {
  FolderKanbanIcon,
  ClipboardListIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  ArrowUpIcon,
} from "lucide-react";

import UserApi from "../../services/Api/UserApi.js";
import StudentProjectApi from "../../services/Api/StudentProjectApi.js";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userRes = await UserApi.getUser();
        setStudent(userRes.data);

        const [projectsRes, tasksRes] = await Promise.all([
          StudentProjectApi.myProjects(),
          StudentProjectApi.myTasks(),
        ]);

        const projects = Array.isArray(projectsRes.data)
          ? projectsRes.data
          : [];

        const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];

        setStats({
          projects: projects.length,
          tasks: tasks.length,
          completedTasks: tasks.filter((task) => task.status === "done").length,
          pendingTasks: tasks.filter((task) => task.status !== "done").length,
        });
      } catch (error) {
        console.log("Student dashboard error:", error);
      }
    };

    fetchDashboard();
  }, []);

  const statCards = [
    {
      label: "My Projects",
      value: stats.projects,
      icon: FolderKanbanIcon,
      accent: "from-blue-600 to-cyan-500",
      change: "+8%",
    },
    {
      label: "My Tasks",
      value: stats.tasks,
      icon: ClipboardListIcon,
      accent: "from-violet-600 to-blue-500",
      change: "+12%",
    },
    {
      label: "Completed Tasks",
      value: stats.completedTasks,
      icon: CheckCircleIcon,
      accent: "from-emerald-500 to-cyan-500",
      change: "+5%",
    },
    {
      label: "Pending Tasks",
      value: stats.pendingTasks,
      icon: ClockIcon,
      accent: "from-orange-500 to-yellow-500",
      change: "+3%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Overview of your projects, tasks and personal progress.
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

      {/* STUDENT INFO */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="rounded-xl bg-emerald-600/20 p-3 text-emerald-400">
            <UserIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Current Student</h2>
            <p className="text-sm text-slate-400">
              Connected student account details
            </p>
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
                <td className="px-4 py-4">{student?.id || "1"}</td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-cyan-500 font-bold text-white">
                      {student?.firstname?.[0] || "S"}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {student
                          ? `${student.firstname} ${student.lastname}`
                          : "Student User"}
                      </p>
                      <p className="text-xs text-slate-500">Student</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {student?.email || "taha@gmail.com"}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Student
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* WELCOME CARD */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 to-emerald-950/40 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">
          Welcome back, {student?.firstname || "Student"}!
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          You can view your projects, follow assigned tasks, and update your
          progress from your workspace.
        </p>
      </div>
    </div>
  );
}
