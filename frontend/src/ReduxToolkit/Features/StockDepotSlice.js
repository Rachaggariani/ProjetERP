import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchDepot = createAsyncThunk("depot/fetchDepot", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/stockdepot");
  return response.data;
});
export const deleteDepotById = createAsyncThunk(
  "depot/deleteDepotById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/stockdepot/${id}`
    );
    return response.status;
  }
);
export const addDepot = createAsyncThunk("depot/addDepot", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/stockdepot",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateDepot = createAsyncThunk(
  "depot/updateDepot",async(payload)=>{
    try {
      console.log("from thunk depot update",payload.depot);
      const response = await axios.put(`http://localhost:5000/api/v1/stockdepot/${payload.id}`,payload.depot);
      payload.navigate('/stockdepot');
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const StockDepotSlice = createSlice({
  name: "depot",
  initialState: {
    depots: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDepot.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.depots = action.payload;
      })
      .addCase(fetchDepot.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get depot");
        state.error = action.payload;
      })
      .addCase(addDepot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDepot.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Le produit ajouté avec succès dans la liste.");
        // Remove the deleted depot from the depots array
      })
      .addCase(addDepot.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new depot");
        state.error = action.payload;
      }).addCase(updateDepot.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDepot.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Modification effectuée avec succès.");
      })
      .addCase(updateDepot.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteDepotById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDepotById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Le produit eliminé de la liste avec succée");
        // Remove the deleted depot from the depots array
      })
      .addCase(deleteDepotById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default StockDepotSlice.reducer;
