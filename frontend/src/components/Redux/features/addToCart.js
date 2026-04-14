import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      setCart: (state, action) => {
      state.data = action.payload.data;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },
    addCart: (state, action) => {
      state.data = action.payload.data;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },

    removeFromCart: (state, action) => {
      state.data = action.payload.data;
      state.loading = action.payload.loading;
      state.error = action.payload.error;
    },

    incrementQuantity: (state, action) => {
      const cartId = action.payload._id;
      if (Array.isArray(state.items)) {
        const existingItem = state.data.find((item) => item._id === cartId);
        if (existingItem) {
          existingItem.quantity++;
          state.totalPrice += existingItem.price;
        }
      }
    },

    decrementQuantity: (state, action) => {
      const cartId = action.payload._id;
      if (Array.isArray(state.items)) {
        const existingItem = state.data.find((item) => item._id === cartId);
        if (existingItem) {
          existingItem.quantity--;
          state.totalPrice -= existingItem.price;
          console.log("State after update:", state);
        }
      }
    },
  },
});

export const { addCart, decrementQuantity, incrementQuantity, removeFromCart,setCart } = addToCartSlice.actions;
export default addToCartSlice.reducer;
