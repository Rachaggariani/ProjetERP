import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchSousSocietes = createAsyncThunk(
  "sousSociete/fetchSousSocietes",
  async () => {
    const response = await axios.get("/sousSocietes");
    return response.data;
  }
);

export const deleteSousSociete = createAsyncThunk(
  "sousSociete/deleteSousSociete",
  async (id) => {
    const response = await axios.delete(`/sousSocietes/${id}`);
    return response.data;
  }
);

export const addSousSociete = createAsyncThunk(
  "sousSociete/addSousSociete",
  async (sousSociete) => {
    const response = await axios.post("/sousSocietes/add", sousSociete);
    return response.data;
  }
);

export const updateSousSociete = createAsyncThunk(
  "sousSociete/updateSousSociete",
  async ({ id, sousSociete }) => {
    const response = await axios.put(`/sousSocietes/update/${id}`, sousSociete);
    return response.data;
  }
);

export const SousSocieteSlice = createSlice({
  name: "sousSociete",
  initialState: {
    sousSocietes: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setSousSocietesPending: (state) => {
      state.status = "loading";
    },
    setSousSocietesSuccess: (state, action) => {
      state.status = "succeeded";
      state.roles = action.payload;
    },
    setSousSocietesFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteSousSociete: (state, action) => {
      const id = action.payload;
      axios
        .delete(`/sousSocietes/${id}`)
        .then((res) => {
          if (res.status === 200) {
            state.status = "succeeded";
          } else {
            state.status = "failed";
          }
        })
        .catch((error) => {
          state.status = "failed";
          state.error = error.message;
        });
    },
    addSousSociete: (state, action) => {
      axios
        .post("/sousSocietes/add", action.payload)
        .then((res) => {
          if (res.status === 200) {
            state.status = "succeeded";
          } else {
            state.status = "failed";
          }
        })
        .catch((error) => {
          state.status = "failed";
          state.error = error.message;
        });
    },
    updateSousSociete: (state, action) => {
      const { id, sousSociete } = action.payload;
      axios
        .put(`/sousSocietes/update/${id}`, sousSociete)
        .then((res) => {
          if (res.status === 200) {
            state.status = "succeeded";
          } else {
            state.status = "failed";
          }
        })
        .catch((error) => {
          state.status = "failed";
          state.error = error.message;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSousSocietes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSousSocietes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sousSocietes = action.payload;

      })
      .addCase(fetchSousSocietes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteSousSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSousSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("deleted");
      })
      .addCase(deleteSousSociete.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");

        state.error = action.error.message;
      })
      .addCase(addSousSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSousSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("added");
      })
      .addCase(addSousSociete.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add");

        state.error = action.error.message;
      })
      .addCase(updateSousSociete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSousSociete.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("updated");
      })
      .addCase(updateSousSociete.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");

        state.error = action.error.message;
      });
  },
});

export default SousSocieteSlice.reducer;
