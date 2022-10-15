import { FixMe, IBook } from "../interface/app";
import BaseAPI from "./BaseApi";

const baseURL = "/api/books";

class BookApi extends BaseAPI {
  get = async (url: string) => {
    return await this.instance
      .get(url, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  post = async (url: string, data: FixMe) => {
    return await this.instance
      .post(url, data, { baseURL })
      .then(this.handleResponse)
      .catch(this.handleError);
  };

  create = async ({
    publishedYear: published_year,
    ...rest
  }: Omit<IBook, "id" | "createdBy">) => {
    return await this.post("/", { published_year, ...rest });
  };

  delete = async (id: string) => {
    return await this.instance
      .delete(`/${id}`, {baseURL})
      .then(this.handleResponse)
      .catch(this.handleError);
  };
}

function useBookApi() {
  return new BookApi();
}

export { BookApi as default, useBookApi };
