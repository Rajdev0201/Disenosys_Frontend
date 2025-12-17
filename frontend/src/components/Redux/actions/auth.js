"use client"
import axios from "axios";
import { Login, Logout, setUser, SignUp } from "../features/authSlice";
import { API } from "@/components/utils/constant";


export const SignupData = (userData) => async (dispatch) => {
    dispatch(SignUp({data:null,loading:true}));
    try {
      const { data } = await axios.post(
        API+"register",
        userData,
      { withCredentials: true, }
      );
      dispatch(SignUp({data:data.user,loading:false,success:"Welcome back to Disenosys!"}));
      nav.push("/")
    } catch (err) {
       const errorMessage =
      err.response?.data?.message;
      dispatch(SignUp({data:null,loading:false,error:errorMessage,success:null}))
    }
};


export const LoginData = (userData, nav) => async (dispatch) => {
  dispatch(Login({ data: null, loading: true }));
  try {
    const { data } = await axios.post(API+"login", userData, {
      withCredentials: true,
    });

    dispatch(
      Login({
        data: data.user, 
        loading: false,
        error: null,
        success:"Welcome back to Disenosys!"
      })
    );

    nav.push("/");
  } catch (err) {
    console.log(err)
    const errorMessage = err.response?.data?.message;
    dispatch(Login({ data: null, loading: false, error: errorMessage,success:null }));
  }
};


export const getProfile = () => async (dispatch) => {
  dispatch(setUser({ data: null, loading: true }));
  try {
    const { data } = await axios.get(API + "profile", {
      withCredentials: true,
    });

    dispatch(
      setUser({
        data: data.user, 
        loading: false,
        error: null,
      })
    );
  } catch (err) {
    if (err.response?.status === 401) {
      return;
    }
    const errorMessage = err.response?.data?.message || "Something went wrong";

    dispatch(
      setUser({
        data: null,
        loading: false,
        error: errorMessage,
      })
    );
  }
};

export const logout = (nav) => async (dispatch) => {
  try{
    await axios.get(API + "logout", {
      withCredentials: true,
    });
    dispatch(Logout({logoutmsg:"You have been logged out successfully"}));
    nav.push("/signup");
  }catch(err){
     const errorMessage = err.response?.data?.message;
    dispatch(Logout({error:errorMessage}));
  }
}



