import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanksReducer } from "../slices/banksSlice";
import { useNavigate } from "react-router";

const StyledTableContainer = styled(TableContainer)({
  width: "80%",
  margin: "auto",
  backgroundColor: "#ffffff",
});

const StyledTableRow = styled(TableRow)({
  height: "10vh",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
});

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banksStore = useSelector((state) => state.banks.allBanks);
  const [banks, setBanks] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleAddBankClick = () => {
    navigate("/newBank")
  }

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchBanksReducer());
  }, []);

  useEffect(() => {
    const data = banksStore.map((x) => ({
      name: x.name,
      accounts: x.accounts.length,
    }));
    setBanks(data);
  }, [banksStore]);

  return (
    <>
      <Box>
        <Typography variant="h4">ADMIN</Typography>

        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <Box
                bgcolor="custom.white"
                sx={{
                  marginY: "25%",
                  padding: "1rem",
                  borderRadius: "2rem",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    width: "60%",
                    borderRadius: "1rem",
                  }}
                  onClick={handleAddBankClick}
                >
                  Add Bank
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              sx={{
                paddingX: "2rem",
              }}
            >
              <Typography variant="h5"> ALL BANKS</Typography>
              <StyledTableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell align="left">INDEX</StyledTableCell>
                      <StyledTableCell align="center">BANK</StyledTableCell>
                      <StyledTableCell align="center">ACCOUNTS</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {banks
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((ele, ind) => (
                        <TableRow key={ind}>
                          <TableCell align="left">{ind + 1}</TableCell>
                          <TableCell align="center">{ele.name}</TableCell>
                          <TableCell align="center">{ele.accounts}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[5, 10]}
                  count={banks.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              </StyledTableContainer>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
