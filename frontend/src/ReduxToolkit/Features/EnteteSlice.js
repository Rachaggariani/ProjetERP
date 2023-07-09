import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const fetchEntete= createAsyncThunk("Entete/fetchEntete",async (payload)=>{
  const id = payload
  const response = await axios.get(`http://localhost:5000/api/v1/Entete/code/${id}`);
  console.log("entete from slice",response.data);
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
export const EnteteSlice = createSlice({
  name: "Entete",
  initialState: {
    eneteComm: {client_code:null},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEntete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEntete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.eneteComm = action.payload;
      })
      .addCase(fetchEntete.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get entet");
        state.error = action.payload;
      })
    //   .addCase(addBL.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(addBL.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     toast.success("added");
    //   })
    //   .addCase(addBL.rejected, (state, action) => {
    //     state.status = "failed";
    //     toast.error("failed to add new BL");
    //     state.error = action.payload;
    //   })
  },
});
export default EnteteSlice.reducer;
