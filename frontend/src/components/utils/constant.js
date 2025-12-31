
export const API = "https://disenosys-backendv2-9yuy.onrender.com/"


export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isStrongPassword = (password) => {
  return password.length >= 6;
};


export function isLaunchActive() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const currentYear = now.getFullYear();
  const launchEnd = new Date(`${currentYear + 1}-01-01T00:00:00`);

  return now < launchEnd;
}


