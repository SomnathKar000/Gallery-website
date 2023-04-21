import React, { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGallleryContext } from "../contexts/galleryContext";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const LoginPage = () => {
  const { loginUser, alert, openAlert, handleCloseAlert } =
    useGallleryContext();
  let history = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!isValidEmail(email)) {
      openAlert("Please enter a valid email", "error");
      return;
    }
    if (password.length < 2) {
      openAlert("Please enter a valid password", "error");
    }

    let responce = await loginUser(email, password);
    if (responce) {
      history("/");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history("/");
    }
  }, []);

  return (
    <Box
      sx={{
        marginY: 20,
      }}
    >
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <TextField
          id="email"
          name="email"
          inputRef={emailRef}
          sx={{ width: "60%" }}
          label="Email"
        />
        <TextField
          id="password"
          name="password"
          inputRef={passwordRef}
          sx={{ width: "60%" }}
          label="Password"
        />
        <Button type="submit" variant="contained" sx={{ width: "60%" }}>
          Submit
        </Button>
        <Typography varient="p">
          Don't have an account?<Link to="/sign-up">sign up</Link>
        </Typography>
      </FormControl>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          sx={{ width: "100%" }}
        >
          {alert.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
