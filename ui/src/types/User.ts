export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  username: string;
  fullName: string;
  password: string;
  email: string;
  token?: string;
  profileImageUrl: string;
  role: Role;
}
