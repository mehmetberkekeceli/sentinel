export interface Log {
  id: number;
  timestamp: string;
  level: string;
  message: string;
  source: string;
  userId?: string;
}
