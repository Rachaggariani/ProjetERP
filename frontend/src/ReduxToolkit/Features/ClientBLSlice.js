import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const fetchClientBL= createAsyncThunk("ClBL/fetchClientBL",async (payload)=>{
  const id = payload;
  const response = await axios.get(`http://localhost:5000/api/v1/Entete/client/${id}`);
  return response.data;
});

export const fetchClientBLById= createAsyncThunk("ClBL/fetchClientBLById",async (payload)=>{
  const id = payload;
  console.log("client bl id from redux",id);

  const response = await axios.get(`http://localhost:5000/api/v1/Entete/client/${id}`);
  console.log("client bl from redux",response);
  return response.data;
});

// export const addBL = createAsyncThunk("LC/addBL", async (payload) => {
//   try {
//     console.log("redux payload verifie ",payload);
//     const response = await axios.post(
//       "http://localhost:5000/api/v1/BL",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// });
export const ClientBLSlice = createSlice({
  name: "ClBL",
  initialState: {
    clients: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBL.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientBL.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClientBL.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get bl");
        state.error = action.payload;
      })
      .addCase(fetchClientBLById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientBLById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients =action.payload
      })
      .addCase(fetchClientBLById.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to add new BL");
        state.error = action.payload;
      })
  },
});
export default ClientBLSlice.reducer;
