"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LinkedInLog } from "@/components/Redux/features/authSlice.js";
import { API } from "@/components/utils/constant.js";

const LinkedInSocialLogin = ({ text}) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [profile, setProfile] = useState(null);


  const startLinkedInAuth = async () => {
    try {
      const { data } = await axios.get(API + "auth");
      window.location.href = data?.url;
    } catch (error) {
      console.error("Error starting LinkedIn auth:", error);
      setError("Error starting LinkedIn login process.");
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      // Exchange code for access token
      const { data } = await axios.post(
        API + "get-access-token",
        { code },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data && data?.accessToken) {
        setAccessToken(data?.accessToken);
        alert("Access token obtained successfully!");
      } else {
        console.error("Access token not obtained");
      }

      // Fetch user profile using the access token
      const { data: profileData } = await axios.get(API + "profile", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });

      if (profileData && profileData?.profile) {
        dispatch(LinkedInLog(profileData?.user));
        // Dispatch the profile to the Redux store
        setProfile(profileData.profile);
        alert("Logged in successfully!");
      } else {
        console.error("Profile data not obtained");
        setError("Error retrieving profile data.");
      }
    } catch (error) {
      console.error(
        "Error exchanging code for token:",
        error.response?.data || error.message
      );
      setError("Error exchanging code for access token.");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      exchangeCodeForToken(code);
    }
  }, []);

  return (
    <div>
      {!profile ? (
        <button onClick={startLinkedInAuth}>{text}</button>
      ) : (
        <div>Welcome back! You are logged in.</div>
      )}
    </div>
  );
};

export default LinkedInSocialLogin;
