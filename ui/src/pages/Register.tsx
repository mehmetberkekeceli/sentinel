import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
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
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { toast, ToastContainer } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "react-toastify/dist/ReactToastify.css";
import "../styles.scss";
import background from "../assets/background.jpg";

const schema = yup.object().shape({
  fullName: yup.string().required("⚠️ Ad soyad zorunludur"),
  email: yup
    .string()
    .email("❌ Geçerli bir e-posta giriniz")
    .required("⚠️ E-posta zorunludur"),
  username: yup
    .string()
    .min(4, "❌ Kullanıcı adı en az 4 karakter olmalıdır")
    .required("⚠️ Kullanıcı adı zorunludur"),
  password: yup
    .string()
    .min(6, "❌ Şifre en az 6 karakter olmalıdır")
    .matches(/[A-Z]/, "🔐 Şifre en az 1 büyük harf içermelidir")
    .matches(/[a-z]/, "🔐 Şifre en az 1 küçük harf içermelidir")
    .matches(/\d/, "🔢 Şifre en az 1 rakam içermelidir")
    .required("⚠️ Şifre zorunludur"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleRegister = async (data: {
    username: string;
    password: string;
    fullName: string;
    email: string;
  }) => {
    try {
      setIsSubmitting(true);
      await registerUser(
        data.username,
        data.password,
        data.fullName,
        data.email
      );
      toast.success(
        "✅ Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz...",
        {
          className: "toast-success",
        }
      );
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error("❌ Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.", {
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
        background: `url(${background}) no-repeat center center fixed`,
        backgroundSize: "cover",
        position: "relative",
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
          background: "rgba(31, 31, 31, 0.6)",
          backdropFilter: "blur(8px)",
          color: "#FFFFFF",
          boxShadow: "0px 0px 15px rgba(0, 255, 255, 0.5)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Avatar sx={{ margin: "0 auto", backgroundColor: "#00FFFF" }}>
          <PersonAddAltOutlinedIcon />
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Kayıt Ol
        </Typography>
        <Box component="form" mt={2} onSubmit={handleSubmit(handleRegister)}>
          <TextField
            fullWidth
            label="Ad Soyad"
            variant="filled"
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333",
                color: "#FFF",
              },
              "& .MuiInputLabel-root": { color: "#B0B0B0" },
            }}
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            fullWidth
            label="E-Posta"
            variant="filled"
            margin="normal"
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#333",
                color: "#FFF",
              },
              "& .MuiInputLabel-root": { color: "#B0B0B0" },
            }}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: "#00FFFF" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              marginTop: "1rem",
              backgroundColor: "#00FFFF",
              color: "#121212",
              fontWeight: "bold",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "#00BFFF",
                boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.8)",
              },
            }}
            type="submit"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
          </Button>
        </Box>
        <Typography
          variant="body2"
          sx={{
            marginTop: "1rem",
            color: "#00FFFF",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={() => navigate("/login")}
        >
          Zaten hesabın var mı? Giriş Yap
        </Typography>
      </Paper>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default Register;
