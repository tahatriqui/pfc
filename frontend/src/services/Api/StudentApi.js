import api from "../../api/axios.js";

const StudentApi = {
  all: async () => {
    return await api.get("/admin/students");
  },
};

export default StudentApi;
