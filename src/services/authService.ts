import API from "./api";

// LOGIN USER
export const loginUser = async (email: string, password: string) => {
  const res = await API.post("/api/users/login", { email, password });
  return res.data;
};


export const forgotPassword = async (email: string) => {
  const res = await API.post("/api/users/forgot-password", { email });
  return res.data;
};


export const verifyOtp = async (email: string, otp: string) => {
  const res = await API.post("/api/users/verify-otp", { email, otp });
  return res.data;
};


export const resetPassword = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const res = await API.post("/api/users/reset-password", {
    email,
    otp,
    newPassword,
  });

  return res.data;
};