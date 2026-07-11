import UserLogin from "../components/Guest/Login/UserLogin.jsx";
import {
  CheckCircleIcon,
  FolderKanbanIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";

export default function Login() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center px-6 py-10">
      <div className="grid w-full gap-8 lg:grid-cols-2">
        {/* Left presentation */}
        <div className="hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-10 shadow-2xl lg:block">
          <div className="mb-8 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
            Student Project Management Platform
          </div>

          <h1 className="mb-5 text-4xl font-bold leading-tight text-white">
            Manage student projects, tasks and collaboration in one place.
          </h1>

          <p className="mb-8 max-w-xl text-base leading-7 text-slate-400">
            Une plateforme collaborative pour permettre aux étudiants,
            enseignants et administrateurs de suivre les projets, les tâches,
            les membres et l’avancement.
          </p>

          <div className="grid gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="rounded-xl bg-blue-500/15 p-3 text-blue-400">
                <FolderKanbanIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Project tracking</h3>
                <p className="text-sm text-slate-400">
                  Suivi des projets, deadlines et avancement.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="rounded-xl bg-cyan-500/15 p-3 text-cyan-400">
                <UsersIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Team collaboration</h3>
                <p className="text-sm text-slate-400">
                  Étudiants, enseignants et groupes de projet.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
              <div className="rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
                <CheckCircleIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Task management</h3>
                <p className="text-sm text-slate-400">
                  Tâches, priorités, statuts et progression.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right login card */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">
                <GraduationCapIcon className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-400">
                Connectez-vous à votre espace.
              </p>
            </div>

            <UserLogin />
          </div>
        </div>
      </div>
    </section>
  );
}
