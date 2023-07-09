import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCamion = createAsyncThunk("camion/fetchCamion", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/stockcamion");
  return response.data;
});
export const deleteCamionById = createAsyncThunk(
  "camion/deleteCamionById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/stockcamion/${id}`
    );
    return response.status;
  }
);
export const addCamion = createAsyncThunk("camion/addCamion", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/stockcamion",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateCamion = createAsyncThunk(
  "camion/updateCamion",async(payload)=>{
    try {
      console.log("from thunk camion update",payload.camion);
      const response = await axios.put(`http://localhost:5000/api/v1/stockcamion/${payload.id}`,payload.camion)
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const CamionStockSlice = createSlice({
  name: "camion",
  initialState: {
    camions: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCamion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.camions = action.payload;
      })
      .addCase(fetchCamion.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get camion");
        state.error = action.payload;
      })
      .addCase(addCamion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCamion.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Camion Ajouté avec succée");
        // Remove the deleted camion from the camions array
      })
      .addCase(addCamion.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new camion");
        state.error = action.payload;
      }).addCase(updateCamion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCamion.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Camion modifié avec succées");
      })
      .addCase(updateCamion.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteCamionById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCamionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Camion supprimé avec succée");
        // Remove the deleted camion from the camions array
      })
      .addCase(deleteCamionById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default CamionStockSlice.reducer;
