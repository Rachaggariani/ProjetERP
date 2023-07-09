import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchGammes = createAsyncThunk("gamme/fetchGammes", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/gamme");
  return response.data;
});
export const deleteGammeById = createAsyncThunk(
  "gamme/deleteGammeById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/gamme/${id}`
    );
    return response.status;
  }
);
export const addGamme = createAsyncThunk("gamme/addGamme", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/gamme",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateGamme = createAsyncThunk(
  "gamme/updateGamme",async(payload)=>{
    try {
      console.log("from thunk gamme update",payload.gamme);
      const response = await axios.put(`http://localhost:5000/api/v1/gamme/${payload.id}`,payload.gamme)
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const GammeSlice = createSlice({
  name: "gamme",
  initialState: {
    gammes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGammes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGammes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gammes = action.payload;
      })
      .addCase(fetchGammes.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get gamme");
        state.error = action.payload;
      })
      .addCase(addGamme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addGamme.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Gamme ajoutée avec succée");
        // Remove the deleted gamme from the gammes array
      })
      .addCase(addGamme.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new gamme");
        state.error = action.payload;
      }).addCase(updateGamme.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateGamme.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Gamme modifier avec succée");
      })
      .addCase(updateGamme.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteGammeById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteGammeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Gamme supprimée avec succée");
        // Remove the deleted gamme from the gammes array
      })
      .addCase(deleteGammeById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default GammeSlice.reducer;
