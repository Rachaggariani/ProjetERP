import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchMarques = createAsyncThunk("marque/fetchMarques", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/marque");
  return response.data;
});
export const deleteMarqueById = createAsyncThunk(
  "marque/deletMarqueById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/marque/${id}`
    );
    return response.status;
  }
);
export const addMarque = createAsyncThunk("marque/addMarque", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/marque",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateMarque = createAsyncThunk(
  "Marque/updateMarque",async(payload)=>{
    try {
      console.log("from thunk marque update",payload.marque);
      const response = await axios.put(`http://localhost:5000/api/v1/marque/${payload.id}`,payload.marque)
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const MarqueSlice = createSlice({
  name: "marque",
  initialState: {
    marques: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarques.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMarques.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.marques = action.payload;
      })
      .addCase(fetchMarques.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get marque");
        state.error = action.payload;
      })
      .addCase(addMarque.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMarque.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Marque ajoutée avec succée");
        // Remove the deleted marque from the gammes array
      })
      .addCase(addMarque.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new marque");
        state.error = action.payload;
      }).addCase(updateMarque.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMarque.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Marque modifiée avec succée");
      })
      .addCase(updateMarque.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteMarqueById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMarqueById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Marque supprimée avec succée");
        // Remove the deleted marque from the marques array
      })
      .addCase(deleteMarqueById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default MarqueSlice.reducer;
