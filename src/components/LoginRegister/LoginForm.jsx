import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utilities/hooks";

import { useMutation } from "@apollo/client";

import { LOGIN_OWNER } from "../../graphql/mutations/ownerMutations";

import { entryForms } from "./styles";

// MUI
import {
  TextField,
  Box,
  Stack,
  Alert,
  Button,
  Container,
  Typography,
  Link,
} from "@mui/material";
// import Grid from "@mui/material/Grid";

export default function LoginForm({ swapFormTo }) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginOwner();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginOwner] = useMutation(LOGIN_OWNER, {
    update(proxy, { data: { loginOwner: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <form noValidate autoComplete="off">
      <Box sx={entryForms}>
        <Stack spacing={2} paddingBottom={2}>
          <Typography variant="h3" sx={{ color: "#005048" }}>
            Login
          </Typography>
          <TextField label="email" name="email" onChange={onChange} />
          <TextField label="password" name="password" onChange={onChange} />
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{ backgroundColor: "#005048", color: "white" }}
          >
            Login
          </Button>
          <Typography variant="p" color="primary" sx={{ paddingTop: "20px" }}>
            Not registered?{" "}
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                swapFormTo("register");
              }}
            >
              click here
            </Button>
          </Typography>
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
