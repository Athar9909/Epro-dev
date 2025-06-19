// src/pages/auth/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AuthLayout } from "./AuthLayout";
import { AuthHeader } from "./AuthHeader";
import { AuthForm } from "./AuthForm";
import { resetPassword } from "../../Redux-config/slices/authSlice";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  // Extract data from location state
  const { data, loginMethod = "phone" } = state || {};

  useEffect(() => {
    if (!state?.data) {
      navigate("/forgot-password");
    }
  }, [state, navigate]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const payload = {
        confirmPassword: formData.password,
        newPassword: formData.password,
        ...(loginMethod === "phone"
          ? { phoneNumber: data?.phone }
          : { email: data?.email }),
        ...(loginMethod === "phone" && { countryCode: data?.countryCode }),
      };

      const response = await dispatch(resetPassword(payload)).unwrap();

      if (response?.error === false) {
        navigate("/login");
      } else {
        throw new Error(response?.message || "Password reset failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Create a new password for your account">
      <AuthHeader backLink="/verify-otp" backText="Back to verification" />

      <AuthForm
        title="Create New Password"
        description="Your new password must be different from previous used passwords"
        onSubmit={handleSubmit(onSubmit)}
        submitText={isLoading ? "Resetting..." : "Reset Password"}
        isLoading={isLoading}>
        <div className="space-y-4">
          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/resources/icons/lock.svg"
                  alt="Password"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number and special character",
                  },
                })}
                placeholder="At least 8 characters"
                className={`w-full pl-10 px-3 py-2 pr-10 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <img
                  src={
                    showPassword
                      ? "/resources/icons/eye-slash.svg"
                      : "/resources/icons/eye.svg"
                  }
                  alt={showPassword ? "Hide password" : "Show password"}
                  className="h-5 w-5"
                />
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/resources/icons/lock.svg"
                  alt="Password"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
                className={`w-full pl-10 px-3 py-2 pr-10 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <img
                  src={
                    showConfirmPassword
                      ? "/resources/icons/eye-slash.svg"
                      : "/resources/icons/eye.svg"
                  }
                  alt={showConfirmPassword ? "Hide password" : "Show password"}
                  className="h-5 w-5"
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
