import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addRoleApi } from "../api";
import { toast } from "react-toastify";

export const fetchRoles = createAsyncThunk("role/fetchRoles", async () => {
  try {
    const response = await axios.get("/roles");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const addRole = createAsyncThunk("role/addRole", async (payload) => {
  try {
    const response = await addRoleApi(payload);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ id, role }) => {
    try {
      const response = await axios.put(`/roles/update/${id}`, role);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.error);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/deleteRole",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const RoleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("added");
      })
      .addCase(addRole.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed");
        state.error = action.error.message;
      })
      .addCase(deleteRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("deleted");
      })
      .addCase(deleteRole.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
      })
      .addCase(updateRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("updated");
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      });
  },
});

export default RoleSlice.reducer;
