import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CommNote from "./CommNote";
import { Link } from "react-router-dom";

const VerificationStep = ({ type = "email", setCurrentStep }) => {
  const {
    control,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [counter, setCounter] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);
  const inputsRef = useRef([]);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [counter]);

  const handleResend = () => {
    setCounter(60);
    setResendDisabled(true);
    // trigger resend OTP API
  };

  const onSubmit = (data) => {
    const code = Object.values(data).join("");
    console.log("OTP submitted:", code);
    // handle verification
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setValue(`digit${index}`, value);
      if (index < 3) {
        inputsRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      setValue(`digit${index}`, "");
    }
    trigger();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      {!isSuccess ? (
        <div>
          <div className="text-center mb-6">
            <div
              className={`border p-4 w-40 h-40 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
              <img
                src={`/resources/icons/verify.svg`}
                alt={`${type}-icon`}
                className="w-4 h-4 md:w-20 md:h-20"
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1 mt-4">
              {"Verification Code"}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Please choose the method you prefer to verify your identity.{" "}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <Controller
                  key={index}
                  name={`digit${index}`}
                  control={control}
                  defaultValue=""
                  rules={{ required: "Required", pattern: /^[0-9]$/ }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputsRef.current[index] = el)}
                      onChange={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`w-24 h-14 text-center border text-xl rounded-md outline-none transition ${
                        errors[`digit${index}`]
                          ? "border-red-500"
                          : field.value
                          ? "border-green-500"
                          : "border-gray-300 focus:border-[#009EB4]"
                      }`}
                    />
                  )}
                />
              ))}
            </div>

            {Object.keys(errors).length > 0 && (
              <p className="text-sm text-red-600 text-center mb-4">
                Please enter all 4 digits correctly
              </p>
            )}

            <CommNote
              text={"Verification of this code is necessary to continue."}
            />

            <div className="flex justify-between items-center mb-6">
              <button
                type="button"
                disabled={resendDisabled}
                onClick={handleResend}
                className={`text-sm font-medium ${
                  resendDisabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-[#009EB4]"
                }`}>
                {resendDisabled ? `Resend OTP in ${counter}s` : "Resend OTP"}
              </button>
            </div>

            <div className="flex space-x-4">
              <Link to={-1} className="custom-btn bg-[#F7F7F7] text-gray-800">
                Back
              </Link>
              <button
                type="submit"
                disabled={!isValid}
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className={`custom-btn ${
                  isValid
                    ? "bg-[#009EB4] text-white hover:bg-teal-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}>
                Continue
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="text-center mb-6">
          <div
            className={`border p-4 w-40 h-40 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
            <img
              src={`/resources/icons/Verified.svg`}
              alt={`${type}-icon`}
              className="w-4 h-4 md:w-20 md:h-20"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1 mt-4">
            {"Email Verified"}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Please continue to signup process.{" "}
          </p>
          <div className="flex w-[50%] mx-auto">
            <button
              type="submit"
              disabled={!isValid}
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className={`custom-btn  ${
                isValid
                  ? "bg-[#009EB4] text-white hover:bg-teal-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationStep;
