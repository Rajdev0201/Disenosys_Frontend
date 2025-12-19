"use client"
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { GoogleLog } from "@/components/Redux/features/authSlice.js";
import axios from 'axios';
import { useRouter } from "next/navigation.js";
import { API } from "@/components/utils/constant";

const Login = () => {
    const dispatch = useDispatch();
    const nav = useRouter();
    const handleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        try {
            const response = await axios.post(API+'Glogin', {
                userEmail: decoded.email,
                userName: decoded.name}, { withCredentials: true } );
            
            dispatch(GoogleLog(response?.data?.user));
            nav.push("/")
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };
    
    const handleLoginError = () => {
        console.log("Login Failed");
    };

    return (
        <GoogleOAuthProvider clientId="983254091360-quqeguqb1f1kl5s3gmlljamv3rla3acr.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                // theme="outline"
                text="continue_with"
                size="large"
            />
        </GoogleOAuthProvider>
    );
};

export default Login;
