import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const fetchLC= createAsyncThunk("LC/fetchLC",async (payload)=>{
  const id = payload

  const response = await axios.get(`http://localhost:5000/api/v1/Ligne/${id}`);

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
export const LCSlice = createSlice({
  name: "LC",
  initialState: {
    lcomm: ["test"],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLC.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLC.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lcomm = action.payload;
      })
      .addCase(fetchLC.rejected, (state, action) => {
        state.status = "failed";
        toast.error("failed to get bl");
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
export default LCSlice.reducer;
