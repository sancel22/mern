export interface User extends Omit<FormUser, "password" | "password"> {}

export interface FormUser {
  name: string;
  email: string;
  roles: string[];
  password: string;
  password2: string;
}
