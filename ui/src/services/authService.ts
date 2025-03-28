import axios from "axios";
import env from "../environment/env";
import { User } from "../types/User";

interface LoginResponse {
  user: User;
  token: string;
}

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${env.API_BASE_URL}/auth/login`,
    {
      username,
      password,
    }
  );
  return response.data;
};

export const registerUser = async (
  username: string,
  password: string,
  fullName: string,
  email: string
) => {
  await axios.post(`${env.API_BASE_URL}/auth/register`, {
    username,
    password,
    fullName,
    email,
  });
};
