import React, { useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useGallleryContext } from "../contexts/galleryContext";

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignUpPage = () => {
  const { createUser, alert, openAlert, handleCloseAlert } =
    useGallleryContext();
  let history = useNavigate();
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fullName = fullNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isValidEmail(email)) {
      openAlert("Please enter a valid email", "error");

      return;
    }
    if (fullName.trim().length <= 4) {
      openAlert("Please enter a valid name", "error");

      return;
    }
    if (password.length < 2) {
      openAlert("Please enter a valid password", "error");
    }

    let responce = await createUser(email, password, fullName);
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
        marginY: 15,
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
          id="fullName"
          name="fullName"
          inputRef={fullNameRef}
          sx={{ width: "60%" }}
          label="Full name"
        />
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
          Already registered ?<Link to="/login">sign in</Link>
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

export default SignUpPage;
