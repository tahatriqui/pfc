import { useEffect, useState } from "react";
import { Button } from "../../ui/button.jsx";
import { FolderKanbanIcon, PlusIcon, Loader, Trash2Icon } from "lucide-react";

import ProjectApi from "../../../services/Api/ProjectApi.js";
import StudentApi from "../../../services/Api/StudentApi.js";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teacher_id: "1",
    classe_id: "1",
    status: "active",
    deadline: "",
    members: [],
  });

  const normalizeArray = (data, key) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.[key])) return data[key];
    return [];
  };

  const fetchProjects = async () => {
    try {
      const { data } = await ProjectApi.all();
      setProjects(normalizeArray(data, "projects"));
    } catch (error) {
      console.log("Projects error:", error);
      setProjects([]);
    }
  };

  const fetchStudents = async () => {
    try {
      const { data } = await StudentApi.all();
      setStudents(normalizeArray(data, "students"));
    } catch (error) {
      console.log("Students error:", error);
      setStudents([]);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchProjects(), fetchStudents()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      teacher_id: "1",
      classe_id: "1",
      status: "active",
      deadline: "",
      members: [],
    });

    setEditingProjectId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isStudentSelected = (studentId) => {
    return formData.members.some((member) => member.user_id === studentId);
  };

  const getStudentRole = (studentId) => {
    return (
      formData.members.find((member) => member.user_id === studentId)?.role ||
      "member"
    );
  };

  const handleStudentCheck = (studentId) => {
    setFormData((prev) => {
      const exists = prev.members.some(
        (member) => member.user_id === studentId,
      );

      if (exists) {
        return {
          ...prev,
          members: prev.members.filter(
            (member) => member.user_id !== studentId,
          ),
        };
      }

      return {
        ...prev,
        members: [
          ...prev.members,
          {
            user_id: studentId,
            role: prev.members.length === 0 ? "leader" : "member",
          },
        ],
      };
    });
  };

  const handleRoleChange = (studentId, role) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member) =>
        member.user_id === studentId ? { ...member, role } : member,
      ),
    }));
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setShowForm(true);

    setFormData({
      title: project.title || "",
      description: project.description || "",
      teacher_id: String(project.teacher_id || "1"),
      classe_id: project.classe_id ? String(project.classe_id) : "1",
      status: project.status || "active",
      deadline: project.deadline || "",
      members:
        project.members?.map((member) => ({
          user_id: member.id,
          role: member.pivot?.role || "member",
        })) || [],
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();

    if (formData.members.length === 0) {
      alert("Choisis au moins un étudiant pour ce projet.");
      return;
    }

    try {
      setCreating(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        teacher_id: Number(formData.teacher_id),
        classe_id: formData.classe_id ? Number(formData.classe_id) : null,
        status: formData.status,
        deadline: formData.deadline || null,
        members: formData.members,
      };

      if (editingProjectId) {
        await ProjectApi.update(editingProjectId, payload);
      } else {
        await ProjectApi.create(payload);
      }

      resetForm();
      setShowForm(false);
      await fetchProjects();
    } catch (error) {
      console.log("Save project error:", error);
      alert("Erreur lors de l’enregistrement du projet.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await ProjectApi.delete(id);
      await fetchProjects();
    } catch (error) {
      console.log("Delete project error:", error);
      alert("Erreur lors de la suppression du projet.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-gray-300">
            Gestion des projets étudiants.
          </p>
        </div>

        <Button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          {showForm ? "Cancel" : "New Project"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSaveProject}
          className="project-form mb-6 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            {editingProjectId ? "Edit Project" : "Create New Project"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2"
                placeholder="Project title"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Teacher ID
              </label>
              <input
                type="number"
                name="teacher_id"
                value={formData.teacher_id}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Classe ID
              </label>
              <input
                type="number"
                name="classe_id"
                value={formData.classe_id}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2"
              rows="4"
              placeholder="Project description"
            />
          </div>

          <div className="mt-5">
            <h3 className="mb-3 text-sm font-semibold text-white">
              Students du projet
            </h3>

            {students.length === 0 ? (
              <div className="rounded-md border border-slate-700 p-4 text-sm text-gray-300">
                Aucun étudiant trouvé.
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                {students.map((student) => {
                  const selected = isStudentSelected(student.id);

                  return (
                    <div
                      key={student.id}
                      className="rounded-lg border border-slate-700 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={() => handleStudentCheck(student.id)}
                          className="h-4 w-4"
                        />

                        <div>
                          <p className="font-medium text-white">
                            {student.firstname} {student.lastname}
                          </p>
                          <p className="text-xs text-gray-400">
                            {student.email}
                          </p>
                        </div>
                      </div>

                      {selected && (
                        <div className="mt-3">
                          <label className="mb-1 block text-xs font-medium text-white">
                            Role
                          </label>
                          <select
                            value={getStudentRole(student.id)}
                            onChange={(e) =>
                              handleRoleChange(student.id, e.target.value)
                            }
                            className="w-full rounded-md px-2 py-1 text-sm"
                          >
                            <option value="leader">Leader</option>
                            <option value="member">Member</option>
                          </select>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-5">
            <Button disabled={creating} type="submit">
              {creating && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {editingProjectId ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="rounded-xl border bg-white p-6 text-gray-500">
          No projects found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border bg-white p-5 text-gray-900 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-gray-100 p-3">
                  <FolderKanbanIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-semibold">{project.title}</h2>
                  <p className="text-sm text-gray-500">
                    Encadrant:{" "}
                    {project.teacher
                      ? `${project.teacher.firstname} ${project.teacher.lastname}`
                      : "Not assigned"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="rounded-full bg-gray-100 px-2 py-1">
                    {project.status}
                  </span>
                </p>

                <p>
                  <span className="font-medium">Deadline:</span>{" "}
                  {project.deadline || "No deadline"}
                </p>

                <p>
                  <span className="font-medium">Members:</span>{" "}
                  {project.members?.length || 0}
                </p>

                {project.members?.length > 0 && (
                  <div>
                    <span className="font-medium">Students:</span>
                    <ul className="mt-1 list-disc pl-5 text-gray-600">
                      {project.members.map((member) => (
                        <li key={member.id}>
                          {member.firstname} {member.lastname}{" "}
                          <span className="text-xs text-gray-400">
                            ({member.pivot?.role})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <p>
                  <span className="font-medium">Tasks:</span>{" "}
                  {project.tasks?.length || 0}
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(project)}
                >
                  Edit
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
