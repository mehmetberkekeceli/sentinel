import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { loginUser } from "../services/authService";
import { RootState } from "../redux/store";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles.scss";

const schema = yup.object().shape({
  username: yup.string().required("⚠️ Kullanıcı adı zorunludur"),
  password: yup
    .string()
    .min(6, "❌ Şifre en az 6 karakter olmalıdır")
    .matches(/[A-Z]/, "🔐 Şifre en az 1 büyük harf içermelidir")
    .matches(/[a-z]/, "🔐 Şifre en az 1 küçük harf içermelidir")
    .matches(/\d/, "🔢 Şifre en az 1 rakam içermelidir")
    .required("⚠️ Şifre zorunludur"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setIsSubmitting(true);
      const response = await loginUser(data.username, data.password);
      console.log("API'den Gelen Yanıt:", response);

      if (!response || !response.token) {
        throw new Error("Giriş başarısız!");
      }

      dispatch(login({ user: data.username, token: response.token }));
      toast.success("✅ Giriş başarılı, yönlendiriliyorsunuz...", {
        className: "toast-success",
      });
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.log(error);
      toast.error("❌ Giriş başarısız! Kullanıcı adı veya şifre hatalı.", {
        className: "toast-error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: "2rem",
          borderRadius: "1rem",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#1F1F1F",
          color: "#FFFFFF",
        }}
      >
        <Avatar sx={{ margin: "0 auto", backgroundColor: "#1976d2" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Giriş Yap
        </Typography>
        <Box component="form" mt={2} onSubmit={handleSubmit(handleLogin)}>
          <TextField
            fullWidth
            label="Kullanıcı Adı"
            variant="filled"
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333",
                color: "#FFF",
              },
              "& .MuiInputLabel-root": { color: "#B0B0B0" },
            }}
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            fullWidth
            label="Şifre"
            type={showPassword ? "text" : "password"}
            variant="filled"
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333",
                color: "#FFF",
              },
              "& .MuiInputLabel-root": { color: "#B0B0B0" },
            }}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#B0B0B0" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: "1rem" }}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>
        </Box>
        <Button
          fullWidth
          variant="text"
          color="secondary"
          sx={{ marginTop: "1rem" }}
          onClick={() => navigate("/register")}
        >
          Hesabın yok mu? Kayıt Ol
        </Button>
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Login;
