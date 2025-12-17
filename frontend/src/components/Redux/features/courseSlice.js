"use client"

const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    data:[],
    loading:false,
    error:null
}

const courseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{
      setProducts:(state,action) => {
        state.data = action.payload.data;
        state.loading = action.payload.loading;
        state.error = action.payload.error;
      }
    }
})



export const {setProducts} = courseSlice.actions;
export default courseSlice.reducer;
