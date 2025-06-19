import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AuthLayout } from "./AuthLayout";
import { AuthHeader } from "./AuthHeader";
import { AuthForm } from "./AuthForm";
import { forgotPassword, VerifyOtp } from "../../Redux-config/slices/authSlice";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(120);

  const { data, loginMethod = "phone" } = state || {};

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (!state?.data) {
      navigate("/forgot-password");
    }
  }, [state, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]*$/.test(value)) return;

    setValue(`otp-${index}`, value);
    clearErrors("otp");

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const validateOtp = () => {
    const otpCode = [0, 1, 2, 3].map((i) => watch(`otp-${i}`)).join("");

    if (otpCode.length !== 4) {
      setError("otp", {
        type: "manual",
        message: "Please enter complete 4-digit OTP",
      });
      return false;
    }

    if (!/^\d{4}$/.test(otpCode)) {
      setError("otp", { type: "manual", message: "OTP must be 4 digits" });
      return false;
    }

    return true;
  };

  console.log(loginMethod);

  const onSubmit = async () => {
    if (!validateOtp()) return;

    setIsLoading(true);
    try {
      const otpCode = [0, 1, 2, 3].map((i) => watch(`otp-${i}`)).join("");

      const payload = {
        otp: otpCode,
        ...(loginMethod === "phone"
          ? { phoneNumber: data?.phone }
          : { email: data?.email }),
        ...(loginMethod === "phone" && { countryCode: data?.countryCode }),
      };

      const response = await dispatch(VerifyOtp(payload)).unwrap();

      if (response?.error === false) {
        navigate("/reset-password", { state: { data, loginMethod } });
      } else {
        throw new Error(response?.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...(loginMethod === "phone"
          ? { phoneNumber: data?.phone }
          : { email: data?.email }),
        ...(loginMethod === "phone" && { countryCode: data?.countryCode }),
      };

      const response = await dispatch(forgotPassword(payload)).unwrap();

      if (response?.error === false) {
        setTimer(120);
        toast.success("New OTP sent successfully!");
      } else {
        throw new Error(response?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="Enter the 4-digit code sent to your email/phone">
      <AuthHeader backLink="/forgot-password" backText="Back" />

      <AuthForm
        title="Enter Verification Code"
        description={`We sent a code to your ${loginMethod} ending with ${
          loginMethod === "email" ? data?.email?.slice(-4) : data?.phone
        }`}
        onSubmit={handleSubmit(onSubmit)}
        submitText={isLoading ? "Verifying..." : "Verify OTP"}
        isLoading={isLoading}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4-digit verification code
            </label>
            <div className="flex justify-between space-x-2">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  name={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              ))}
            </div>
            {errors.otp && (
              <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>
            )}
          </div>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-600">
                Resend code in {formatTime(timer)}
              </p>
            ) : (
              <button
                type="button"
                onClick={resendOTP}
                disabled={isLoading}
                className="text-sm text-[#009EB4] hover:underline disabled:opacity-50">
                Didn't receive code? Resend
              </button>
            )}
          </div>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
