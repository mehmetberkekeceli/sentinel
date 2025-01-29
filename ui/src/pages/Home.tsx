import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import { Button, Container, Typography, Box } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Container>
      <Box textAlign="center" mt={5}>
        <Typography variant="h3">Welcome to the Home Page!</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginTop: "20px" }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
