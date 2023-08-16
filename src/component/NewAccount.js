/**
 * This is a component  which is  used to  create  a   new account of a user who's currently login
 * this  provides a form to create the account
 * Fields in the form
 *   -> bank (select)
 *   -> balance (number)
 *   rest of the data from localStorage
 */

import { useNavigate } from "react-router";
import styles from "./main.module.css";

import {
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import Header from "./Header";
import endpoint from "../endPointConfig";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import StyledForm from "./styles/form";

const Main = () => {
  const [selectedBank, selectBank] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [allBanks, setAllBanks] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    selectBank(event.target.value);
  };

  const handleBalanceChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmitClick = async () => {
    const customerId = localStorage.getItem("customerId");
    const url = `${endpoint}/account/${customerId}/${selectedBank}?balance=${amount}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        enqueueSnackbar("Account created successfully", {
          variant: "success",
        });
        navigate("/");
      } else {
        enqueueSnackbar("Account can't be created", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Can't able to create a new account ", {
        variant: "error",
      });
    }
  };

  const fetchBanks = async () => {
    const url = endpoint + "/banks";
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setAllBanks(data.map((res) => res.name));
      } else {
        enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      }
    } catch (err) {
      enqueueSnackbar("Cannot able to fetch banks", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  return (
    <>
      <StyledForm>
        <Typography variant="h4" color="primary.main">
          NEW ACCOUNT
        </Typography>
        <Box component="form" sx={{ width: "80%" }}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="select-label">Bank</InputLabel>
            <Select
              labelId="select-label"
              label="Bank"
              required
              onChange={handleSelectChange}
            >
              {allBanks.map((res) => (
                <MenuItem value={res}> {res}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a Bank</FormHelperText>
          </FormControl>
          <TextField
            type="Number"
            label="Intial Balance"
            helperText="Enter your account balance"
            onChange={handleBalanceChange}
            required
            sx={{ width: "100%" }}
          />
          <Button
            variant="contained"
            sx={{ minWidth: "40%" }}
            onClick={handleSubmitClick}
          >
            SUBMIT
          </Button>
        </Box>
      </StyledForm>
    </>
  );
};

const NewAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header
        buttons={
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        }
        username={localStorage.getItem("firstName")}
      />

      <Box
        bgcolor="primary.main"
        className={`${styles.pageBody} ${styles.app} ${styles.page}`}
      >
        <Main />
      </Box>
    </>
  );
};

export default NewAccount;
