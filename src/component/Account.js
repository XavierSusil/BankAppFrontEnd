/**
 * This is  a  component which displays the current account selected
 *
 */

import { useNavigate, useParams } from "react-router";
import styles from "./main.module.css";
import {
  Button,
  Box,
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Input,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { StyledBox } from "./styles/form";
import { useState } from "react";
import { updateBalanceByBankName } from "../slices/accountSlice";

const Posting = ({ transaction, bankName }) => {
  const [amount, setAmount] = useState("");

  const dispatch = useDispatch();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleAmountClick = (event) => {
    if (amount === 0) return;
    const payload = {
      //bankName , amount, type
      type: transaction,
      amount: parseInt(amount),
      bankName: bankName,
    };
    setAmount(0);

    dispatch(updateBalanceByBankName(payload));
  };

  return (
    <FormControl
      sx={{
        "& > *": {
          marginBottom: "16px",
        },
      }}
    >
      <InputLabel htmlFor="input-amount"> Amount</InputLabel>
      <Input
        type="number"
        id="input-amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <Button variant="contained" onClick={handleAmountClick}>
        {transaction}
      </Button>
    </FormControl>
  );
};

const Main = ({ bankName }) => {
  const accountDetails = useSelector((state) =>
    state.accounts.data.allAccounts.find(
      (account) => account.bankName === bankName
    )
  );

  const [showBalance, setShowBalance] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onShowBalanceClick = () => {
    setShowBalance(true);
    setTimeout(() => {
      setShowBalance(false);
    }, 3000);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3} bgcolor="primary.light" color="custom.white">
          <Box
            sx={{
              height: "100vh",
            }}
          >
            {accountDetails ? (
              <StyledBox color="black">
                <Typography fontWeight="bold"> Account Info</Typography>
                <Typography>
                  Account Number : {accountDetails.accountNumber}
                </Typography>
                <Typography>Bank Name : {bankName}</Typography>
                <Paper
                  elevation={12}
                  sx={{ padding: "1rem" }}
                  onClick={onShowBalanceClick}
                >
                  {showBalance ? (
                    <Box color="custom.white">
                      <Typography> Balance</Typography>
                      <Typography> {accountDetails.balance}</Typography>
                    </Box>
                  ) : (
                    <Typography color="custom.white">Show Balance</Typography>
                  )}
                </Paper>
              </StyledBox>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
        <Grid item xs={9} color="custom.white" bgcolor="primary.dark">
          <Grid container direction="column" spacing={6}>
            <Grid item xs={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <StyledBox>
                    <Typography component="h1"> CREDIT</Typography>
                    <Posting transaction="credit" bankName={bankName} />
                  </StyledBox>
                </Grid>
                <Grid item xs={6}>
                  <StyledBox>
                    <Typography component="h1"> DEBIT</Typography>
                    <Posting transaction="debit" bankName={bankName} />
                  </StyledBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography component="h1">TRANSACTION HISTORY</Typography>
              <TableContainer component={StyledBox}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>AMOUNT</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>TYPE</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>DATE</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>TIME</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {accountDetails.allTransactions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((data, ind) => (
                        <TableRow key={ind}>
                          <TableCell>{data.id}</TableCell>
                          <TableCell>{data.amount}</TableCell>
                          <TableCell>{data.type}</TableCell>
                          <TableCell>
                            {new Date(data.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(data.date).toLocaleTimeString()}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10]}
                  count={accountDetails.allTransactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                  sx ={{marginTop:'1rem'}}
                />
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

const Account = () => {
  const { bankName } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    localStorage.removeItem("bankName");
    navigate(-1);
  };

  return (
    <>
      <Header
        buttons={
          <Button variant="outlined" onClick={handleBackClick}>
            {" "}
            Back
          </Button>
        }
        username={localStorage.getItem("firstName")}
      />

      <Box
        bgcolor="primary.main"
        className={`${styles.pageBody} ${styles.app} ${styles.page}`}
      >
        <Main bankName={bankName} />
      </Box>
    </>
  );
};

export default Account;
