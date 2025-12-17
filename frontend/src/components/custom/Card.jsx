import React from 'react'

const Card = ({className = "",children}) => {
//const baseClass = "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 font-dm-sans";
  return (
    <article className={`border border-gray-200 bg-white shadow-sm rounded-md p-4 ${className}` }>
       {children}
    </article>
  )
}

export default Card;