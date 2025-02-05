export interface Alert {
  id: number;
  type: string;
  severity: string;
  message: string;
  timestamp: string;
  userId?: string;
}
