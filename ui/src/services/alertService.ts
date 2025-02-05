import axios from "axios";
import { Alert } from "../types/Alert";
import config from "../environment/env";

const API_BASE_URL = config.API_BASE_URL;

export const getAllAlerts = async (): Promise<Alert[]> => {
  try {
    const response = await axios.get<Alert[]>(`${API_BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    console.error("Hata: Uyarılar alınamadı!", error);
    throw error;
  }
};

export const getAlertsBySeverity = async (
  severity: string
): Promise<Alert[]> => {
  try {
    const response = await axios.get<Alert[]>(
      `${API_BASE_URL}/alerts/severity/${severity}`
    );
    return response.data;
  } catch (error) {
    console.error(`Hata: ${severity} şiddetindeki uyarılar alınamadı!`, error);
    throw error;
  }
};
