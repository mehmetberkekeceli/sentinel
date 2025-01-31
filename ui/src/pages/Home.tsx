import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to right, #000428, #121212)",
        color: "#FFFFFF",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textShadow: "0px 0px 10px rgba(0, 255, 255, 0.8)",
          }}
        >
          SIEM Dashboard 🚀
        </Typography>
        <Typography variant="h5" sx={{ marginTop: "10px", color: "#00FFFF" }}>
          SIEM Log Analiz & Güvenlik Yönetimi
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: "30px",
            backgroundColor: "#00FFFF",
            color: "#121212",
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "18px",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#00BFFF",
              boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.8)",
            },
          }}
        >
          Güvenlik Raporlarını İncele 🔍
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
