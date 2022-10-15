export interface IUser extends Omit<IFormUser, "password" | "password"> {}

export interface IFormUser {
  name: string;
  email: string;
  roles: string[];
  password: string;
  password2: string;
}

export interface IBook {
  id: string;
  createdBy: string;
  title: string;
  author: string;
  publishedYear: string;
}

export interface ApiResponseError {
  status: number;
  message: FixMe;
}

export type FixMe = any;
