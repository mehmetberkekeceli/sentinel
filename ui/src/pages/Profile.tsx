import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import {
  updateUser as updateUserApi,
  uploadProfileImage,
  getProfileImageUrl,
  getAllUsers,
} from "../services/userService";
import { updateUser as updateUserRedux } from "../redux/slices/authSlice";
import Sidebar from "../components/Sidebar";
import { User } from "../types/User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("USER");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserRole, setSelectedUserRole] = useState<"ADMIN" | "USER">(
    "USER"
  );
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === "ADMIN") fetchUsers();
  }, [user]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setAllUsers(response);
    } catch {
      toast.error("Kullanıcılar alınamadı.", { className: "toast-error" });
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleUpdateInfo = async () => {
    if (!user?.id) return;
    try {
      setUpdating(true);
      const updated = await updateUserApi(user.id, { fullName, email, role });
      dispatch(updateUserRedux(updated));
      toast.success("Profil bilgileri güncellendi.", {
        className: "toast-success",
      });
    } catch {
      toast.error("Profil güncelleme hatası.", { className: "toast-error" });
    } finally {
      setUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user?.id) return;
    if (password !== confirmPassword) {
      toast.error("Şifreler uyuşmuyor!", { className: "toast-error" });
      return;
    }
    try {
      setUpdating(true);
      const updated = await updateUserApi(user.id, {
        password,
        fullName,
        email,
        role,
      });
      dispatch(updateUserRedux(updated));
      toast.success("Şifre başarıyla güncellendi.", {
        className: "toast-success",
      });
      setPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Şifre güncellenemedi.", { className: "toast-error" });
    } finally {
      setUpdating(false);
    }
  };

  const handleUpload = async () => {
    if (!user?.id || !file) return;
    try {
      setUploading(true);
      await uploadProfileImage(user.id, file);
      const refreshed = await updateUserApi(user.id, {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      });
      dispatch(updateUserRedux(refreshed));
      toast.success("Fotoğraf yüklendi.", { className: "toast-success" });
    } catch {
      toast.error("Fotoğraf yükleme hatası.", { className: "toast-error" });
    } finally {
      setUploading(false);
    }
  };

  const handleAssignRole = async () => {
    if (!selectedUser) return;
    if (selectedUser.id === user?.id) {
      toast.warning("Kendinize rol atayamazsınız!", {
        className: "toast-error",
      });
      return;
    }
    try {
      await updateUserApi(selectedUser.id, {
        fullName: selectedUser.fullName,
        email: selectedUser.email,
        username: selectedUser.username,
        role: selectedUserRole,
      });
      toast.success("Rol başarıyla atandı.", { className: "toast-success" });
    } catch {
      toast.error("Rol atama hatası.", { className: "toast-error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #0f0f0f, #1a1a2e)",
        color: "#FFFFFF",
      }}
    >
      <Box sx={{ width: 250, flexShrink: 0 }}>
        <Sidebar />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Profil Bilgileri */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Paper
            sx={{
              flex: 1,
              p: 4,
              background: "#161616",
              borderRadius: 2,
              boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
            }}
          >
            <Typography variant="h5" sx={{ color: "#00FFFF", mb: 2 }}>
              👤 Profil Bilgileri
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Avatar
                src={
                  user?.profileImageUrl
                    ? getProfileImageUrl(user.profileImageUrl)
                    : ""
                }
                sx={{ width: 80, height: 80 }}
              />
              <Button
                component="label"
                variant="outlined"
                sx={{ borderColor: "#00FFFF", color: "#00FFFF" }}
              >
                Fotoğraf Seç
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </Button>
              <Button
                variant="contained"
                disabled={!file || uploading}
                onClick={handleUpload}
                sx={{ backgroundColor: "#00FFFF", color: "#000" }}
              >
                {uploading ? "Yükleniyor..." : "Yükle"}
              </Button>
            </Box>
            <Divider sx={{ my: 3, borderColor: "#00FFFF" }} />
            <TextField
              label="Ad Soyad"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b0b0b0" },
              }}
            />
            <TextField
              label="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b0b0b0" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleUpdateInfo}
              disabled={updating}
              fullWidth
              sx={{ backgroundColor: "#00FFFF", color: "#000" }}
            >
              {updating ? "Güncelleniyor..." : "Bilgileri Kaydet"}
            </Button>
          </Paper>

          {/* Şifre Değiştir */}
          <Paper
            sx={{
              flex: 1,
              p: 6,
              background: "#161616",
              borderRadius: 2,
              boxShadow: "0px 0px 20px rgba(255, 0, 255, 0.4)",
            }}
          >
            <Typography variant="h6" sx={{ color: "#FF00FF", mb: 2 }}>
              🔒 Şifre Değiştir
            </Typography>
            <TextField
              label="Yeni Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b0b0b0" },
              }}
            />
            <TextField
              label="Yeni Şifre (Tekrar)"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              fullWidth
              sx={{
                mb: 2,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#b0b0b0" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleChangePassword}
              disabled={updating}
              fullWidth
              sx={{ backgroundColor: "#FF00FF", color: "#000" }}
            >
              {updating ? "Güncelleniyor..." : "Şifreyi Değiştir"}
            </Button>
          </Paper>
        </Box>

        {/* Rol Atama */}
        {user?.role === "ADMIN" && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Paper
              sx={{
                p: 4,
                maxWidth: 600,
                width: "100%",
                background: "#161616",
                borderRadius: 2,
                boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.4)",
              }}
            >
              <Typography variant="h5" sx={{ color: "#FF00FF", mb: 2 }}>
                🛡️ Rol Atama
              </Typography>
              {loadingUsers ? (
                <CircularProgress color="secondary" />
              ) : (
                <Autocomplete
                  options={allUsers}
                  getOptionLabel={(option) => option.fullName}
                  onChange={(_, value) => setSelectedUser(value)}
                  slotProps={{
                    popper: {
                      modifiers: [
                        { name: "offset", options: { offset: [0, 4] } },
                      ],
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Kullanıcı Seç"
                      sx={{
                        mb: 2,
                        input: { color: "#fff" },
                        "& .MuiInputLabel-root": { color: "#b0b0b0" },
                      }}
                    />
                  )}
                />
              )}
              <TextField
                select
                label="Rol Seç"
                value={selectedUserRole}
                onChange={(e) =>
                  setSelectedUserRole(e.target.value as "ADMIN" | "USER")
                }
                fullWidth
                sx={{
                  mb: 2,
                  input: { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#b0b0b0" },
                }}
                slotProps={{
                  select: {
                    MenuProps: {
                      PaperProps: {
                        sx: { backgroundColor: "#1e1e2e", color: "#fff" },
                      },
                    },
                  },
                }}
              >
                <MenuItem value="USER">USER</MenuItem>
                <MenuItem value="ADMIN">ADMIN</MenuItem>
              </TextField>
              <Button
                variant="contained"
                fullWidth
                onClick={handleAssignRole}
                sx={{ backgroundColor: "#FF00FF", color: "#000" }}
              >
                Rolü Ata
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProfilePage;
