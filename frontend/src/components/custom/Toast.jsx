"use client"
import { CircleCheck } from 'lucide-react';
import React from 'react'

const Toast = () => {
      const baseClass = "";
  return ( 
    <div className='bg-white border-b-6 border-green-500 shadow-sm rounded-2xl w-96 px-4 py-2 mt-2 font-dm-sans'>
        <div className='flex items-center gap-6'>
           <div className='bg-sky-100 rounded-full w-8 h-8 flex items-center justify-center' >
             <CircleCheck size={20} className='text-white rounded-full w-8 h-8 bg-green-500'/>
           </div>
           <div className=''>
              <h2 className='text-lg font-bold text-[#0B0D3F]'>Course Added to Cart!</h2>
              <p className='text-sm text-[#808080]'>Your selected course is waiting in the cart.</p>
           </div>
        </div>
    </div>
  )
}

export default Toast