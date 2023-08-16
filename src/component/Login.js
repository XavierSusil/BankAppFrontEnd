import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "./Header";

import styles from "./main.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import endpoint from "../endPointConfig";
import { useSnackbar } from "notistack";
import StyledForm from "./styles/form";

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ backgroundColor: "inherit", color: "red", padding: "10px" }}>
      <span>{message}</span>
    </div>
  );
};

const Main = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const errorMessage = "Email or password is incorrect .";

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const username="user";
    const authorizationPassword="124aafcc-e13f-49a3-8ce6-f3a8572757f4"

  const headers = new Headers();
  headers.append('Authorization', `Basic ${btoa(`${username}:${authorizationPassword}`)}`);
  headers.append('Content-Type','application/json');

    try {
      const url =
        endpoint + "/customer/login?email=" + email + "&password=" + password;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("customerId", data.id);
        localStorage.setItem("customerEmail", data.email);
        localStorage.setItem("customerPassword", data.password);

        enqueueSnackbar("Customer Logged in  Successfully", {
          variant: "success",
        });
        navigate("/");
      } else {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
      }
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <StyledForm>
        <Typography variant="h4" color="primary.main">
          {" "}
          LOGIN
        </Typography>

        <form onSubmit={handleSubmitClick} style={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextField
              name="email"
              helperText="Enter your email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              fullWidth
              required
            />
            <TextField
              name="password"
              type="password"
              label="Password"
              helperText="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              required
            />
            {error && <ErrorMessage message={errorMessage} />}
            <Button variant="contained" type="submit" sx={{ width: "60%" }}>
              {" "}
              submit
            </Button>
          </Box>
        </form>
      </StyledForm>
    </>
  );
};

const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        buttons={
          <Button variant="outlined" onClick={() => navigate(-1)}>
            {" "}
            Back
          </Button>
        }
      />

      <Box
        bgcolor="primary.main"
        className={`${styles.pageBody} ${styles.page}`}
      >
        <Main />
      </Box>
    </>
  );
};

export default Login;
