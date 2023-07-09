import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchstocks = createAsyncThunk("stock/fetchstocks", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/detailsCamion");
  return response.data;
});

export const StocksSlice = createSlice({
  name: "stock",
  initialState: {
    stocks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchstocks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchstocks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = action.payload;
      })
      .addCase(fetchstocks.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get stock details ");
        state.error = action.payload;
      })
  },
});

export default StocksSlice.reducer;
