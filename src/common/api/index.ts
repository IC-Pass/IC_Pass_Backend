import axios from "axios";
import errorHandler from "@/infrastructure/api/errorHandler";
import { useAuthStore } from "@/auth/domain/authStore";

export default () => {
  const authStore = useAuthStore();

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${authStore.token?.token}`,
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
