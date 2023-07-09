import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSociete = createAsyncThunk("societe/fetch", async (id) => {
  const response = await axios.get(`/societe/${id}`);
  return response.data;
});

export const deleteSociete = createAsyncThunk("societe/delete", async (id) => {
  const response = await axios.delete(`/societe/${id}`);
  return id;
});

export const editSociete = createAsyncThunk(
  "societe/edit",
  async ({ id, societe }) => {
    const response = await axios.put(`/societes/update/${id}`, societe);
    return response.data;
  }
);
export const updateSociete = createAsyncThunk(
  "societe/update",
  async ({ id, societe }) => {
    const response = await axios.put(`/societes/update/${id}`, societe);
    return response.data;
  }
);

export const SocieteSlice = createSlice({
  name: "societe",
  initialState: {
    societe: {},
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.societe = action.payload;
      })
      .addCase(fetchSociete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.societe = {};
      })
      .addCase(deleteSociete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(editSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.societe = action.payload;
      })
      .addCase(editSociete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(updateSociete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default SocieteSlice.reducer;
