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
  Avatar,
  Typography,
} from "@mui/material";
import {
  Home as HomeIcon,
  BarChart as DashboardIcon,
  ExitToApp as LogoutIcon,
  ListAlt as LogsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { getProfileImageUrl } from "../services/userService";

const navItems = [
  { label: "Ana Sayfa", icon: <HomeIcon />, path: "/home" },
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Loglar", icon: <LogsIcon />, path: "/logs", adminOnly: true },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: expanded ? "250px" : "72px",
        height: "100vh",
        background: "linear-gradient(180deg, #0f0f0f, #1a1a1a)",
        backdropFilter: "blur(12px)",
        borderRight: "1px solid rgba(0,255,255,0.15)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "width 0.3s ease-in-out",
        boxShadow: expanded
          ? "5px 0px 20px rgba(0, 255, 255, 0.25)"
          : "3px 0px 10px rgba(0, 255, 255, 0.15)",
        overflowX: "hidden",
      }}
    >
      {/* ÜST KISIM */}
      <Box
        sx={{
          display: "flex",
          flexDirection: expanded ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          p: 1.5,
          borderBottom: "1px solid rgba(0,255,255,0.2)",
          gap: expanded ? 0 : "6px",
        }}
      >
        {/* Avatar Alanı */}
        {user && (
          <Tooltip title="Profil" placement="right">
            <Box
              onClick={() => navigate("/profile")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                justifyContent: "center",
                flexDirection: expanded ? "row" : "column",
              }}
            >
              <Avatar
                src={
                  user.profileImageUrl
                    ? getProfileImageUrl(user.profileImageUrl)
                    : ""
                }
                alt={user.username}
                sx={{
                  width: 42,
                  height: 42,
                  border: "2px solid #00FFFF",
                  mb: expanded ? 0 : 1,
                }}
              />
              {expanded && (
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "#fff",
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    ml: 1.5,
                  }}
                >
                  {user.username}
                </Typography>
              )}
            </Box>
          </Tooltip>
        )}

        {/* Menü Aç/Kapa Butonu */}
        <IconButton
          onClick={() => setExpanded(!expanded)}
          sx={{
            color: "#00FFFF",
            mt: expanded ? 0 : 1,
            alignSelf: "center",
            "&:hover": { color: "#00BFFF" },
          }}
        >
          {expanded ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      {/* ORTA KISIM */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {navItems.map((item, idx) => {
            if (item.adminOnly && user?.role !== "ADMIN") return null;
            return (
              <Tooltip
                key={idx}
                title={expanded ? "" : item.label}
                placement="right"
                arrow
              >
                <ListItem
                  component="button"
                  onClick={() => navigate(item.path)}
                  sx={{
                    my: 0.5,
                    mx: 0,
                    borderRadius: "10px",
                    color: "#fff",
                    "&:hover": {
                      background: "rgba(0, 255, 255, 0.1)",
                      boxShadow: "0 0 10px rgba(0,255,255,0.3)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#00FFFF", minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  {expanded && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        fontSize: "15px",
                      }}
                    />
                  )}
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* ALT KISIM: Çıkış */}
      <Box>
        <Divider sx={{ backgroundColor: "rgba(0,255,255,0.2)", mx: 1 }} />
        <List>
          <Tooltip title={expanded ? "" : "Çıkış Yap"} placement="right" arrow>
            <ListItem
              component="button"
              onClick={handleLogout}
              sx={{
                mx: 1,
                my: 1,
                borderRadius: "10px",
                color: "#fff",
                "&:hover": {
                  background: "rgba(255, 0, 77, 0.15)",
                  boxShadow: "0 0 10px rgba(255,0,77,0.4)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#FF004D", minWidth: "40px" }}>
                <LogoutIcon />
              </ListItemIcon>
              {expanded && <ListItemText primary="Çıkış Yap" />}
            </ListItem>
          </Tooltip>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
