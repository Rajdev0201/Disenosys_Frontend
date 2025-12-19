
export const API = "https://disenosys-backendv2-1.onrender.com/"


export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};
