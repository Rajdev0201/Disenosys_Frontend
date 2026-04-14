"use client";
import { API } from "@/components/utils/constant";
import axios from "axios";

const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      reject(false);
    };

    document.body.appendChild(script);
  });
};

export const CheckOut = async (Data) => {

  try {
    const res = await axios.post(
      API + "checkout-order",
      {
        cartItems: Data.cartItems,
        amount: Data.amount,
      },
      {
        withCredentials: true,
      },
    );

    await loadRazorpayScript();

    const options = {
      key: "rzp_live_OUZdMyMFCAbZp2",
      amount: res.data.amount,
      currency: res.data.currency,
      name: "Disenosys",
      description: "Course Payment",
      order_id: res.data.orderId,
      handler: function () {
        window.location.href = "/success";
      },
      prefill: {
        name: Data.userData.userName,
        email: Data.userData.userEmail,
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.log(err);
  }
};
