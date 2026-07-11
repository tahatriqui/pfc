import { useEffect, useState } from "react";
import {
  FolderKanbanIcon,
  ClipboardListIcon,
  UsersIcon,
  CheckCircleIcon,
  GraduationCapIcon,
  ArrowUpIcon,
} from "lucide-react";

import UserApi from "../../services/Api/UserApi.js";
import TeacherProjectApi from "../../services/Api/TeacherProjectApi.js";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);

  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completedTasks: 0,
    students: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const userRes = await UserApi.getUser();
        setTeacher(userRes.data);

        const [projectsRes, tasksRes] = await Promise.all([
          TeacherProjectApi.myProjects(),
          TeacherProjectApi.myTasks(),
        ]);

        const projects = Array.isArray(projectsRes.data)
          ? projectsRes.data
          : [];

        const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];

        const studentsIds = new Set();

        projects.forEach((project) => {
          project.members?.forEach((member) => {
            studentsIds.add(member.id);
          });
        });

        setStats({
          projects: projects.length,
          tasks: tasks.length,
          completedTasks: tasks.filter((task) => task.status === "done").length,
          students: studentsIds.size,
        });
      } catch (error) {
        console.log("Teacher dashboard error:", error);
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
      label: "Project Tasks",
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
      label: "Students",
      value: stats.students,
      icon: UsersIcon,
      accent: "from-cyan-500 to-teal-400",
      change: "+10%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Overview of your supervised projects and student progress.
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

      {/* TEACHER INFO */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl">
        <div className="flex items-center gap-3 border-b border-slate-800 p-5">
          <div className="rounded-xl bg-cyan-600/20 p-3 text-cyan-400">
            <GraduationCapIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="font-semibold text-white">Current Teacher</h2>
            <p className="text-sm text-slate-400">
              Connected teacher account details
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
                <td className="px-4 py-4">{teacher?.id || "1"}</td>

                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-blue-500 font-bold text-white">
                      {teacher?.firstname?.[0] || "T"}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {teacher
                          ? `${teacher.firstname} ${teacher.lastname}`
                          : "Teacher One"}
                      </p>
                      <p className="text-xs text-slate-500">Encadrant</p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4">
                  {teacher?.email || "teacher@teacher.teacher"}
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                    Teacher
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
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-950 to-cyan-950/40 p-6 shadow-xl">
        <h2 className="text-xl font-bold text-white">
          Welcome back, Teacher!
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          You can supervise student projects, create tasks, and follow progress
          from your workspace.
        </p>
      </div>
    </div>
  );
}
