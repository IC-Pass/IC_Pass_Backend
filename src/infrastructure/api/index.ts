import axios from "axios";
import errorHandler from "@/infrastructure/api/errorHandler";

export default () => {

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer`,
    },
  });

  api.interceptors.request.use((config) => config);

  api.interceptors.response.use(
    (response) => response,
    async (err) => {
      await errorHandler(err);
    }
  );

  return api;
};
