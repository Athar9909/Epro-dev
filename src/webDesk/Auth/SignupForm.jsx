import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        email: 'info@techgropse.com',
        about: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        countryCode: '+966'
    });

    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header with Progress Steps */}
            <div className="w-full px-4 py-6 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 md:mb-8">
                        Company Sign Up Process
                    </h1>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 md:mb-12">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: '#009EB4' }}>
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Step 01</span>
                        </div>

                        <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: '#009EB4' }}>
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Step 02</span>
                        </div>

                        <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: '#009EB4' }}>
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Step 03</span>
                        </div>

                        <div className="flex-1 h-px bg-gray-300 mx-4"></div>

                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                                style={{ backgroundColor: '#009EB4' }}>
                                ✓
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">Step 04</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form Container */}
            <div className="px-4 md:px-8 pb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg p-6 md:p-8">

                        {/* Profile Photo Section */}
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-2 border-[#D9D9D9] border-dashed px-4 py-4 sm:py-2 rounded-container bg-[#f7f7f7]">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-20 sm:w-26 h-16 sm:h-26 rounded-full flex items-center justify-center text-white bg-[#f7f7f7] border-3 border-white">
                                        <img src="/resources/icons/add.svg" alt='add-icon' className='absolute -bottom-1 -right-1' />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 text-2xl">Profile Photo</h3>
                                        <p className="text-[10px] text-gray-600">Select document or recommended PNG or JPG is allowed</p>
                                    </div>
                                </div>
                                <button
                                    className="px-6 py-2 text-white rounded-btn text-sm font-medium hover:opacity-90 transition-opacity flex gap-2"
                                    style={{ backgroundColor: '#009EB4' }}
                                >
                                    <img src="/resources/icons/upload.svg" alt='upload-icon' />
                                    <span>
                                        Upload
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="Enter here"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10"
                                            style={{ focusRingColor: '#009EB4' }}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <img src="/resources/icons/user.svg" alt='user-icon' />
                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            placeholder="At least 8 characters"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10 pr-10"
                                            style={{ focusRingColor: '#009EB4' }}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <img src="/resources/icons/lock.svg" alt='lock-icon' />

                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                                            <img src="/resources/icons/eye-slash.svg" alt='eye-slash-icon' />

                                        </div>
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10 pr-10"
                                            style={{ focusRingColor: '#009EB4' }}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <img src="/resources/icons/email.svg" alt='email-icon' />

                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
                                                style={{ backgroundColor: '#009EB4' }}>
                                                ✓
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <div className="flex gap-2">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            className="px-3 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent"
                                            style={{ focusRingColor: '#009EB4' }}
                                        >
                                            <option value="+966">+966</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                        </select>
                                        <div className="flex-1 relative">
                                            <input
                                                type="tel"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter here"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10"
                                                style={{ focusRingColor: '#009EB4' }}
                                            />
                                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                <img src="/resources/icons/phone.svg" alt='phone-icon' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    About
                                </label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    placeholder="Minimum 500 words"
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent resize-none"
                                    style={{ focusRingColor: '#009EB4' }}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="At least 8 characters"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10 pr-10"
                                            style={{ focusRingColor: '#009EB4' }}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <img src="/resources/icons/lock.svg" alt='lock-icon' />

                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                                            <img src="/resources/icons/eye-slash.svg" alt='eye-slash-icon' />

                                        </div>
                                    </div>
                                </div>

                                {/* Confirm Password (Second) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="confirmPassword2"
                                            placeholder="At least 8 characters"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-btn focus:ring-2 focus:ring-opacity-50 focus:border-transparent pl-10 pr-10"
                                            style={{ focusRingColor: '#009EB4' }}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <img src="/resources/icons/lock.svg" alt='lock-icon' />

                                        </div>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                                            <img src="/resources/icons/eye-slash.svg" alt='eye-slash-icon' />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300"
                                    style={{ accentColor: '#009EB4' }}
                                />
                                <label htmlFor="terms" className="text-sm text-gray-700">
                                    I agree to the Terms of Service & Privacy Policy
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <button
                                    type="button"
                                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-btn font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <Link
                                to="/Sign-Up/Subscription"
                                    className="flex-1 px-6 py-3 text-white rounded-btn font-medium hover:opacity-90 transition-opacity text-center"
                                    style={{ backgroundColor: '#009EB4' }}
                                    disabled={!agreeToTerms}
                                >
                                    Continue
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}