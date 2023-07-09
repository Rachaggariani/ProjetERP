import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchBL = createAsyncThunk("BL/fetchBL", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/BL");
  console.log("blllllllllll",response.data);
  return response.data;
});

export const addBL = createAsyncThunk("BL/addBL", async (payload) => {
  try {
    console.log("redux payload verifie ",payload);
    const response = await axios.post(
      "http://localhost:5000/api/v1/BL",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteBLById = createAsyncThunk(
  "BL/deleteBLById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/BL/${id}`
    );
    return response.status;
  }
);
export const BlSlice = createSlice({
  name: "BL",
  initialState: {
    bondelivs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBL.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBL.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bondelivs = action.payload;
      })
      .addCase(fetchBL.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get bl");
        state.error = action.payload;
      })
      .addCase(addBL.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBL.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("BL ajouté avec succés");
      })
      .addCase(addBL.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new BL");
        state.error = action.payload;
      })
    .addCase(deleteBLById.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteBLById.fulfilled, (state, action) => {
      state.status = "succeeded";
      toast.success("Suppression BL avec succés");
      // Remove the deleted BL from the BLS array
    })
    .addCase(deleteBLById.rejected, (state, action) => {
      state.status = "failed";
      toast.error("failed to delete");
      state.error = action.payload;
    });
  },
});

export default BlSlice.reducer;
