import React, { useState } from "react";
import { forgotPassword, verifyOtp, resetPassword } from "../services/authService";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = reset password

  // -------------------------------
  // STEP 1 — Send OTP
  // -------------------------------
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "OTP sent to your email.");
      setError("");
      setStep(2); // Go to OTP step
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
      setMessage("");
    }
  };

  // -------------------------------
  // STEP 2 — Verify OTP
  // -------------------------------
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    try {
      const res = await verifyOtp(email, otp);
      setMessage(res.message || "OTP verified.");
      setError("");
      setStep(3); // Show new password fields
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP.");
    }
  };

  // -------------------------------
  // STEP 3 — Reset Password
  // -------------------------------
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await resetPassword(email, otp, newPassword);
      setMessage(res.message || "Password reset successful.");
      setError("");

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">

        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {/* -------------------------------- */}
        {/* STEP 1 — EMAIL */}
        {/* -------------------------------- */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter your registered email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md"
            >
              Send OTP
            </button>

          </form>
        )}

        {/* -------------------------------- */}
        {/* STEP 2 — OTP */}
        {/* -------------------------------- */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email (locked)
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-md"
            >
              Verify OTP
            </button>

          </form>
        )}

        {/* -------------------------------- */}
        {/* STEP 3 — RESET PASSWORD */}
        {/* -------------------------------- */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md"
            >
              Reset Password
            </button>

          </form>
        )}

        <p className="text-center mt-4">
          <a href="/login" className="text-blue-600">Back to Login</a>
        </p>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;
