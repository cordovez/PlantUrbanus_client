import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utilities/hooks";

// GraphQL
import { useMutation } from "@apollo/client";
import { LOGIN_OWNER } from "../../graphql/mutations/ownerMutations";
import { REGISTER_OWNER } from "../../graphql/mutations/ownerMutations";

import { entryForms } from "./styles";

// MUI
import { Box, Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
// import Grid from "@mui/material/Grid";

export default function RegisterForm({ swapFormTo }) {
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    registerOwner();
    swapFormTo("login");
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    password: "",
    confirmPassword: "",
    email: "",
    userName: "",
  });

  const [registerOwner] = useMutation(REGISTER_OWNER, {
    variables: { registerInput: values },
  });

  return (
    <form noValidate autoComplete="off">
      <Box sx={entryForms}>
        <Stack spacing={2}>
          <Typography variant="h3" sx={{ color: "#005048" }}>
            Register
          </Typography>
          <TextField label="userName" name="userName" onChange={onChange} />
          <TextField label="email" name="email" onChange={onChange} />
          <TextField label="password" name="password" onChange={onChange} />
          <TextField
            label="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
          />
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{ backgroundColor: "#005048", color: "white" }}
          >
            Register
          </Button>
          <Box sx={{ marginTop: "20px" }}>
            <Typography variant="p" color="primary">
              already registered?{" "}
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  swapFormTo("login");
                }}
              >
                login
              </Button>
            </Typography>
          </Box>
        </Stack>
        {errors.map(function (error) {
          return (
            <Alert severity="error" key={error}>
              {error.message}
            </Alert>
          );
        })}
      </Box>
    </form>
  );
}
