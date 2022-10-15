export interface IUser extends Omit<IFormUser, "password" | "password"> {}

export interface IFormUser {
  name: string;
  email: string;
  roles: string[];
  password: string;
  password2: string;
}
