import { FormUser } from "../interface/app";
import BaseAPI from "./BaseApi";

const baseURL = "/api";

class UserApi extends BaseAPI {
  get = async (url: string) => {
    return await this.instance
      .get(url, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  post = async (url: string, data: Omit<FormUser, "password2">) => {
    return await this.instance
      .post(url, data, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  create = async (data: Omit<FormUser, "password2">) => {
    return await this.post("/users", data);
  };
}

function useUserApi() {
  return new UserApi();
}

export { UserApi as default, useUserApi };
