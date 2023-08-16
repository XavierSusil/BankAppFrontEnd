import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchBanks from "../api/fetchBanks";

export const fetchBanksReducer = createAsyncThunk(
  "banks/fetchBanks",
  async () => {
    try {
      const data = await fetchBanks();
      return data;
    } catch (err) {
      return {
        error: {
          message: err,
        },
      };
    }
  }
);

const banksSlice = createSlice({
  name: "banks",
  initialState: {
    allBanks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanksReducer.pending, (state) => {
        state.loading = true;
        state.allBanks = [];
      })
      .addCase(fetchBanksReducer.fulfilled, (state, action) => {
        state.loading = false;
        state.allBanks = action.payload;
        state.error = null;
      })
      .addCase(fetchBanksReducer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          error: {
            message: "error  occur while fetching banks details",
          },
        };
      });
  },
});

export default banksSlice;