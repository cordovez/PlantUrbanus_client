// reason for importing as component: https://bobbyhadz.com/blog/react-change-color-of-svg
import { ReactComponent as PlantUrbanusLogo } from "../assets/img/PlantUrbanusLogo_white.svg";

import BackgroundImage from "../assets/img/teemu-paananen-OOE4xAnBhKo-unsplash.jpg";

import RegisterForm from "../components/LoginRegister/RegisterForm";
import LoginForm from "../components/LoginRegister/LoginForm";
// MUI
import { Box, Container } from "@mui/material";
import { useState } from "react";

export default function Login() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: "cover",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Box sx={{ marginTop: "10%" }}>
          <PlantUrbanusLogo
            fill="none"
            style={{
              maxWidth: "400px",
              height: "100%",
            }}
          />
        </Box>
        {currentForm === "login" ? (
          <LoginForm swapFormTo={toggleForm} />
        ) : (
          <RegisterForm swapFormTo={toggleForm} />
        )}
      </Container>
    </>
  );
}
