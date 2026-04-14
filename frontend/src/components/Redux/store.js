"use client"
import { configureStore } from "@reduxjs/toolkit"
import user from "@/components/Redux/features/authSlice.js"
import course from "@/components/Redux/features/courseSlice.js"
import cart from "@/components/Redux/features/addToCart.js"

export default configureStore({
  reducer:{
    user:user,
    course:course,
    cart:cart,
  }
})