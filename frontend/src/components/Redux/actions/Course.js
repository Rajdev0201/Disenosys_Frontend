"use client"
import { API } from "@/components/utils/constant";
import { setProducts } from "../features/courseSlice";
import axios from "axios";



export const fetchCourse = () => async (dispatch) => {
  dispatch(setProducts({ data: [], loading: true, error: null }));

  try {
    const res = await axios.get(API + 'getAllCourses');
    const decoded = JSON.parse(atob(res.data.data));
    dispatch(setProducts({
      data: decoded,
      loading: false,
      error: null
    }));
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Something went wrong";

    dispatch(setProducts({
      data: [],
      loading: false,
      error: errorMessage
    }));
  }
};
