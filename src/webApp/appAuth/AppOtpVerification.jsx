import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const AppOtpVerification = ({ type = "email" }) => {
    const navigate = useNavigate()
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
        navigate("/User-App/Reset-Password")
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
        <>
            <div className='flex justify-center items-center w-full h-screen bg-[#ecf8f6]'>
                <div className='bg-white border-2 border-[#e5e5e5] p-4 w-10/12 mx-auto rounded-[10px]'>
                    <div className="text-center mb-6">
                        <div
                            className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
                            <img
                                src={`/resources/icons/verify.svg`}
                                alt={`${type}-icon`}
                                className="w-10 h-10"
                            />
                        </div>
                        <h2 className="text-[20px] font-bold text-gray-900 mb-1 mt-4">
                            {"Verification Code"}
                        </h2>
                        <p className="text-gray-600 text-[12px] leading-relaxed">
                            Please choose the method you prefer to verify your identity.{" "}
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-center gap-4 mb-4">
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
                                            className={`w-12 h-10 text-center border text-xl rounded-md outline-none transition ${errors[`digit${index}`]
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

                        <div className="flex justify-center items-center mb-6 text-center gap-2">
                            <button
                                type="button"
                                disabled={resendDisabled}
                                onClick={handleResend}
                                className={`text-sm font-medium text- ${resendDisabled
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "underline"
                                    }`}>
                                {resendDisabled ? `Resend OTP in` : "Resend OTP"}
                            </button>
                            {
                                resendDisabled ?
                                    <span className="text-[#F4C63B]">{counter}</span>
                                    : null
                            }
                        </div>

                        <div className="flex">
                            <button
                                type="submit"
                                // onClick={() => setCurrentStep((prev) => prev + 1)}
                                className="w-full inline-block text-center bg-[#009EB4] text-white py-4 px-4 rounded-[10px] transition-colors font-medium">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AppOtpVerification
