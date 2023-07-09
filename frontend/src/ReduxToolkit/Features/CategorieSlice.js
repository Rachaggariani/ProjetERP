import { createSlice  } from "@reduxjs/toolkit";
import axios from "axios";

export const CategorieSlice = createSlice({
  name: "categorie",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
    
  },
  reducers: {
    setCategoriesPending: (state) => {
      state.status = "loading";
    },
    setCategoriesSuccess: (state, action) => {
      state.status = "succeeded";
      state.categories = action.payload;
    },
    setCategoriesFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteCategorie: (state, action) => {
      const id = action.payload;
      axios.delete(`/categories/${id}`).then((res) => {
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
    addCategorie: (state, action) => {
      axios.post("/categories/add", action.payload).then((res) => {
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
    updateCategorie: (state, action) => {
      const {id, categorie} = action.payload;
      axios.put(`/categories/update/${id}`, categorie).then((res) => {
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

export const {setCategoriesPending, setCategoriesSuccess, setCategoriesFailed, deleteCategorie, addCategorie, updateCategorie} = CategorieSlice.actions;

export default CategorieSlice.reducer;
