import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "radial-gradient(circle at top left, #000428, #121212 70%)",
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
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: "linear-gradient(to right, #00FFFF, #FF00FF)",
            boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.8)",
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            textShadow: "0px 0px 15px rgba(0, 255, 255, 0.9)",
            fontSize: "3rem",
            letterSpacing: "2px",
            animation: "glow 2s infinite alternate",
            "@keyframes glow": {
              from: { textShadow: "0px 0px 10px rgba(0, 255, 255, 0.6)" },
              to: { textShadow: "0px 0px 20px rgba(0, 255, 255, 1)" },
            },
          }}
        >
          SIEM Dashboard 🚀
        </Typography>

        <Typography
          variant="h5"
          sx={{
            marginTop: "10px",
            color: "#00FFFF",
            fontWeight: "500",
            textShadow: "0px 0px 5px rgba(0, 255, 255, 0.7)",
          }}
        >
          Gerçek Zamanlı Güvenlik Analizi & SIEM Yönetimi
        </Typography>

        <Button
          variant="contained"
          sx={{
            marginTop: "30px",
            background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
            color: "#121212",
            fontWeight: "bold",
            padding: "12px 25px",
            fontSize: "18px",
            borderRadius: "8px",
            transition: "0.3s",
            textTransform: "uppercase",
            boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.7)",
            "&:hover": {
              background: "linear-gradient(45deg, #FF00FF, #00FFFF)",
              transform: "scale(1.05)",
              boxShadow: "0px 0px 30px rgba(0, 255, 255, 1)",
            },
          }}
        >
          Güvenlik Raporlarını İncele 🔍
        </Button>

        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            width: "300px",
            height: "5px",
            background: "rgba(0, 255, 255, 0.5)",
            filter: "blur(5px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
