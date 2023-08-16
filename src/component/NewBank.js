import styles from "./main.module.css";
import Header from "./Header";
import { useNavigate } from "react-router";

import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledBox } from "./styles/form";
import { useState } from "react";
import createBank from "../api/createBank";

const Main = () => {
  const [id, setId] = useState("");
  const [bankName, setBankName] = useState("");
  
  const handlebutonClick = () => {
    console.log(id , bankName);
    createBank(id,bankName);
  }
  return (
    <>
      <StyledBox
        sx={{
          width: "60%",
          gap:2
        }}
      >
        <Typography> NEW BANK</Typography>
        <TextField
          label="Id"
          type="number"
          value={id}
          onChange={(event) => setId(event.target.value)}
          required
        />
        <TextField
          label="Bank Name"
          type="text"
          value={bankName}
          onChange={(event) => setBankName(event.target.value)}
          required
        />
        <Button variant="contained" 
        onClick={handlebutonClick}
        sx={{ maxWidth: "50%" }}>
          SUBMIT
        </Button>
      </StyledBox>
    </>
  );
};

const NewBank = () => {
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

export default NewBank;
