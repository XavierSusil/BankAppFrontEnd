import Header from "./Header";
import Admin from "./Admin";
import { Typography, Button, Box, Grid, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./main.module.css";

import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import StyledGrid from "./styles/grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountsReducer } from "../slices/accountSlice";

// exclusive  component styles  for  Home
const StyledPaper = styled(Paper)({
  paddingTop: "1rem",
  paddingBottom: "1rem",

  "&:hover": {
    cursor: "pointer",
  },
});

const BankDisplayGrid = styled(Grid)(() => ({
  padding: "1rem",
  borderRadius: "1rem",
}));

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.white || "white",
  width: "90%",
  borderRadius: "1rem",
  padding: "1rem",
}));

const Buttons = ({ login }) => {
  const buttonStyle = {
    marginLeft: "1vw",
  };

  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleSignupClick = () => {
    window.location.href = "/signup";
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {login ? (
        <Button variant="text" style={buttonStyle} onClick={handleLogoutClick}>
          {" "}
          Logout{" "}
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            style={buttonStyle}
            onClick={handleLoginClick}
          >
            Login
          </Button>

          <Button
            variant="contained"
            style={buttonStyle}
            onClick={handleSignupClick}
          >
            Signup
          </Button>
        </>
      )}
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accounts, setAccounts] = useState([]);

  let accountsStore = useSelector((state) => state.accounts.data.allAccounts);

  const initial = () => {
    return (
      localStorage.getItem("firstName") !== null &&
      localStorage.getItem("firstName") !== ""
    );
  };

  // must be below initial so that usestate   can use it
  const [login, setLogin] = useState(initial());

  const handleCreateAccountButtonClick = () => {
    navigate("/newAccount");
  };

  const handleAccountClick = (event) => {
    localStorage.setItem("bankName", event.target.textContent);
    navigate(`/account/${event.target.textContent}`);
  };

  useEffect(() => {
    if (login) dispatch(fetchAccountsReducer());
  }, []);

  useEffect(() => {
    if (!login) return;
    setAccounts(accountsStore.map((data) => data.bankName));
  }, [accountsStore]);

  return (
    <Box>
      {login ? (
        <Header
          buttons={<Buttons login />}
          username={localStorage.getItem("firstName")}
        />
      ) : (
        <Header buttons={<Buttons />} />
      )}
      <Box
        color="custom.white"
        bgcolor="primary.main"
        className={`${styles.pageBody} ${styles.app} ${styles.page}`}
      >
        <Typography variant="h3"> BANKING SYSTEM</Typography>
        {!login ? (
          <Typography variant="h4">Login to view your Accounts..</Typography>
        ) : localStorage.getItem("firstName") === "admin" ? (
          <Admin />
        ) : (
          <>
            <StyledGrid container spacing={2}>
              <BankDisplayGrid item xs={6} bgcolor="custom.white">
                <Typography variant="h4" color="primary.dark">
                  YOUR ACCOUNTS
                </Typography>
                <Grid container spacing={2}>
                  {accounts.map((ele, ind) => (
                    <Grid item xs={6} key={ind}>
                      <StyledPaper elevation={12} onClick={handleAccountClick}>
                        <Typography color="custom.white">{ele}</Typography>
                      </StyledPaper>
                    </Grid>
                  ))}
                </Grid>
              </BankDisplayGrid>

              <Grid item xs={6} bgcolor="primary.main">
                <StyledButtonContainer>
                  <Button
                    variant="contained"
                    sx={{
                      maxHeight: "30%",
                      width: "70%",
                      height: "auto",
                    }}
                    onClick={handleCreateAccountButtonClick}
                  >
                    Create Account
                  </Button>
                </StyledButtonContainer>
              </Grid>
            </StyledGrid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
