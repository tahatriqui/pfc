import { useEffect, useState } from "react";
import { FolderKanbanIcon, Loader } from "lucide-react";
import TeacherProjectApi from "../../services/Api/TeacherProjectApi.js";

export default function TeacherProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await TeacherProjectApi.myProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Teacher projects error:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">My Projects</h1>
      <p className="mb-6 text-sm text-gray-300">
        Liste des projets que j’encadre.
      </p>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-slate-700 p-6 text-gray-300">
          Aucun projet trouvé.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-700 bg-slate-950 p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-3">
                  <FolderKanbanIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold">{project.title}</h2>
                  <p className="text-sm text-gray-400">
                    Status : {project.status}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-medium text-white">Deadline :</span>{" "}
                  {project.deadline || "Aucune deadline"}
                </p>

                <p>
                  <span className="font-medium text-white">Étudiants :</span>{" "}
                  {project.members?.length || 0}
                </p>

                {project.members?.length > 0 && (
                  <ul className="mt-1 list-disc pl-5 text-gray-400">
                    {project.members.map((member) => (
                      <li key={member.id}>
                        {member.firstname} {member.lastname}
                      </li>
                    ))}
                  </ul>
                )}

                <p>
                  <span className="font-medium text-white">Tâches :</span>{" "}
                  {project.tasks?.length || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
