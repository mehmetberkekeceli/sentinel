import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100%",
        textAlign: "center",
        padding: "0.8rem",
        backgroundColor: "#1F1F1F",
        color: "#B0B0B0",
        boxShadow: "0px -2px 10px rgba(0, 255, 255, 0.2)",
        fontSize: "0.9rem",
        marginTop: "auto",
        "@media (max-width: 600px)": {
          fontSize: "0.8rem",
        },
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} SentinelSIEM | All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
