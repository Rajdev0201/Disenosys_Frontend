import React from 'react'

const Card = ({className = ""}) => {
const baseClass = "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 font-dm-sans";
  return (
    <div className={`${!className == "" ? className : baseClass}`}>

    </div>
  )
}

export default Card