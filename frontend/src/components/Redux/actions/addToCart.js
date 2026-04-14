"use client";
import axios from "axios";
// import { payment } from './Payment';
import { API } from "@/components/utils/constant";
import {
  addCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setCart,
} from "../features/addToCart";

export const addProductToCart = (cart) => async (dispatch) => {
  dispatch(
    addCart({
      data: [],
      loading: true,
      error: null,
    }),
  );
  try {
    const response = await axios.post(API + "addCart", cart, {
      withCredentials: true,
    });
    const { cartItem } = response.data;
    dispatch(
      addCart({
        data: cartItem,
        loading: false,
        error: null,
      }),
    );
    dispatch(getAllCarts());
    // dispatch(payment());
  } catch (err) {
    dispatch(
      addCart({
        data: [],
        loading: false,
        error: err.response?.data?.message,
      }),
    );
  }
};

export const removeProductFromCart = (cartId) => async (dispatch) => {
  dispatch(addCart({ data: [], loading: true, error: null }));
  try {
    await axios.delete(`${API}cart/${cartId}`, {
      withCredentials: true,
    });
    dispatch(
      removeFromCart({
        data: cartId,
        loading: false,
        error: null,
      }),
    );
    dispatch(getAllCarts());
  } catch (err) {
    dispatch(
      addCart({
        data: [],
        loading: false,
        error: err.response?.data?.message || "Failed to remove item",
      }),
    );
  }
};

export const increaseQuantity = (cartId) => async (dispatch) => {
  dispatch(addCart({ data: [], loading: true, error: null }));
  try {
    const response = await axios.put(`${API}cart/${cartId}/increament`, {
      withCredentials: true,
    });
    const updatedItem = response.data;
    dispatch(
      incrementQuantity({
        data: updatedItem,
        loading: false,
        error: null,
      }),
    );
    dispatch(getAllCarts());
  } catch (error) {
    dispatch(
      addCart({
        data: [],
        loading: false,
        error: error.response?.data?.message || "Failed to increase quantity",
      }),
    );
  }
};

export const decreaseQuantity = (cartId) => async (dispatch) => {
  dispatch(
    decrementQuantity({
      data: [],
      loading: true,
      error: null,
    }),
  );
  try {
    const response = await axios.put(`${API}cart/${cartId}/decreament`, {
      withCredentials: true,
    });
    const updatedItem = response.data;
    dispatch(
      decrementQuantity({
        data: updatedItem,
        loading: false,
        error: null,
      }),
    );

    dispatch(getAllCarts());
  } catch (error) {
    dispatch(
      decrementQuantity({
        data: [],
        loading: false,
        error: error.response?.data?.message || "Failed to increase quantity",
      }),
    );
  }
};

export const getAllCarts = () => async (dispatch) => {
  dispatch(
    setCart({
      data: [],
      loading: true,
      error: null,
    }),
  );
  try {
    const res = await axios.get(API + "getCart", { withCredentials: true });
    const getCart = res.data;
    dispatch(
      setCart({
        data: getCart,
        loading: false,
        error: null,
      }),
    );
  } catch (error) {
    dispatch(
      setCart({
        data: [],
        loading: false,
        error: error.response?.data?.message || "Failed to increase quantity",
      }),
    );
  }
};
