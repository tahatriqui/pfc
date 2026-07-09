import { useEffect, useState } from "react";
import { Button } from "../ui/button.jsx";
import { ClipboardListIcon, Loader, PlusIcon } from "lucide-react";
import TeacherProjectApi from "../../services/Api/TeacherProjectApi.js";

export default function TeacherTasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    project_id: "",
    assigned_to: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
  });

  const fetchTasks = async () => {
    try {
      const { data } = await TeacherProjectApi.myTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Teacher tasks error:", error);
      setTasks([]);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await TeacherProjectApi.myProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Teacher projects error:", error);
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
    (project) => String(project.id) === String(formData.project_id)
  );

  const projectMembers = selectedProject?.members || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "project_id") {
      const project = projects.find((item) => String(item.id) === String(value));
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
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!formData.project_id) {
      alert("Choisis un projet.");
      return;
    }

    if (!formData.assigned_to) {
      alert("Choisis un étudiant.");
      return;
    }

    try {
      setCreating(true);

      await TeacherProjectApi.createTask({
        project_id: Number(formData.project_id),
        assigned_to: Number(formData.assigned_to),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        due_date: formData.due_date || null,
      });

      resetForm();
      setShowForm(false);
      await fetchData();
    } catch (error) {
      console.log("Create teacher task error:", error);
      alert("Erreur lors de la création de la tâche.");
    } finally {
      setCreating(false);
    }
  };

  const getAssignedStudentName = (task) => {
    if (task.assigned_student) {
      return `${task.assigned_student.firstname} ${task.assigned_student.lastname}`;
    }

    if (task.assignedStudent) {
      return `${task.assignedStudent.firstname} ${task.assignedStudent.lastname}`;
    }

    return "Non assigné";
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
          <h1 className="text-2xl font-bold">Project Tasks</h1>
          <p className="text-sm text-gray-300">
            Gestion des tâches des projets que j’encadre.
          </p>
        </div>

        <Button onClick={() => setShowForm(!showForm)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {showForm ? "Cancel" : "New Task"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreateTask}
          className="teacher-task-form mb-6 rounded-xl border border-slate-700 bg-slate-950 p-6 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            Create New Task
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Project
              </label>
              <select
                name="project_id"
                value={formData.project_id}
                onChange={handleChange}
                required
                className="w-full rounded-md px-3 py-2"
              >
                <option value="">Select project</option>

                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Student
              </label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                required
                disabled={!formData.project_id || projectMembers.length === 0}
                className="w-full rounded-md px-3 py-2"
              >
                <option value="">Select student</option>

                {projectMembers.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.firstname} {member.lastname}
                    {member.pivot?.role ? ` - ${member.pivot.role}` : ""}
                  </option>
                ))}
              </select>
            </div>

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
                placeholder="Task title"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
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
                <option value="todo">Todo</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-white">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
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
              placeholder="Task description"
            />
          </div>

          <div className="mt-5">
            <Button disabled={creating} type="submit">
              {creating && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Create Task
            </Button>
          </div>
        </form>
      )}

      <div className="rounded-xl border border-slate-700 bg-slate-950 shadow-sm">
        <div className="border-b border-slate-700 p-4">
          <div className="flex items-center gap-2">
            <ClipboardListIcon className="h-5 w-5" />
            <h2 className="font-semibold">Tasks</h2>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="p-6 text-gray-300">Aucune tâche trouvée.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700 bg-slate-900 text-gray-300">
                <tr>
                  <th className="p-4">Task</th>
                  <th className="p-4">Project</th>
                  <th className="p-4">Student</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Due Date</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-800">
                    <td className="p-4 font-medium">{task.title}</td>

                    <td className="p-4 text-gray-300">
                      {task.project?.title || "No project"}
                    </td>

                    <td className="p-4 text-gray-300">
                      {getAssignedStudentName(task)}
                    </td>

                    <td className="p-4">
                      <span className="rounded-full bg-slate-800 px-2 py-1">
                        {task.status}
                      </span>
                    </td>

                    <td className="p-4 text-gray-300">{task.priority}</td>

                    <td className="p-4 text-gray-300">
                      {task.due_date || "No date"}
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
