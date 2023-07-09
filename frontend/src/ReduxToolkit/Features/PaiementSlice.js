import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchPaiment = createAsyncThunk("paiement/fetchPaiment", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/paiements");
  return response.data;
});
export const addPaiment = createAsyncThunk("paiement/addPaiment", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/paiements",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const PaiementSlice = createSlice({
  name: "paiement",
  initialState: {
    paiements: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaiment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaiment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = action.payload;
      })
      .addCase(fetchPaiment.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get paiement details ");
        state.error = action.payload;
      })
  },
});

export default PaiementSlice.reducer;
