import { useEffect, useRef } from "react";
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
import { Line, Bar } from "react-chartjs-2";
import Sidebar from "../components/Sidebar";
import { Box, Typography, Paper, Grid } from "@mui/material";

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
  const lineChartRef = useRef<ChartJS | null>(null);
  const barChartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (lineChartRef.current) lineChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, []);

  const lineData = {
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
    datasets: [
      {
        label: "Olay Sayısı",
        data: [5, 12, 24, 31, 19, 22, 28],
        borderColor: "#00FFFF",
        backgroundColor: "rgba(0, 255, 255, 0.3)",
        fill: true,
      },
    ],
  };

  const barData = {
    labels: [
      "Brute Force",
      "DDoS",
      "Malware",
      "Yetkisiz Erişim",
      "SQL Injection",
    ],
    datasets: [
      {
        label: "Saldırı Sayısı",
        data: [35, 27, 15, 42, 19],
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
        background: "#121212",
        color: "#FFFFFF",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "0px 0px 10px rgba(0, 255, 255, 0.8)",
          }}
        >
          SIEM Dashboard 🚀
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                Son 24 Saat Olay Sayısı
              </Typography>
              <Line
                ref={(chart) => (lineChartRef.current = chart as ChartJS)}
                data={lineData}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: "20px",
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(8px)",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                En Çok Görülen Saldırılar
              </Typography>
              <Bar
                ref={(chart) => (barChartRef.current = chart as ChartJS)}
                data={barData}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
