export interface IUser extends Omit<IFormUser, "password" | "password"> {
  id: string;
}

export interface IFormUser {
  name: string;
  email: string;
  roles: string[];
  password: string;
  password2: string;
}

export interface IBookInitialValues
  extends Pick<IBook, "id" | "title" | "author" | "publishedYear"> {}

export interface IBook {
  id: string;
  createdBy: string;
  title: string;
  author: string;
  publishedYear: string;
  createdAt: Date;
}

export interface ApiResponseError {
  status: number;
  message: FixMe;
}

export type FixMe = any;
