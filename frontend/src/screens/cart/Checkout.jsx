"use client";
import { getAllCarts, removeProductFromCart } from "@/components/Redux/actions/addToCart";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/context/ToastContext";
import { CheckOut } from "@/components/Redux/actions/payment";

const Checkout = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  const { showToast } = useToast();

   useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  const cartItems = data?.cartItems || [];

  const handleDelete = (itemId) => {
      dispatch(removeProductFromCart(itemId));
      if(!error){
        showToast("success","Your item has deleted!..")
      }
  };



  const parsePrice = (price) => {
    if (!price) return 0;
    return Number(price.toString().replace(/,/g, ""));
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + parsePrice(item.price) * item.quantity;
    }, 0);
  }, [cartItems]);

    const handlePlaceOrder = async () => {
    if (cartItems?.length > 0) {
      const finalAmount = subtotal;
      const UserData = {
        userData: user,
        cartItems:cartItems.filter(
          (item) => item.user === user._id
        ),
        amount: finalAmount,
      };
      await CheckOut(UserData);
      // setCheckoutSuccess(true);
    } else {
      showToast("error","Your cart is empty, please choose an item");
    }
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading your cart...
        </p>
      </section>
    );
  }


  if (error) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }




  if (!cartItems.length) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center font-dm-sans">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Add some courses to see them here.
        </p>
      </section>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-28 py-36 font-dm-sans ">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#141554]">Your Cart</h1>
        <p className="text-gray-500 mt-2">
          Review your selected courses before proceeding to checkout.
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm">
          <div className="p-5 border-b border-gray-200 shadow">
            <p className="text-lg font-semibold text-[#141554]">
              {cartItems.length} Course(s) in the cart
            </p>
          </div>

          {cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border-b border-gray-200 shadow last:border-b-0"
            >
              {/* Left Info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt="course"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl"
                />

                <div>
                  <h2 className="font-semibold text-gray-800 text-base sm:text-lg">
                    Course: {item?.course?.courseName}
                  </h2>

                  <p className="text-blue-600 font-semibold mt-1">
                    ₹{parsePrice(item.price).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6">
                {/* Quantity */}
                {/* <div className="flex items-center border border-gray-200 shadow rounded-lg overflow-hidden">
                  <button
                    className="px-3 py-1  hover:cursor-pointer text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>

                  <span className="px-4 font-medium">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3  hover:cursor-pointer py-1 text-gray-600 hover:bg-gray-100 transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div> */}

                {/* Remove */}
                <button
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Remove item"
                  onClick={() => handleDelete(item?._id)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="bg-white border-2 border-gray-200 shadow rounded-2xl p-6 h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-6">Cart total</h2>

          <div className="flex justify-between text-gray-600 mb-4">
            <span>Subtotal</span>
            <span className="font-medium">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          <div className="border-t-2 border-gray-200 pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">
              ₹{subtotal.toLocaleString()}
            </span>
          </div>

          <button onClick={handlePlaceOrder} className="mt-8 w-full bg-gradient-to-r hover:cursor-pointer hover:bg-amber-400 from-blue-500 to-cyan-400 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-md">
            Proceed to checkout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
