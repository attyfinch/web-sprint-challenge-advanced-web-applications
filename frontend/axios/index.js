import axios from "axios";
// ✨ implement axiosWithAuth

export const axiosAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: `http://localhost:9000/api/articles`,
      headers: {
        authorization: token
      }
    });
  };