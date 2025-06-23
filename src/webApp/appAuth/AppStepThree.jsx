import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { SendOTPRegister, VerifyOtp } from "../../Redux-config/slices/authSlice";

const AppVerificationStep = ({ setCurrentStep }) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.misc.registerData);
  const loading = useSelector((state) => state.auth.loading);
  // console.log(loading)

  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputsRef = useRef([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const otpValues = watch();

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [counter]);

  const handleResend = async () => {
    try {
      const payload = {
        ...(registerData?.userVerifyType === "email" && {
          email: registerData?.email,
        }),
        ...(registerData?.userVerifyType === "phone" && {
          countryCode: registerData?.countryCode,
          phoneNumber: registerData?.phone,
        }),
      };

      const response = await dispatch(SendOTPRegister(payload)).unwrap();

      if (response?.error === false && response?.error_code === 200) {
        setCounter(60);
        setResendDisabled(true);
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  const onSubmit = async (data) => {
    const code = Object.values(data).join("");
    try {
      const payload = {
        ...(registerData?.userVerifyType === "email" && {
          email: registerData?.email,
        }),
        ...(registerData?.userVerifyType === "phone" && {
          phoneNumber: registerData?.phone,
          countryCode: registerData?.countryCode,
        }),
        otp: code,
      };

      const response = await dispatch(VerifyOtp(payload)).unwrap();

      if (response?.error === false && response?.error_code === 200) {
        setIsSuccess(true);
        // setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  const handleInputChange = (e, index, onChange) => {
    const value = e.target.value;

    // Only allow numbers
    if (/^\d*$/.test(value)) {
      onChange(value);

      // Auto-focus to next input if a digit is entered
      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus();
      }

      // Trigger validation
      trigger();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);

    if (/^\d{4}$/.test(pasteData)) {
      pasteData.split('').forEach((digit, index) => {
        setValue(`digit${index}`, digit);
        if (index < 3) {
          inputsRef.current[index + 1]?.focus();
        }
      });
      trigger();
    }
  };

  const handleContinue = () => {
    if (registerData?.userIdType === "Company") {
      setCurrentStep((prev) => prev + 1);
      // setCurrentStep((prev) => prev + 2);
    }
    else {
      setCurrentStep((prev) => prev + 1);
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="max-w-[90vw] mx-auto p-4 rounded-[16px] bg-white">
      {!isSuccess ? (
        <div>
          <div className="text-center mb-6">
            <div
              className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
              <img
                src={`/resources/icons/verify.svg`}
                alt="verify-icon"
                className="w-10 h-10"
              />
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 mb-1 mt-4">
              Verification Code
            </h2>
            <p className="text-gray-600 text-[12px] leading-relaxed">
              We've sent a verification code to {registerData?.userVerifyType === "email"
                ? registerData?.email
                : `${registerData?.countryCode} ${registerData?.phone}`}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center gap-4 mb-8" onPaste={handlePaste}>
              {[0, 1, 2, 3].map((index) => (
                <Controller
                  key={index}
                  name={`digit${index}`}
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^[0-9]$/,
                      message: "Must be a single digit"
                    }
                  }}
                  render={({ field: { onChange, value, ...field } }) => (
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={value || ""}
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index, onChange)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-12 h-12 text-center border-2 text-xl rounded-md outline-none transition ${errors[`digit${index}`]
                        ? "border-red-500 focus:ring-red-200"
                        : value
                          ? "border-green-500 focus:ring-green-200"
                          : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420]"
                        }`}
                      autoComplete="off"
                    />
                  )}
                />
              ))}
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-sm text-red-600 text-center mb-4">
                Please enter a valid 4-digit OTP
              </p>
            )}

            <div className="flex justify-center items-center mb-6 text-center gap-2">
              <button
                type="button"
                disabled={resendDisabled}
                onClick={handleResend}
                className={`text-sm font-medium ${resendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#009EB4] underline"
                  }`}>
                {resendDisabled ? `Resend OTP in` : "Resend OTP"}
              </button>
              {resendDisabled && (
                <span className="text-[#F4C63B]">{counter}s</span>
              )}
            </div>

            <div className="flex">
              <button
                type="submit"
                disabled={!isValid && !loading}
                className={`pri-btn text-center ${!isValid && !loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                Verify & Continue
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center mb-6 w-full p-6">
          <div
            className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
            <img
              src={`/resources/icons/Verified.svg`}
              alt="verified-icon"
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-1 mt-4">
            Verification Successful
          </h2>
          <p className="text-gray-600 text-[12px] leading-relaxed mb-4">
            Your {registerData?.userVerifyType} has been verified successfully
          </p>
          <div className="flex">
            <button
              onClick={handleContinue}
              className={`pri-btn text-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AppVerificationStep;