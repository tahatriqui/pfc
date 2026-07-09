import api from "../../api/axios.js";

const TeacherProjectApi = {
  myProjects: async () => {
    return await api.get("/teacher/projects");
  },

  myTasks: async () => {
    return await api.get("/teacher/tasks");
  },

  createTask: async (data) => {
    return await api.post("/teacher/tasks", data);
  },
};

export default TeacherProjectApi;
