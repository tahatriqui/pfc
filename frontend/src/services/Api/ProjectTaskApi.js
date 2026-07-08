import api from "../../api/axios.js";

const ProjectTaskApi = {
  all: async () => {
    return await api.get("/admin/project-tasks");
  },

  create: async (data) => {
    return await api.post("/admin/project-tasks", data);
  },

  update: async (id, data) => {
    return await api.put(`/admin/project-tasks/${id}`, data);
  },

  delete: async (id) => {
    return await api.delete(`/admin/project-tasks/${id}`);
  },
};

export default ProjectTaskApi;
