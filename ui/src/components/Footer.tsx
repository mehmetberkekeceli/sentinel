import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#1F1F1F",
        color: "#B0B0B0",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} SentinelSiem | All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
