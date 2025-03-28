import axios from "axios";
import env from "../environment/env";
import { User } from "../types/User";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${env.API_BASE_URL}/users`);
  return response.data;
};

export const updateUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    `${env.API_BASE_URL}/users/${id}`,
    userData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const uploadProfileImage = async (id: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${env.API_BASE_URL}/users/${id}/upload-profile`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getProfileImageUrl = (path: string | null): string => {
  if (!path) return "";
  if (path.startsWith("http")) {
    return path;
  }
  return `${env.GET_IMAGE_URL}${path}`;
};
