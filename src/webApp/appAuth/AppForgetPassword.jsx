import { ChevronLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { countryCodes } from '../../webDesk/Auth/CountryCodes';
import { forgotPassword } from '../../Redux-config/slices/authSlice';
import toast from 'react-hot-toast';

const AppForgetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginMethod, setLoginMethod] = useState('phone');
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+966');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countryCodes);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setFilteredCountries(countryCodes);
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const payload = {
                ...(loginMethod === "phone" && { countryCode: data.countryCode }),
                ...(loginMethod === "phone" && { phoneNumber: data.phoneNumber }),
                ...(loginMethod === "email" && { email: data.email }),
            };

            const response = await dispatch(forgotPassword(payload)).unwrap();

            if (response?.error === false && response?.error_code === 200) {
                toast.success(response?.results?.otp);
                navigate("/verify-otp", {
                    state: { data: payload, loginMethod },
                });
            }
        } catch (err) {
            console.error("Forgot Password error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Dynamic Phone Input functions 
    const countryToggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setSearchTerm('');
            setFilteredCountries(countryCodes);
        }
    };

    const selectCountryCode = (code) => {
        setSelectedCountryCode(code);
        setValue('countryCode', code, { shouldValidate: true });
        setIsDropdownOpen(false);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        setFilteredCountries(
            countryCodes.filter(country =>
                country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                country.dial_code.includes(searchValue)
            )
        );
    };

    return (
        <div className='bg-[#ecf8f6]'>
            <div className="min-h-screen flex justify-center items-center w-10/12 mx-auto">
                <div className="space-y-6 bg-white border-2 border-[#e5e5e5] p-4 shadow-md rounded-[10px] relative max-w-md w-full">
                    <div
                        className="w-10 h-10 shadow-2xl absolute top-1 left-1 text-[#009eb4] flex justify-center items-center cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft />
                    </div>
                    <div className="text-center pt-10">
                        <h2 className="text-2xl font-bold text-[#272727] mb-2">Forgot Password</h2>
                        <p className="text-[#272727]">Forgot password? Reset securely and regain access quickly.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Login Method Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
                            <button
                                type="button"
                                onClick={() => setLoginMethod('phone')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'phone'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-[#272727]'
                                    }`}
                            >
                                {loginMethod === "phone" ?
                                    <img src='/resources/icons/phoneActive.svg' alt='phone' /> :
                                    <img src='/resources/icons/call.svg' alt='phone' />
                                }
                                <span>Phone</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginMethod('email')}
                                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${loginMethod === 'email'
                                    ? 'bg-white text-[#009EB4] shadow-sm'
                                    : 'text-[#272727]'
                                    }`}
                            >
                                {loginMethod === "email" ?
                                    <img src='/resources/icons/emailActive.svg' alt='email' /> :
                                    <img src='/resources/icons/email.svg' alt='email' />
                                }
                                <span>Email</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Phone/Email Input */}
                            {loginMethod === 'phone' ? (
                                <div>
                                    <label className="block text-sm font-medium text-[#272727] mb-2">
                                        Phone Number
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-2 w-full relative">
                                        <div className="w-1/3">
                                            <button
                                                type="button"
                                                onClick={countryToggleDropdown}
                                                className={`w-full px-4 py-2 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${errors.countryCode ? "border-red-500 focus:ring-red-200 focus:ring-2" : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
                                                    }`}
                                            >
                                                <span>{selectedCountryCode}</span>
                                                <svg
                                                    className={`w-4 h-4 ml-2 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""
                                                        }`}
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="hidden"
                                                {...register("countryCode", { required: "Country code is required" })}
                                                value={selectedCountryCode}
                                            />
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                                    <div className="sticky top-0 bg-white p-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Search country or code..."
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]"
                                                            value={searchTerm}
                                                            onChange={handleSearch}
                                                        />
                                                    </div>
                                                    <div className="max-h-52 overflow-y-auto">
                                                        {filteredCountries.length > 0 ? (
                                                            filteredCountries.map((country) => (
                                                                <div
                                                                    key={country.code}
                                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                                                                    onClick={() => selectCountryCode(country.dial_code)}
                                                                >
                                                                    <span className="mr-2">{country.flag}</span>
                                                                    <span className="mr-2 font-medium">{country.dial_code}</span>
                                                                    <span className="text-sm text-gray-600">{country.name}</span>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <div className="px-4 py-2 text-gray-500 text-center">No countries found</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                type="tel"
                                                {...register("phoneNumber", {
                                                    required: "Phone number is required",
                                                    pattern: {
                                                        value: /^[0-9]{7,14}$/,
                                                        message: "Invalid phone number",
                                                    },
                                                })}
                                                className={`w-full px-3 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]`}
                                                placeholder="Phone number"
                                            />
                                            {errors.phoneNumber && (
                                                <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                                            )}
                                        </div>
                                    </div>
                                    {errors.countryCode && (
                                        <p className="text-sm text-red-500">{errors.countryCode.message}</p>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-[#272727] mb-2">
                                        Email Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]`}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-block text-center bg-[#009EB4] text-white py-3 px-4 rounded-[10px] transition-colors font-medium mt-4 hover:bg-[#008a9d] disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Sending...' : 'Send Code'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AppForgetPassword;