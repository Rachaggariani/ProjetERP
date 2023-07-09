import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users:[],
    status:"idle",
    error:null,
  },
  reducers: {
    setUsersPending: (state) => {
      state.status = "loading";
    },
    setUsersSuccess: (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    },
    setUsersFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    deleteUser: (state, action) => {
      const id = action.payload;
      axios.delete(`/users/${id}`).then((res) => {
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
    addUser: (state, action) => {
      axios.post("/users/add", action.payload).then((res) => {
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
    updateUser: (state, action) => {
      const {id, user} = action.payload;
      axios.put(`/users/update/${id}`, user).then((res) => {
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
export const {setUsersPending, setUsersSuccess, setUsersFailed, addUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer