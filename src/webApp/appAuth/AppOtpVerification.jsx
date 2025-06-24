import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { VerifyOtp } from '../../Redux-config/slices/authSlice';
import { ChevronLeft } from 'lucide-react';

const AppOtpVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { data, loginMethod } = location.state || {};
    const [isLoading, setIsLoading] = useState(false);
    const [counter, setCounter] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);
    const inputsRef = useRef([]);

    const {
        control,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

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
        // Add your resend OTP API call here
        toast.info("OTP has been resent");
    };

    const validateOtp = () => {
        const otpCode = [0, 1, 2, 3].map((i) => watch(`digit${i}`)).join("");
        return otpCode.length === 4 && /^\d{4}$/.test(otpCode);
    };

    const onSubmit = async () => {
        if (!validateOtp()) {
            toast.error("Please enter a valid 4-digit OTP");
            return;
        }

        setIsLoading(true);
        try {
            const otpCode = [0, 1, 2, 3].map((i) => watch(`digit${i}`)).join("");

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
            console.error("OTP verification error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInput = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            setValue(`digit${index}`, value);
            if (index < 3) {
                inputsRef.current[index + 1]?.focus();
            }
            trigger();
        } else if (value === "") {
            setValue(`digit${index}`, "");
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <div className='flex justify-center items-center w-full min-h-screen bg-[#ecf8f6]'>
            <div className='bg-white border-2 border-[#e5e5e5] p-6 w-full max-w-md mx-4 rounded-[10px] shadow-sm relative'>
                <div
                    className="w-10 h-10 absolute top-1 left-1 text-[#009eb4] flex justify-center items-center cursor-pointer"
                    onClick={() => navigate(-1)}
                >
                    <ChevronLeft />
                </div>
                <div className="text-center mb-6">
                    <div className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md border-[#009EB4] bg-[#009EB420]`}>
                        <img
                            src="/resources/icons/verify.svg"
                            alt="verification-icon"
                            className="w-10 h-10"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2 mt-4">
                        Verification Code
                    </h2>
                    <p className="text-gray-600 text-sm">
                        We've sent a verification code to your {loginMethod === "phone" ? "phone" : "email"}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex justify-center gap-3 mb-6">
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
                                        message: "Must be a digit"
                                    }
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        onChange={(e) => handleInput(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className={`w-14 h-14 text-center border-2 text-xl rounded-md outline-none transition-all ${errors[`digit${index}`]
                                            ? "border-red-500"
                                            : field.value
                                                ? "border-green-500"
                                                : "border-gray-300 focus:border-[#009EB4]"
                                            }`}
                                        autoFocus={index === 0}
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

                    <div className="flex justify-center items-center mb-6 gap-2">
                        <p className="text-sm text-gray-600">
                            Didn't receive code?
                        </p>
                        <button
                            type="button"
                            disabled={resendDisabled}
                            onClick={handleResend}
                            className={`text-sm font-medium ${resendDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-[#009EB4] underline hover:text-[#007a8a]"
                                }`}
                        >
                            {resendDisabled ? `Resend in` : "Resend now"}
                        </button>
                        {resendDisabled && (
                            <span className="text-sm text-[#F4C63B]">{counter}s</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || isLoading}
                        className={`w-full py-3 px-4 rounded-[10px] font-medium text-white transition-colors ${(!isValid || isLoading)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#009EB4] hover:bg-[#008a9d]"
                            }`}
                    >
                        {isLoading ? "Verifying..." : "Continue"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AppOtpVerification;