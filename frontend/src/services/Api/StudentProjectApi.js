import api from "../../api/axios.js";

const StudentProjectApi = {
  myProjects: async () => {
    return await api.get("/student/projects");
  },

  myTasks: async () => {
    return await api.get("/student/tasks");
  },

  updateTaskStatus: async (taskId, status) => {
    return await api.put(`/student/tasks/${taskId}/status`, {
      status,
    });
  },
};

export default StudentProjectApi;
