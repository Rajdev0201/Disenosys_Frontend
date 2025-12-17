"use client"
const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  data: null,
  loading:false,
  error:null,
  success:null,
  logoutmsg:null
};


const authSlice = createSlice({
    name:"user",
    initialState,
     reducers:{
       setUser:(state,action) => {
          state.loading = action.payload.loading;
          state.data = action.payload.data;
          state.error = action.payload.error;
       },
       SignUp:(state,action) => {
          state.loading = action.payload.loading;
          state.data = action.payload.data;
          state.error = action.payload.error;
          state.success = action.payload.success;
       },
        Login:(state,action) => {
          state.loading = action.payload.loading;
          state.data = action.payload.data;
          state.error = action.payload.error;
          state.success = action.payload.success;
       },
       Logout:(state,action) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.logoutmsg = action.payload.logoutmsg;
       },
       GoogleLog:(state,action) => {
        state.data = action.payload
       },
       LinkedInLog:(state,action) => {
        state.data = action.payload
       },
        clearMessages: (state) => {
        state.success = null;
        state.error = null;
      },

     }
})

export const {setUser,SignUp,Login,Logout,GoogleLog,LinkedInLog,clearMessages} = authSlice.actions;
export default authSlice.reducer;