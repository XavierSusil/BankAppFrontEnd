import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";

import styles from "./main.module.css";
import endpoint from "../endPointConfig";
import StyledForm from "./styles/form";

const ErrorMessage = ({ message }) => {
  return (
    <div style={{ backgroundColor: "inherit", color: "red", padding: "10px" }}>
      <span>{message}</span>
    </div>
  );
};

const Main = () => {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [obj, setObj] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorObj, setErrorObj] = useState({
    status: false,
    message: "",
  });

  const handleObjChange = (event) => {
    const { name, value } = event.target;

    setObj((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    console.log(obj);
    if (obj.password !== obj.confirmPassword) {
      setErrorObj({
        status: true,
        message: "Password and confirm Password must be same",
      });
      return;
    }

    const url =
      endpoint +
      "/customer/signup?firstName=" +
      obj.firstName +
      "&lastName=" +
      obj.lastName +
      "&email=" +
      obj.email +
      "&password=" +
      obj.password;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("firstName", data.firstName);
        localStorage.setItem("customerId", data.id);
        localStorage.setItem("customerEmail", data.email);
        localStorage.setItem("customerPassword", data.password);

        enqueueSnackbar("Customer created Successfully", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar("Customer Signup failed", {
          variant: "error",
        });
      }
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Customer Signup failed", {
        variant: "error",
      });
    }

    //navigate("/");
  };

  return (
    <>
      <StyledForm>
        <Typography variant="h4" color="primary.main">
          SIGNUP
        </Typography>

        <form onSubmit={handleSubmitClick} style={{ width: "90%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              alignItems: "center",
            }}
          >
            <TextField
              name="firstName"
              label="Name"
              value={obj.firstName}
              onChange={handleObjChange}
              fullWidth
              required
            />
            <TextField
              name="lastName"
              label="Surname"
              value={obj.lastName}
              onChange={handleObjChange}
              fullWidth
              required
            />
            <TextField
              name="email"
              label="email"
              value={obj.email}
              onChange={handleObjChange}
              fullWidth
              required
            />
            <TextField
              name="password"
              type="password"
              label="password"
              value={obj.password}
              onChange={handleObjChange}
              fullWidth
              required
            />
            <TextField
              name="confirmPassword"
              type="password"
              label="confirm password"
              value={obj.confirmPassword}
              onChange={handleObjChange}
              fullWidth
              required
            />

            {errorObj.status && <ErrorMessage message={errorObj.message} />}
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

const Signup = () => {
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

export default Signup;
