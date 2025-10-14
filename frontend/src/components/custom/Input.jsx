import React from 'react'

const Input = ({ onClick, type = "text",className = "", placeholder,value=""}) => {
    const baseClass ="mt-1 w-full rounded-xl border shadow border-gray-300 px-3 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <input
      type={type}
      onClick={onClick}
      placeholder={placeholder}
      value={value}
      className={`${!className == "" ? className : baseClass}`}
      required
    />
  );
};

export default Input