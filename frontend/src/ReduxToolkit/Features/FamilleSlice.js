import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchFamilles = createAsyncThunk("famille/fetchFamilles", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/famille");
  return response.data;
});
export const deleteFamilleById = createAsyncThunk(
  "famille/deleteFamilleById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/famille/${id}`
    );
    return response.status;
  }
);
export const addFamille = createAsyncThunk("famille/addFamille", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/famille",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateFamille = createAsyncThunk(
  "famille/updateFamille",async(payload)=>{
    try {
      console.log("from thunk famille update",payload.famille);
      const response = await axios.put(`http://localhost:5000/api/v1/famille/${payload.id}`,payload.famille);
      console.log("payload from famille",payload)
      payload.navigate('/familles');
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const FamilleSlice = createSlice({
  name: "famille",
  initialState: {
    familles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFamilles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFamilles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.familles = action.payload;
      })
      .addCase(fetchFamilles.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get famille");
        state.error = action.payload;
      })
      .addCase(addFamille.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFamille.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Famille ajoutée avec succée");
        // Remove the deleted famille from the gammes array
      })
      .addCase(addFamille.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new famille");
        state.error = action.payload;
      }).addCase(updateFamille.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFamille.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Famille modifiée avec succée");
      })
      .addCase(updateFamille.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteFamilleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteFamilleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Famille supprimée avec succée");
        // Remove the deleted famille from the gammes array
      })
      .addCase(deleteFamilleById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default FamilleSlice.reducer;
