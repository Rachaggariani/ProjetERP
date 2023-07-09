import { createSlice  } from "@reduxjs/toolkit";
import axios from "axios";

export const ActiviteSlice = createSlice({
  name: "activite",
  initialState: {
    activites: [],
    error: null,
    status: "idle",
  },
  reducers: {
    setActivitesPending: (state) => {
      state.status = "loading";
    },
    setActivitesSuccess: (state, action) => {
      state.status = "succeeded";
      state.activites = action.payload;
    },
    setActivitesFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteActivite: (state, action) => {
      const id = action.payload;
      axios.delete(`/activites/${id}`).then((res) => {
        if (res.status === 200) {
          state.status = "succeeded";
        } else {
          state.status = "failed";
        }
      }).catch((error) => {
        state.status = "failed";
        state.error = error.message;
      });
    },
    addActivite: (state, action) => {
      axios.post("/activites/add", action.payload).then((res) => {
        if (res.status === 200) {
          state.status = "succeeded";
        } else {
          state.status = "failed";
        }
      }).catch((error) => {
        state.status = "failed";
        state.error = error.message;
      });
    },
    updateActivite: (state, action) => {
      const {id, activite} = action.payload;
      axios.put(`/activites/update/${id}`, activite).then((res) => {
        if (res.status === 200) {
          state.status = "succeeded";
        } else {
          state.status = "failed";
        }
      }).catch((error) => {
        state.status = "failed";
        state.error = error.message;
      });
    },
  },
 
});

export const {setActivitesPending, setActivitesSuccess, setActivitesFailed, deleteActivite, addActivite, updateActivite} = ActiviteSlice.actions;

export default ActiviteSlice.reducer;
