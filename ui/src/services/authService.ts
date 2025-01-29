import axios from "axios";
import env from "../environment/env";
import { User } from "../types/User";

export const loginUser = async (
  username: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const response = await axios.post(`${env.API_BASE_URL}/auth/login`, {
    username,
    password,
  });
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
