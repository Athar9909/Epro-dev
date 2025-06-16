import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AppResetPassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className='bg-[#ecf8f6]'>
            <div className="min-h-screen flex justify-center items-center w-10/12 mx-auto">
                <div className="space-y-6 bg-white p-4 rounded-[10px] w-full">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#272727] mb-2">Reset Password</h2>
                        <p className="text-[#272727]">Securely reset your password and regain access.</p>
                    </div>

                    <div className="space-y-4">
                        {/* New Password Input */}
                        <div>
                            <div className="block text-sm font-medium text-[#272727] mb-2">New Password</div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="At least 8 characters"
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#272727]"
                                >
                                    <img
                                        src={showPassword ? '/resources/icons/eye.svg' : '/resources/icons/eye-slash.svg'}
                                        alt="toggle visibility"
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <div className="block text-sm font-medium text-[#272727] mb-2">Confirm Password</div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Re-enter your password"
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#272727]"
                                >
                                    <img
                                        src={showPassword ? '/resources/icons/eye.svg' : '/resources/icons/eye-slash.svg'}
                                        alt="toggle visibility"
                                    />
                                </button>
                            </div>
                        </div>
                        {/*  */}
                        <div>
                            <div className='flex gap-1 text-xs pb-2 text-[#272727]'>
                                <img src='/resourcesApp/iconsApp/checkActive.svg' alt="check-icon" className='w-4' />
                                <p>At least 8–16 characters</p>
                            </div>
                            <div className='flex gap-1 text-xs pb-2 text-[#272727]'>
                                <img src='/resourcesApp/iconsApp/checkActive.svg' alt="check-icon" className='w-4' />
                                <p>Upper & Lowercase: Use both A-Z and a-z</p>
                            </div>
                            <div className='flex gap-1 text-xs pb-2 text-[#272727]'>
                                <img src='/resourcesApp/iconsApp/checkActive.svg' alt="check-icon" className='w-4' />
                                <p>Numbers: Include at least one digit (0-9)</p>
                            </div>
                            <div className='flex gap-1 text-xs pb-2 text-[#272727]'>
                                <img src='/resourcesApp/iconsApp/checkActive.svg' alt="check-icon" className='w-4' />
                                <p>Special Characters: Add @, #, $, %, etc.</p>
                            </div>
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/User-App/Dashboard"
                            className="w-full inline-block text-center bg-[#009EB4] text-white py-4 px-4 rounded-md transition-colors font-medium"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
