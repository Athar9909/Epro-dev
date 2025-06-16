import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AppLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState('phone');
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="min-h-screen bg-[#ecf8f6] flex p-4">

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white border-2 border-[#e5e5e5] sm:ml-4 rounded-container shadow-md rounded-[10px]">
                {/* Login Form */}
                <div className="space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-[#272727] mb-2">Login</h2>
                        <p className="text-gray-[#272727]">Welcome back! Log in to access your account and stay connected</p>
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

                        {/* Password Input */}
                        <div>
                            <div className="block text-sm font-medium text-gray-[#272727] mb-2">Password</div>
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
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-[#272727]"
                                >
                                    {showPassword ?
                                        <img src='/resources/icons/eye-slash.svg' alt='eye-slash.svg' />
                                        :
                                        <img src='/resources/icons/eye-slash.svg' alt='eye-slash.svg' />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#009EB4] border-gray-300 rounded focus:ring-teal-600"
                                />
                                <span className="ml-2 text-sm text-gray-[#272727]">Keep me logged In</span>
                            </div>
                            <Link
                             to="/User-App/Forgot-Password"
                             className="text-sm text-[#009EB4] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <Link
                            to="/User-App/Dashboard"
                            type="button"
                            className="w-full inline-block text-center bg-[#009EB4] text-white py-4 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors font-medium"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Alternative Login Methods */}
                    <div className="space-y-3">
                        <div className="text-center text-sm text-gray-[#272727] flex justify-center items-center gap-2">
                            <hr className='w-1/2' />
                            Or
                            <hr className='w-1/2' />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                                <img src='/resources/icons/nafat.svg' alt='nafat.svg' />

                                <span className="text-sm font-medium text-gray-[#272727]">Login with Nafath</span>
                            </button>

                            <button className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                                <img src='/resources/icons/guest.svg' alt='guest.svg' />

                                <span className="text-sm font-medium text-gray-[#272727]">Login as Guest</span>
                            </button>
                        </div>
                        <div className='text-center text-gray-[#272727]'>
                            <p>Don't have an account?<Link className='text-[#009EB4] pl-2'>Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}