import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import * as api from"../api"
export const login = createAsyncThunk("auth/login",async({user,navigate,toast},{ rejectWithValue })=>{
    try {
        const response = await api.signIn(user)
        toast.success("Login Successfully");
        navigate("/")
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user:null,
    error:"",
    loading:false
  },
  reducers: {
    setUser: (state, action)=>{
      state.user = action.payload;
    },
    setLogout: (state,action) =>{
      localStorage.clear();
      state.user = null;
    }
  },
  extraReducers: {
    [login.pending]: (state, action)=>{
        state.loading = true
    },
    [login.fulfilled]: (state, action)=>{
        state.loading = false
        localStorage.setItem("profile",JSON.stringify({...action.payload}))
        state.user = action.payload
    },
    [login.rejected]: (state, action)=>{
        state.loading = false
        state.error = action.payload.message
    }
  }
});

// Action creators are generated for each case reducer function
export const {setUser, setLogout } = AuthSlice.actions;

export default AuthSlice.reducer;
