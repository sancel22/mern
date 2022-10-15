import axios, { AxiosError, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

const axiosAPI = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use((config) => {
  if (typeof localStorage !== "undefined") {
    const jwt = localStorage.getItem("jwt");
    if (jwt && config.headers) {
      config.headers.authorization = `Bearer ${jwt}`;
    }
  }

  return config;
});

export default class BaseAPI {
  instance = axiosAPI;

  setToken(jwt: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  }

  handleResponse = (response: AxiosResponse) => {
    const data: any =
      typeof response.data === "object"
        ? {
            ...response,
            data: camelcaseKeys(response.data, { deep: true }),
          }
        : response;
    return data;
  };

  handleError = (error: AxiosError) => {
    const status = error.response?.status;
    let message = error.response?.data;
    return Promise.reject({
      status,
      message,
    });
  };
}
