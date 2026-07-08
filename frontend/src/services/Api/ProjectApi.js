import api from "../../api/axios.js";

const ProjectApi = {
  all: async () => {
    return await api.get("/admin/projects");
  },

  create: async (data) => {
    return await api.post("/admin/projects", data);
  },

  update: async (id, data) => {
    return await api.put(`/admin/projects/${id}`, data);
  },

  delete: async (id) => {
    return await api.delete(`/admin/projects/${id}`);
  },
};

export default ProjectApi;
