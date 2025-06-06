import React, { useState } from 'react';
import CommHead from './CommHead.jsx';
import CommFoot from './CommFoot.jsx';
import CommNote from './CommNote.jsx';
import { Link } from 'react-router-dom';

const SignupVerification = () => {
    const [code, setCode] = useState(['', '', '', '']);
    const [activeInput, setActiveInput] = useState(0);
    const [verifySuccess, setVerifySuccess] = useState(false);
    const [verification, setVerification] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto focus next input
            if (value && index < 3) {
                setActiveInput(index + 1);
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            setActiveInput(index - 1);
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text/plain').slice(0, 4);
        if (/^\d{4}$/.test(pasteData)) {
            const newCode = pasteData.split('');
            setCode(newCode);
            setActiveInput(Math.min(3, newCode.length - 1));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <CommHead />
            <div className="bg-[url(/resources/images/banner1.svg)] bg-no-repeat bg-cover px-4 py-8 h-[20vh] md:h-[45vh]"></div>
            <div className=" flex items-center justify-center px-6 bg-white relative -top-25 md:-top-50 sm:-top-35 rounded-container max-w-6xl mx-auto p-6 md:p-10 min-h-6xl ">
                {
                    !verifySuccess ? (
                        !verification ?
                            (
                                <div className="w-full max-w-xl">
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src="/resources/icons/phoneLogo.svg" alt='phoneLogo-icon' />
                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter Your Mobile Number</h1>
                                        <p className="text-gray-600 mb-6">
                                            Please choose the method you prefer to verify your identity.
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Phone Number</h2>
                                        <div className='flex w-full gap-3'>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                className=" h-14 text-xl text-center border-[#f7f7f7] border-2 rounded-btn focus:outline-none focus:ring-2 focus:ring-[#e7e7e7] focus:border-transparent w-1/4"
                                                placeholder='+91'
                                            />
                                            <div className="flex justify-start space-x-3 mb-4 border-[#f7f7f7] border-2 rounded-btn w-3/4 text-start">
                                                <img src="/resources/icons/phone.svg" alt='phone-icon' className='' />
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    placeholder="Enter Phone Number"
                                                    className="w-full h-13 text-xl text-start border-none outline-none  rounded-btn"
                                                />
                                            </div>

                                        </div>
                                        <CommNote strong={"Please Note"} text={"Verification of this required field is necessary to continue."} />
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-200 gap-2">
                                        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-btn font-medium hover:bg-gray-50 transition-colors">
                                            Back
                                        </button>
                                        <button
                                            onClick={() => setVerification(true)}
                                            className={`flex-1 bg-[#009EB4] text-white py-3 px-6 rounded-btn  transition-colors font-medium`}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className="w-full max-w-xl">
                                    <div className='flex flex-col justify-center items-center'>
                                        <img src="/resources/icons/verification.svg" alt='verification-icon' />
                                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Code</h1>
                                        <p className="text-gray-600 mb-6">
                                            Please choose the method you prefer to verify your identity.
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Enter Code</h2>
                                        <div className="flex justify-between space-x-3 mb-4">
                                            {code.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
                                                    maxLength={1}
                                                    value={digit}
                                                    onChange={(e) => handleChange(e, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    onPaste={handlePaste}
                                                    onFocus={() => setActiveInput(index)}
                                                    autoFocus={index === activeInput}
                                                    className="w-full h-14 text-2xl text-center border-[#f7f7f7] border-2 rounded-btn focus:outline-none focus:ring-2 focus:ring-[#e7e7e7] focus:border-transparent"
                                                    placeholder='-'
                                                />
                                            ))}
                                        </div>
                                        <CommNote strong={"Please Note"} text={"Verification of this required field is necessary to continue."} />
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-gray-200 gap-2">
                                        <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-btn font-medium hover:bg-gray-50 transition-colors">
                                            Back
                                        </button>
                                        <button
                                            className={`flex-1 bg-[#009EB4] text-white py-3 px-6 rounded-btn  transition-colors font-medium ${code.every(d => d !== '')
                                                ? 'bg-[#009EB4] text-white hover:bg-teal-600'
                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                }`}
                                            // disabled={!code.every(d => d !== '')}
                                            onClick={() => setVerifySuccess(true)}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )
                    ) : (
                        <div className="w-full max-w-xl">
                            <div className='flex flex-col justify-center items-center'>
                                <img src="/resources/icons/emailLogo.svg" alt='emailLogo-icon' />
                                <h1 className="text-2xl font-bold text-gray-800 mb-2 mt-2">Email Verified</h1>
                                <p className="text-gray-600 mb-6">
                                    Please choose the method you prefer to verify your identity.
                                </p>
                            </div>
                            <div className="flex justify-between pt-4  border-gray-200 gap-2">
                                <Link
                                    to="/Sign-Up/Process-one"
                                    className={`flex-1 text-center bg-[#009EB4] text-white py-3 px-6 rounded-btn  transition-colors font-medium`}
                                >
                                    Continue
                                </Link>
                            </div>
                        </div>
                    )

                }
            </div>

            <CommFoot />
        </div>
    );
};

export default SignupVerification;