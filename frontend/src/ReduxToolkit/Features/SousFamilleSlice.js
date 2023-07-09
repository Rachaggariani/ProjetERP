import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchSousfamilles = createAsyncThunk("sousfamille/fetchSousfamilles", async () => {
  const response = await axios.get("http://localhost:5000/api/v1/sousfamille");
  return response.data;
});
export const deleteSousfamilleById = createAsyncThunk(
  "sousfamille/deleteSousfamilleById",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/v1/sousfamille/${id}`
    );
    return response.status;
  }
);
export const addSousfamille = createAsyncThunk("sousfamille/addSousfamille", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/sousfamille",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateSousfamille = createAsyncThunk(
  "sousfamille/updateSousfamille",async(payload)=>{
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/sousfamille/${payload.id}`,payload.sousF);
      console.log("payload from sous famille",payload)
       payload.navigate('/sous_familles');
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }
);
export const SousFamilleSlice = createSlice({
  name: "sousfamille",
  initialState: {
    familles: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSousfamilles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSousfamilles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.familles = action.payload;
      })
      .addCase(fetchSousfamilles.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get sous famille");
        state.error = action.payload;
      })
      .addCase(addSousfamille.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSousfamille.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Sous famille ahoutée avec succée");
        // Remove the deleted sous famille from the sous familles array
      })
      .addCase(addSousfamille.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new sous famille");
        state.error = action.payload;
      }).addCase(updateSousfamille.pending, (state) => {
        state.status = "loading";

      })
      .addCase(updateSousfamille.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Sous famille modifiée avec succée ");
       
      })
      .addCase(updateSousfamille.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteSousfamilleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSousfamilleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Sous famille supprimée avec succée");
        // Remove the deleted sous famille from the sous familles array
      })
      .addCase(deleteSousfamilleById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default SousFamilleSlice.reducer;
