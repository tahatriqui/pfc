import { useEffect, useState } from "react";
import { ClipboardListIcon, Loader } from "lucide-react";
import StudentProjectApi from "../../services/Api/StudentProjectApi.js";

export default function StudentTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await StudentProjectApi.myTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Student tasks error:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusChange = async (taskId, status) => {
    try {
      await StudentProjectApi.updateTaskStatus(taskId, status);
      await fetchTasks();
    } catch (error) {
      console.log("Update status error:", error);
      alert("Erreur lors de la modification du status.");
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
      <h1 className="text-2xl font-bold">My Tasks</h1>
      <p className="mb-6 text-sm text-gray-300">
        Mes tâches assignées dans les projets.
      </p>

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
                  <th className="p-4">Status</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Due Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-800">
                    <td className="p-4 font-medium">{task.title}</td>

                    <td className="p-4 text-gray-300">
                      {task.project?.title || "No project"}
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

                    <td className="p-4">
                      <select
                        value={task.status}
                        onChange={(e) =>
                          handleStatusChange(task.id, e.target.value)
                        }
                        className="rounded-md border border-slate-700 bg-white px-3 py-2 text-slate-900"
                      >
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
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
