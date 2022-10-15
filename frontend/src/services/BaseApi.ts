import axios, { AxiosError, AxiosResponse } from "axios";
import camelcaseKeys from "camelcase-keys";

const axiosAPI = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosAPI.interceptors.request.use((request) => {
  // if (typeof document !== "undefined" && document.cookie) {
  //   const { jwt = undefined } = document.cookie;
  //   if (jwt) {
  //     request.headers.authorization = `Bearer ${document.cookie.jwt}`;
  //   }
  // }

  return request;
});

export default class BaseAPI {
  instance = axiosAPI;

  setToken(accessToken: string) {
    this.instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
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
