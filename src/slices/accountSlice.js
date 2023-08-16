import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchAccounts from "../api/fetchAccounts";
import updateBalance from "../api/updateBalance";
import { enqueueSnackbar } from "notistack";

export const fetchAccountsReducer = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    try {
      const data = await fetchAccounts();
      return data;
    } catch (err) {
      return {
        error: {
          message: "Can't able to fecth details ",
        },
      };
    }
  }
);

export const updateBalanceByBankName = createAsyncThunk(
  "accounts/updateBalanceByBankName",
  async ({ bankName, amount, type }, { dispatch, getState }) => {
    const state = getState();
    const account = state.accounts.data.allAccounts.find(
      (account) => account.bankName === bankName
    );
    let data = null;;
    if (account) {
      if (type === "debit") {
        if (amount > 0)
        {
          try {
           // await updateBalance(account.accountNumber , account.balance + amount);
             data = await updateBalance(account.accountNumber , amount, type);
            console.log("Balance updated successfully!");
          } catch (error) {
            console.error("Failed to update balance:", error);
          }
        }
        else {
          console.log("Enter a valid amount");
        }
      } else if (type === "credit") {
        if (account.balance >= amount && amount >= 0) {
          try {
            data = await updateBalance(account.accountNumber , amount, type);
           // await updateBalance(account.accountNumber , account.balance - amount);
            console.log("Balance updated successfully!");
          } catch (error) {
            console.error("Failed to update balance:", error);
          }
        }
        else {
          console.log("Invalid amount entered");
          enqueueSnackbar("Amount Exceeds balance", {
            variant:'warning'
          })
          throw new Error("Amount Exceeds balance");
        }
      }
    }
    return data;
  }
);


const accountsSlice = createSlice({
  name: "accounts",
  initialState: {
    data: {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      allAccounts: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountsReducer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountsReducer.fulfilled, (state, action) => {
        state.loading = false;
        /**
         * After  successfully fetching the transaction details  we are actually now wnat to reverse all 
         * the transactions so that the newer transactions will be at the top  since the newer transaction
         * will have the id   greater than the older ones 
         * 
         * we are taking the data from action.payload  reverse the allTransaction field of allaccounts
         * and saving them in toSave object 
         */
        let toSave = {...action.payload}
        toSave.allAccounts = [];
        if(action.payload.allAccounts !== undefined || action.payload.allAccounts != null) {
          action.payload.allAccounts.forEach(element => {
            element.allTransactions = element.allTransactions.reverse();
            toSave.allAccounts.push(element);
          });
        }
        else {
          enqueueSnackbar("Something went wrong while fetching accounts details", {
            variant:'error'
          })
        }
        state.data = {
          ...state.data,
          ...toSave
        };
      })
      .addCase(fetchAccountsReducer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateBalanceByBankName.fulfilled , (state ,action) => {
        const { bankName, amount, type } = action.meta.arg;
        const account = state.data.allAccounts.find(
          (account) => account.bankName === bankName
        );
       // console.log(account.allTransactions , action.payload);
        account.allTransactions = action.payload.allTransactions.reverse();
        if (account) {
          if (type === "debit") {
            if (amount > 0) account.balance += amount;
            else {
              console.log("Enter valid amount");
            }
          } else if (type === "credit") {
            if (account.balance >= amount && amount >= 0)
              account.balance -= amount;
            else {
              console.log("Invalid amount entered");
            }
          }
        }
      })
  },
});


export default accountsSlice;