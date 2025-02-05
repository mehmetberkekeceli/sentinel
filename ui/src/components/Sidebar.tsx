import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Home as HomeIcon,
  BarChart as DashboardIcon,
  ExitToApp as LogoutIcon,
  ListAlt as LogsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: expanded ? "220px" : "70px",
        height: "100vh",
        background: "rgba(31, 31, 31, 0.9)",
        backdropFilter: "blur(10px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.3s ease-in-out",
        boxShadow: expanded
          ? "5px 0px 15px rgba(0, 255, 255, 0.3)"
          : "5px 0px 10px rgba(0, 255, 255, 0.2)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: expanded ? "flex-end" : "center",
        }}
      >
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: "#00FFFF",
            transition: "0.3s",
            "&:hover": { color: "#00BFFF" },
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <List>
        <Tooltip title={expanded ? "" : "Ana Sayfa"} placement="right">
          <ListItem component="button" onClick={() => navigate("/home")}>
            <ListItemIcon sx={{ color: "#00FFFF" }}>
              <HomeIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Ana Sayfa" />}
          </ListItem>
        </Tooltip>

        <Tooltip title={expanded ? "" : "Dashboard"} placement="right">
          <ListItem component="button" onClick={() => navigate("/dashboard")}>
            <ListItemIcon sx={{ color: "#00FFFF" }}>
              <DashboardIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Dashboard" />}
          </ListItem>
        </Tooltip>

        <ListItem component="button" onClick={() => navigate("/logs")}>
          <ListItemIcon sx={{ color: "#00FFFF" }}>
            <LogsIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Loglar" />}
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: "#00FFFF", marginY: "10px" }} />

      <List>
        <Tooltip title={expanded ? "" : "Çıkış Yap"} placement="right">
          <ListItem component="button" onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#FF004D" }}>
              <LogoutIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Çıkış Yap" />}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );
};

export default Sidebar;
