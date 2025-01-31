import axios from "axios";
import env from "../environment/env";
import { Log } from "../types/Log";

const API_URL = `${env.API_BASE_URL}/logs`;

export const getAllLogs = async (): Promise<Log[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Logları çekerken hata oluştu:", error);
    return [];
  }
};

export const getLogsByLevel = async (level: string): Promise<Log[]> => {
  try {
    const response = await axios.get(`${API_URL}/level/${level}`);
    return response.data;
  } catch (error) {
    console.error("Log seviyesine göre loglar çekilemedi:", error);
    return [];
  }
};

export const createLog = async (
  level: string,
  message: string,
  source: string,
  userId?: string
): Promise<Log | null> => {
  try {
    const response = await axios.post(API_URL, {
      level,
      message,
      source,
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Log oluşturulurken hata oluştu:", error);
    return null;
  }
};
