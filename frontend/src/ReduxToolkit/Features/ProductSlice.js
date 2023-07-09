import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk("produit/fetchProducts", async () => {
  const response = await axios.get('http://localhost:5000/api/v1/produit');
  return response.data;
});
export const deleteProdById = createAsyncThunk(
  "produit/deleteProdById",
  async (id) => {
    const response = await axios.delete(
        `http://localhost:5000/api/v1/produit/${id}`
    );
    return response.status;
  }
);
export const addProd = createAsyncThunk("produit/addProd", async (payload) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/produit",
      payload
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateProd = createAsyncThunk(
  "produit/updateProd",async(payload)=>{
    try {
      console.log("from thunk produit update",payload);
      const response = await axios.put(`http://localhost:5000/api/v1/produit/${payload.id}`,payload.produit);
      payload.navigate('/Produits');
      return response.data;
    } catch (error) {
    console.log(error);
  }
  }

);
export const ProductSlice = createSlice({
  name: "produit",
  initialState: {
    produits: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.produits = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get product");
        state.error = action.payload;
      })
      .addCase(addProd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProd.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Produit ajouté avec succée");
        // Remove the deleted product from the products array
      })
      .addCase(addProd.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new product");
        state.error = action.payload;
      }).addCase(updateProd.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProd.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Produit modifié avec succée");
      })
      .addCase(updateProd.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to update");
      })
      .addCase(deleteProdById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProdById.fulfilled, (state, action) => {
        state.status = "succeeded";
        toast.success("Produit suprimé avec succée");
        // Remove the deleted product from the products array
      })
      .addCase(deleteProdById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to delete");
        state.error = action.payload;
      });
  },
});

export default ProductSlice.reducer;
