import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../router/index.jsx";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Project Management",
      description:
        "Create student projects, assign members, track deadlines and monitor progress.",
      icon: FolderKanbanIcon,
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Task Tracking",
      description:
        "Organize tasks by status, priority, due date and assigned student.",
      icon: ClipboardListIcon,
      color: "from-violet-600 to-blue-500",
    },
    {
      title: "Team Collaboration",
      description:
        "Students and teachers can collaborate around projects and responsibilities.",
      icon: UsersIcon,
      color: "from-cyan-500 to-teal-400",
    },
  ];

  const roles = [
    {
      title: "Admin",
      description: "Manage users, projects, tasks and platform data.",
      icon: ShieldCheckIcon,
    },
    {
      title: "Teacher",
      description: "Supervise projects, create tasks and follow progress.",
      icon: GraduationCapIcon,
    },
    {
      title: "Student",
      description: "View assigned projects, update tasks and collaborate.",
      icon: UsersIcon,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-96px)]">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Student Project Management Platform
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              Manage student projects, tasks and collaboration in one platform.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              A collaborative platform designed for students, teachers and
              administrators to organize academic projects, assign tasks, track
              progress and improve teamwork.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to={LOGIN_ROUTE}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition hover:from-blue-700 hover:to-cyan-600"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-4 text-sm font-bold text-slate-200 transition hover:bg-slate-800"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-cyan-400" />
                Projects
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-cyan-400" />
                Tasks
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-cyan-400" />
                Collaboration
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-blue-950/40">
            <div className="rounded-2xl border border-slate-800 bg-[#07111f] p-5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Project Overview
                  </h2>
                  <p className="text-sm text-slate-400">
                    Collaborative project workspace
                  </p>
                </div>

                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Active
                </span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="font-semibold text-white">
                      Student Project Platform
                    </p>
                    <p className="text-sm text-cyan-400">75%</p>
                  </div>

                  <div className="h-2 rounded-full bg-slate-800">
                    <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Projects</p>
                    <h3 className="mt-2 text-3xl font-bold text-white">12</h3>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Tasks</p>
                    <h3 className="mt-2 text-3xl font-bold text-white">48</h3>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <p className="text-sm text-slate-400">Teams</p>
                    <h3 className="mt-2 text-3xl font-bold text-white">8</h3>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="mb-4 font-semibold text-white">Recent Tasks</p>

                  <div className="space-y-3">
                    <TaskItem title="Create project dashboard" status="Done" />
                    <TaskItem title="Assign students to project" status="In Progress" />
                    <TaskItem title="Upload final deliverable" status="Todo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-white">
            Everything needed for student project collaboration
          </h2>
          <p className="mt-3 text-slate-400">
            Simple tools for project tracking, task management and academic
            supervision.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl transition hover:-translate-y-1 hover:border-cyan-500/40"
              >
                <div
                  className={`mb-5 inline-flex rounded-2xl bg-gradient-to-br ${feature.color} p-4`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ROLES */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 to-blue-950/40 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white">
              Built for all academic roles
            </h2>
            <p className="mt-3 text-slate-400">
              Each user has a dedicated workspace based on their role.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.title}
                  className="rounded-2xl border border-slate-800 bg-[#020817]/70 p-5"
                >
                  <Icon className="mb-4 h-7 w-7 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

function TaskItem({ title, status }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#020817] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
        <p className="text-sm font-medium text-slate-200">{title}</p>
      </div>

      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
        {status}
      </span>
    </div>
  );
}
