import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utilities/hooks";

import { useMutation } from "@apollo/client";

import { LOGIN_OWNER } from "../graphql/mutations/ownerMutations";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";

export default function Login() {
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
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>This is the login page, login below to create an account</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="email" name="email" onChange={onChange} />
        <TextField label="password" name="password" onChange={onChange} />
      </Stack>
      {errors.map(function (error) {
        return (
          <Alert severity="error" key={error}>
            {error.message}
          </Alert>
        );
      })}
      <Button variant="contained" onClick={onSubmit}>
        Log In
      </Button>
    </Container>
  );
}
