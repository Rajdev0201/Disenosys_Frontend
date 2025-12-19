"use client";
import React, { useEffect } from "react";
import { Bell, Search } from "lucide-react";
import Image from "next/image";
import profile from "@/components/assests/u-d.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getProfile } from "../Redux/actions/auth";

const UserHeader = () => {
 const {data} = useSelector((state) => state.user);
 const router = useRouter();
 const dispatch = useDispatch();
    
     useEffect(() => {
     dispatch(getProfile());
   },[dispatch])
 
   useEffect(() => {
   if(!data){
     router.push("/signup")
   }
   },[])
 
  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 xl:px-12 py-3">

        {/* Search */}
        <div className="relative flex-1 max-w-[180px] sm:max-w-xs lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search"
            className="
              w-full
              border border-[#101359]
              rounded-sm
              pl-9 pr-3 py-1.5
              text-sm
              focus:outline-none
            "
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 sm:gap-6">

          {/* Notification */}
          <div className="relative bg-[#F9F8F9] p-2 rounded-full">
            <Bell size={22} className="text-gray-700" />
            <span className="absolute top-1 right-1 block h-2 w-2 bg-blue-500 rounded-full ring-2 ring-white" />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <Image
              src={profile}
              alt="user"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F9F8F9] p-1"
            />

            {/* Hide text on mobile */}
            <div className="hidden sm:flex flex-col font-dm-sans leading-tight">
              <h4 className="text-sm font-bold text-black">
               {data?.userName}
              </h4>
              <h5 className="text-xs text-[#808080] font-medium">
                {data?.userEmail}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
