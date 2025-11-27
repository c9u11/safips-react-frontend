import axios from "axios";

export const apiClient = axios.create();

export function ApiClientSetting() {
  apiClient.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  apiClient.defaults.headers.common["Content-Type"] = "application/json";

  apiClient.interceptors.request.use((config) => {
    config.headers.Authorization = import.meta.env.VITE_API_TOKEN;
    return config;
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.message && error.message !== 'canceled') alert(error.message);
      return Promise.reject(error);
    }
  );

  return <></>;
}

export default apiClient;
