import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCMD = createAsyncThunk("CMD/fetchCMD", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/commande");
  console.log("cmd",response.data);
  return response.data;
});

export const addCMD= createAsyncThunk("CMD/addCMD", async (payload) => {
  try {
    console.log("redux payload verifie ",payload);
    const response = await axios.post(
      "http://localhost:5000/api/v1/commande",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteCMDById = createAsyncThunk(
  "CMD/deleteCMDById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/commande/${id}`
    );
    return response.status;
  }
);
export const AccepterCMD = createAsyncThunk(
  "CMD/AccepterCMD",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/commande/${id}`
    );
    return response.status;
  }
);
export const CommandeSlice = createSlice({
  name: "CMD",
  initialState: {
    commandes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCMD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCMD.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.commandes = action.payload;
      })
      .addCase(fetchCMD.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get commande");
        state.error = action.payload;
      })
      .addCase(addCMD.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCMD.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Commande ajoutée avec succés");
      })
      .addCase(addCMD.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new commande");
        state.error = action.payload;
      })
    .addCase(deleteCMDById.pending, (state) => {
      state.status = "loading";
    })
    .addCase(deleteCMDById.fulfilled, (state, action) => {
      state.status = "succeeded";
      toast.success("Commande supprimée avec succés");
      // Remove the deleted CMD from the commandes array
    })
    .addCase(deleteCMDById.rejected, (state, action) => {
      state.status = "failed";
      toast.error("failed to delete");
      state.error = action.payload;
    })
    .addCase(AccepterCMD.fulfilled, (state, action) => {
      state.status = "succeeded";
      toast.success("Commande envoyée au commercial ");
      // Remove the deleted CMD from the commandes array
    })
    .addCase(AccepterCMD.rejected, (state, action) => {
      state.status = "failed";
      toast.error("failed to accepte");
      state.error = action.payload;
    });
  },
});

export default CommandeSlice.reducer;
