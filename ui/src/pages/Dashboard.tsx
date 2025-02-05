import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { getAllAlerts } from "../services/alertService";
import { Alert } from "../types/Alert";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [severityStats, setSeverityStats] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAllAlerts();
        setAlerts(data);
        const stats: { [key: string]: number } = {};
        data.forEach((alert) => {
          stats[alert.severity] = (stats[alert.severity] || 0) + 1;
        });

        setSeverityStats(stats);
      } catch (error) {
        console.error("Uyarılar yüklenirken hata oluştu!", error);
      }
    };

    fetchAlerts();
  }, []);

  const lineData = {
    labels:
      alerts?.map((alert) => new Date(alert.timestamp).toLocaleTimeString()) ||
      [],
    datasets: [
      {
        label: "Gerçek Zamanlı Olay Sayısı",
        data: alerts?.map(() => 1) || [],
        borderColor: "#00FFFF",
        backgroundColor: "rgba(0, 255, 255, 0.3)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: Object.keys(severityStats || {}),
    datasets: [
      {
        label: "Şiddet Bazlı Olaylar",
        data: Object.values(severityStats || {}),
        backgroundColor: [
          "#00FFFF",
          "#FF004D",
          "#FFAD00",
          "#00FF7F",
          "#FF69B4",
        ],
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
        color: "#FFFFFF",
      }}
    >
      <Sidebar />

      <Box sx={{ flexGrow: 1, padding: "20px" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          📊 SIEM Dashboard
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: "20px",
                background: "#161616",
                borderRadius: "10px",
                boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  color: "#00FFFF",
                  textShadow: "0px 0px 8px rgba(0, 255, 255, 0.7)",
                }}
              >
                Gerçek Zamanlı Olay Sayısı
              </Typography>
              <Line key={JSON.stringify(lineData)} data={lineData} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: "20px",
                background: "#161616",
                borderRadius: "10px",
                boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  marginBottom: "10px",
                  color: "#00FFFF",
                  textShadow: "0px 0px 8px rgba(0, 255, 255, 0.7)",
                }}
              >
                Şiddet Bazlı Olaylar
              </Typography>
              <Bar key={JSON.stringify(barData)} data={barData} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
