import { Box, Typography } from "@mui/material";

const UnauthorizedPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f0f0f",
        color: "#fff",
        flexDirection: "column",
      }}
    >
      <Typography variant="h3" sx={{ color: "#FF004D", mb: 2 }}>
        🚫 Yetkisiz Erişim
      </Typography>
      <Typography variant="h6">
        Bu sayfaya erişim yetkiniz bulunmamaktadır.
      </Typography>
    </Box>
  );
};

export default UnauthorizedPage;
