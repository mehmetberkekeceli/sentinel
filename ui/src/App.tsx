import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { RootState } from "./redux/store";
import { useEffect } from "react";

// Sayfalar
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import Profile from "./pages/Profile";
import Unauthorized from "./pages/Unauthorized";

// Ortak bileşenler
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Özel Route - Giriş yapılmış kullanıcı için
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return token ? children : <Navigate to="/login" />;
};

// Özel Route - Sadece Admin kullanıcılar için
const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  return token && user?.role === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/unauthorized" />
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRoutes />
        <Footer />
      </Router>
    </Provider>
  );
}

// Route yapıları
const AppRoutes = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && window.location.pathname === "/") {
      navigate("/home");
    }
  }, [token, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/logs"
        element={
          <AdminRoute>
            <Logs />
          </AdminRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
    </Routes>
  );
};

export default App;
