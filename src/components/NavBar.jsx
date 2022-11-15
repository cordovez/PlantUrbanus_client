import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  // console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              ReactLogin
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <>
                <Button
                  onClick={onLogout}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
