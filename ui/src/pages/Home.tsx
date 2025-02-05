import { Box, Typography, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import background from "../assets/home.jpg";

const Home = () => {
  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <Box
        sx={{
          background: "rgba(10, 10, 20, 0.95)",
          boxShadow: "5px 0px 15px rgba(0, 255, 255, 0.3)",
          zIndex: 2,
        }}
      >
        <Sidebar />
      </Box>
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
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            zIndex: 1,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            backdropFilter: "blur(2px)",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.6)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "3rem",
              letterSpacing: "2px",
              marginBottom: "20px",
            }}
          >
            Sentinel SIEM Project 🌃
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#00FFFF",
              fontWeight: "500",
              textShadow: "0px 0px 4px rgba(0, 255, 255, 0.6)",
              maxWidth: "600px",
              marginBottom: "20px",
            }}
          >
            Gerçek Zamanlı SIEM İzleme & Güvenlik Olay Yönetimi
          </Typography>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #00FFFF, #FF00FF)",
              color: "#121212",
              fontWeight: "bold",
              padding: "12px 25px",
              fontSize: "18px",
              borderRadius: "8px",
              transition: "0.3s",
              textTransform: "uppercase",
              boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.7)",
              "&:hover": {
                background: "linear-gradient(45deg, #FF00FF, #00FFFF)",
                transform: "scale(1.05)",
                boxShadow: "0px 0px 25px rgba(0, 255, 255, 1)",
              },
            }}
            onClick={() => (window.location.href = "/dashboard")}
          >
            DASHBOARD🚀
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
