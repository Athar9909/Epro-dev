import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
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
        <div className="min-h-screen bg-[#fefefe] flex p-4">
            {/* Left Side - Hero Section */}
            <div className=" hidden md:flex lg:w-1/2 bg-gradient-to-br from-[#009EB4] to-teal-500 relative overflow-hidden rounded-container shadow-md">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="relative z-10 flex flex-col justify-between p-8 text-white">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="  rounded-xl w-full flex items-center justify-center">
                            <img src='/resources/logo/logo-bg-white.svg' alt='logo.svg' />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex items-center">
                        <div className="max-w-md">
                            <h1 className="text-4xl font-bold mb-4">Find What You Need</h1>
                            <p className="text-lg opacity-90">
                                Browse over 1,000 curated categories to find top-quality Products tailored for your business.
                            </p>
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex space-x-2">
                        <div className="w-8 h-2 bg-white rounded-full"></div>
                        <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                        <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                        <div className="w-2 h-2 bg-white bg-opacity-50 rounded-full"></div>
                    </div>
                </div>

                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#009EB4]/80 to-teal-500/80"></div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white border-2 border-[#e5e5e5] sm:ml-4 rounded-container shadow-md">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center space-x-2 mb-8">
                        <div className="  rounded-xl w-full flex items-center justify-center">
                            <img src='/resources/logo/logo-bg-white.svg' alt='logo.svg' />
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="flex justify-start sm:justify-between mb-8 flex-wrap gap-2 flex-col-reverse sm:flex-row">
                        <div className="flex items-center justify-between sm:justify-start space-x-2 text-sm text-gray-600 bg-[#e7e7e7] p-2 rounded-btn">
                            <img src='/resources/icons/language.svg' alt='language.svg' />
                            <span>English ▼</span>
                        </div>
                        <div className="text-sm bg-[#e7e7e7] py-4 px-2 rounded-btn">
                            <span className="text-gray-600">Don't have an account? </span>
                            <Link to="/Sign-Up/Process-one" className="text-[#009EB4] hover:underline">Signup</Link>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login to your Account</h2>
                            <p className="text-gray-600">Welcome back! Please sign in to your existing account</p>
                        </div>

                        {/* Login Method Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setLoginMethod('phone')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'phone'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-gray-600 hover:text-gray-800'
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
                                    : 'text-gray-600 hover:text-gray-800'
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
                                <div className="block text-sm font-medium text-gray-700 mb-2">
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
                                <div className="block text-sm font-medium text-gray-700 mb-2">Password</div>
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
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </div>
                                <button type="button" className="text-sm text-[#009EB4] hover:underline">
                                    Forgot password?
                                </button>
                            </div>

                            {/* Login Button */}
                            <Link
                                to="/Dashboard"
                                type="button"
                                className="w-full inline-block text-center bg-[#009EB4] text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors font-medium"
                            >
                                Login
                            </Link>
                        </div>

                        {/* Alternative Login Methods */}
                        <div className="space-y-3">
                            <div className="text-center text-sm text-gray-500 flex justify-center items-center gap-2">
                                <hr className='w-1/3' />
                                or Continue with
                                <hr className='w-1/3' />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                                    <img src='/resources/icons/nafat.svg' alt='nafat.svg' />

                                    <span className="text-sm font-medium text-gray-700">Login with Nafath</span>
                                </button>

                                <button className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
                                    <img src='/resources/icons/guest.svg' alt='guest.svg' />

                                    <span className="text-sm font-medium text-gray-700">Login as Guest</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 pt-4">
                            <button className="hover:text-gray-700">Privacy Policy</button>
                            <span>•</span>
                            <button className="hover:text-gray-700">Terms & Condition</button>
                            <span>•</span>
                            <button className="hover:text-gray-700">Privacy Policy</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}