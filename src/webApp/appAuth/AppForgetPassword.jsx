import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const AppForgetPassword = () => {
    const [loginMethod, setLoginMethod] = useState('phone');
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    return (
        <>
        <div className='bg-[#ecf8f6]'>
            <div className="min-h-screen flex justify-center items-center w-10/12 mx-auto">
                <div className="space-y-6 bg-white border-2 border-[#e5e5e5] p-4 shadow-md rounded-[10px]">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-[#272727] mb-2">Forget Password</h2>
                        <p className="text-gray-[#272727]">Forgot password? Reset securely and regain access quickly.</p>
                    </div>

                    {/* Login Method Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setLoginMethod('phone')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'phone'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-[#272727]'
                                }`}
                        >
                            {
                                loginMethod === "phone" ?
                                    <img src='/resources/icons/phoneActive.svg' alt='phone.svg' />
                                    :
                                    <img src='/resources/icons/call.svg' alt='phone.svg' />
                            }
                            <span>Phone</span>
                        </button>
                        <button
                            onClick={() => setLoginMethod('email')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'email'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-[#272727]'
                                }`}
                        >
                            {
                                loginMethod === "email" ?
                                    <img src='/resources/icons/emailActive.svg' alt='email.svg' />
                                    :
                                    <img src='/resources/icons/email.svg' alt='email.svg' />
                            }
                            <span>Email</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Phone/Email Input */}
                        <div>
                            <div className="block text-sm font-medium text-gray-[#272727] mb-2">
                                {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                            </div>
                            {loginMethod === 'phone' ? (
                                <div className="flex">
                                    <select className="w-20 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-gray-50">
                                        <option>+966</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="Enter here"
                                        className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                    />
                                </div>
                            ) : (
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                />
                            )}
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/User-App/Verify-OTP"
                            type="button"
                            className="w-full inline-block text-center bg-[#009EB4] text-white py-4 px-4 rounded-[10px] transition-colors font-medium mt-4"
                        >
                            Send Code
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default AppForgetPassword
