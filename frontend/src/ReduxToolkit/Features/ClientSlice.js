import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const ClientSlice = createSlice({
  name: 'client',
  initialState: {
    clients:[],
    status:"idle",
    error:null,
  },
  reducers: {
    setClientsPending: (state) => {
      state.status = "loading";
    },
    setClientsSuccess: (state, action) => {
      state.status = "succeeded";
      state.clients = action.payload;
    },
    setClientsFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteClient: (state, action) => {
      const id = action.payload;
      axios.delete(`/clients/${id}`).then((res) => {
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
    addClient: (state, action) => {
      axios.post("/clients/add", action.payload).then((res) => {
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
    updateClient: (state, action) => {
      const {id, client} = action.payload;
      axios.put(`/clients/update/${id}`, client).then((res) => {
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
})

// Action creators are generated for each case reducer function
export const {setClientsPending, setClientsSuccess, setClientsFailed, addClient, updateClient, deleteClient } = ClientSlice.actions

export default ClientSlice.reducer