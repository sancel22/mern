import { IFormUser } from "../interface/app";
import BaseAPI from "./BaseApi";

const baseURL = "/api/users";

class UserApi extends BaseAPI {
  get = async (url: string) => {
    return await this.instance
      .get(url, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  post = async (url: string, data: Partial<IFormUser>) => {
    return await this.instance
      .post(url, data, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  create = async (data: Omit<IFormUser, "password2">) => {
    return await this.post("/", data);
  };

  login = async (data: Pick<IFormUser, "email" | "password">) => {
    return await this.post("/login", data);
  };
}

function useUserApi() {
  return new UserApi();
}

export { UserApi as default, useUserApi };
