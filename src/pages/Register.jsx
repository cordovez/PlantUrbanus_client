import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

import { useForm } from "../utilities/hooks";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";

import { useMutation } from "@apollo/client";

import { REGISTER_OWNER } from "../graphql/mutations/ownerMutations";

export default function Register() {
  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    console.log("callback hit");
    registerOwner();
  }

  const [registerOwner] = useMutation(REGISTER_OWNER, {
    update(proxy, { data: { registerOwner: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <p>This is the register page, register below to create an account</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="userName" name="userName" onChange={onChange} />
        <TextField label="email" name="email" onChange={onChange} />
        <TextField label="password" name="password" onChange={onChange} />
        <TextField
          label="confirmPassword"
          name="confirmPassword"
          onChange={onChange}
        />
      </Stack>
      {errors.map(function (error) {
        return (
          <Alert severity="error" key={error}>
            {error.message}
          </Alert>
        );
      })}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
}
