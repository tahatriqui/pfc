import { useEffect, useState } from "react";
import { Button } from "../../ui/button.jsx";
import { ClipboardListIcon, Loader, PlusIcon, Trash2Icon } from "lucide-react";

import ProjectTaskApi from "../../../services/Api/ProjectTaskApi.js";
import ProjectApi from "../../../services/Api/ProjectApi.js";

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [formData, setFormData] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
  });

  const normalizeArray = (data, key) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.[key])) return data[key];
    return [];
  };

  const fetchTasks = async () => {
    try {
      const { data } = await ProjectTaskApi.all();
      setTasks(normalizeArray(data, "tasks"));
    } catch (error) {
      console.log("Tasks error:", error);
      setTasks([]);
    }
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

  const fetchData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchTasks(), fetchProjects()]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedProject = projects.find(
    (project) => String(project.id) === String(formData.project_id),
  );

  const projectMembers = selectedProject?.members || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "project_id") {
      const project = projects.find(
        (item) => String(item.id) === String(value),
      );
      const firstMemberId = project?.members?.[0]?.id || "";

      setFormData((prev) => ({
        ...prev,
        project_id: value,
        assigned_to: firstMemberId ? String(firstMemberId) : "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-100 disabled:text-gray-500";

  const labelClass = "mb-1 block text-sm font-medium text-white";

  const resetForm = () => {
    setFormData({
      project_id: "",
      assigned_to: "",
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      due_date: "",
    });

    setEditingTaskId(null);
  };

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setShowForm(true);

    setFormData({
      project_id: String(task.project_id),
      assigned_to: String(task.assigned_to || ""),
      title: task.title || "",
      description: task.description || "",
      status: task.status || "todo",
      priority: task.priority || "medium",
      due_date: task.due_date || "",
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!formData.project_id) {
      alert("Choisis un projet.");
      return;
    }

    if (!formData.assigned_to) {
      alert("Choisis un étudiant pour cette tâche.");
      return;
    }

    try {
      setCreating(true);

      const payload = {
        project_id: Number(formData.project_id),
        assigned_to: Number(formData.assigned_to),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        due_date: formData.due_date || null,
      };

      if (editingTaskId) {
        await ProjectTaskApi.update(editingTaskId, payload);
      } else {
        await ProjectTaskApi.create(payload);
      }

      resetForm();
      setEditingTaskId(null);
      setShowForm(false);
      await fetchTasks();
      await fetchProjects();
    } catch (error) {
      console.log("Save task error:", error);
      alert("Erreur lors de l’enregistrement de la tâche.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      await ProjectTaskApi.delete(id);
      await fetchTasks();
      await fetchProjects();
    } catch (error) {
      console.log("Delete task error:", error);
      alert("Erreur lors de la suppression de la tâche.");
    }
  };

  const getAssignedStudentName = (task) => {
    if (task.assigned_student) {
      return `${task.assigned_student.firstname} ${task.assigned_student.lastname}`;
    }

    if (task.assignedStudent) {
      return `${task.assignedStudent.firstname} ${task.assignedStudent.lastname}`;
    }

    return "Not assigned";
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-sm tex00">
            Suivi des tâches liées aux projets étudiants.
          </p>
        </div>

        <Button
          onClick={() => {
            setShowForm(!showForm);
            resetForm();
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          {showForm ? "Cancel" : "New Task"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateTask}
          className="task-form mb-6 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            {editingTaskId ? "Edit Task" : "Create New Task"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Project</label>
              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select project</option>

                {projects.map((project) => (
                  <option
                    className={inputClass}
                    key={project.id}
                    value={project.id}
                  >
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Assigned Student</label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                required
                disabled={!formData.project_id || projectMembers.length === 0}
                className={inputClass}
              >
                <option value="">Select student</option>

                {projectMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstname} {member.lastname}
                    {member.pivot?.role ? ` - ${member.pivot.role}` : ""}
                  </option>
                ))}
              </select>

              {formData.project_id && projectMembers.length === 0 && (
                <p className="mt-1 text-xs text-red-500">
                  Ce projet n’a aucun étudiant. Ajoute d’abord des étudiants au
                  projet.
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-md border px-3 py-2"
                placeholder="Task title"
              />
            </div>

            <div>
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              />
            </div>

            <div>
              <label className={labelClass}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
              rows="4"
              placeholder="Task description"
            />
          </div>

          <div className="mt-5">
            <Button disabled={creating} type="submit">
              {creating && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              {editingTaskId ? "Update Task" : "Create Task"}
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-xl border bg-white text-gray-900 shadow-sm">
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <ClipboardListIcon className="h-5 w-5 text-gray-700" />
            <h2 className="font-semibold text-gray-900">All Tasks</h2>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="p-6 text-gray-500">No tasks found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-4">Task</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody className="text-gray-800">
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {task.title}
                    </td>

                    <td className="p-4 text-gray-700">
                      {task.project?.title || "No project"}
                    </td>

                    <td className="p-4 text-gray-700">
                      {getAssignedStudentName(task)}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                        {task.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-700">{task.priority}</td>

                    <td className="p-4 text-gray-700">
                      {task.due_date || "No date"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2" style={{ color: "white" }}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(task)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
