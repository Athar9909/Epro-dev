import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../Redux-config/slices/authSlice";
import { AuthLayout } from "./AuthLayout";
import { AuthHeader } from "./AuthHeader";
import { AuthForm } from "./AuthForm";
import CountryCodeDrop from "../common/countryCodeDrop";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginMethod, setLoginMethod] = useState("phone");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      email: "",
      countryCode: "+966",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = {
        ...(loginMethod === "phone" && { countryCode: data.countryCode }),
        ...(loginMethod === "phone" && { phoneNumber: data.phone }),
        ...(loginMethod === "email" && { email: data.email }),
      };

      const response = await dispatch(forgotPassword(payload)).unwrap();

      if (response?.error === false && response?.error_code === 200) {
        toast.success("OTP Sent Successfully!");
        navigate("/verify-otp", {
          state: { data, loginMethod },
        });
      }
    } catch (err) {
      console.error("Forgot Password error:", err);
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your email or phone to receive a verification code">
      <AuthHeader backLink="/login" backText="Back to login" />

      <AuthForm
        title="Forgot Password?"
        description="No worries, we'll send you reset instructions"
        onSubmit={handleSubmit(onSubmit)}
        submitText="Send OTP"
        isLoading={isLoading}>
        {/* Login Method Toggle */}
        <div className="relative bg-gray-100 rounded-lg p-1 h-12">
          <motion.div
            animate={{ x: loginMethod === "phone" ? 0 : "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute w-1/2 h-10 bg-white rounded-md shadow-sm"
          />
          <div className="relative flex h-full">
            <button
              type="button"
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
                loginMethod === "phone"
                  ? "text-[#009EB4]"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              <img
                src={
                  loginMethod === "phone"
                    ? "/resources/icons/phoneActive.svg"
                    : "/resources/icons/call.svg"
                }
                alt="Phone"
                className="w-5 h-5"
              />
              <span>Phone</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginMethod("email")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors z-10 ${
                loginMethod === "email"
                  ? "text-[#009EB4]"
                  : "text-gray-600 hover:text-gray-800"
              }`}>
              <img
                src={
                  loginMethod === "email"
                    ? "/resources/icons/emailActive.svg"
                    : "/resources/icons/email.svg"
                }
                alt="Email"
                className="w-5 h-5"
              />
              <span>Email</span>
            </button>
          </div>
        </div>

        {/* Phone/Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {loginMethod === "phone" ? "Phone Number" : "Email Address"}
          </label>

          {loginMethod === "phone" ? (
            <div className="flex gap-2">
              <div className="w-1/3">
                <CountryCodeDrop
                  selectedCode={watch("countryCode")}
                  onSelect={(code) => setValue("countryCode", code)}
                  register={register("countryCode", {
                    required: "Country code is required",
                  })}
                  error={errors.countryCode}
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <img
                    src="/resources/icons/call.svg"
                    alt="Phone"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid 10-digit phone number",
                    },
                  })}
                  placeholder="Enter phone number"
                  className={`w-full pl-10 px-3 py-2 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
                />
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img
                  src="/resources/icons/email.svg"
                  alt="Email"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                placeholder="Enter your email"
                className={`w-full pl-10 px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent`}
              />
            </div>
          )}
          {errors[loginMethod] && (
            <p className="mt-1 text-sm text-red-600">
              {errors[loginMethod]?.message}
            </p>
          )}
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
