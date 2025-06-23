import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux-config/slices/authSlice';
import toast from 'react-hot-toast';
import { countryCodes } from '../../webDesk/Auth/CountryCodes';

export default function AppLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loginMethod, setLoginMethod] = useState('phone');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+966');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countryCodes);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
        trigger
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            phone: '',
            email: '',
            password: '',
            rememberMe: false,
            countryCode: '+966'
        }
    });

    const rememberMe = watch('rememberMe');

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...(loginMethod === "phone" && {
                    countryCode: data.countryCode,
                    phoneNumber: data.phone
                }),
                ...(loginMethod === "email" && { email: data.email }),
                password: data.password,
            };

            if (rememberMe) {
                localStorage.setItem(
                    "savedCredentials",
                    JSON.stringify({
                        phone: data.phone,
                        email: data.email,
                        password: data.password,
                        countryCode: data.countryCode,
                        rememberMe: true,
                    })
                );
            } else {
                localStorage.removeItem("savedCredentials");
            }

            const response = await dispatch(loginUser(payload)).unwrap();
            if (response?.error === false && response?.error_code === 200) {
                navigate("/User-App/Homepage");
            }
        } catch (err) {
            console.error("Login error:", err);
        }
    };

    const handleLoginMethodChange = (method) => {
        setLoginMethod(method);
        trigger();
    };

    const toggleDropdown = () => {
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

    const countryCodeValidation = {
        required: "Country code is required",
        validate: value => countryCodes.some(c => c.dial_code === value) || "Invalid country code"
    };

    return (
        <div className="min-h-screen bg-[#ecf8f6] flex p-4">
            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-white border-2 border-[#e5e5e5] sm:ml-4 rounded-container shadow-md rounded-[10px]">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-[#272727] mb-2">Login</h2>
                        <p className="text-gray-[#272727]">Welcome back! Log in to access your account and stay connected</p>
                    </div>

                    {/* Login Method Toggle */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        <button
                            type="button"
                            onClick={() => handleLoginMethodChange('phone')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-[10px] text-sm font-medium transition-colors ${loginMethod === 'phone'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-[#272727]'
                                }`}
                        >
                            {loginMethod === "phone" ? (
                                <img src='/resources/icons/phoneActive.svg' alt='phone.svg' />
                            ) : (
                                <img src='/resources/icons/call.svg' alt='phone.svg' />
                            )}
                            <span>Phone</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleLoginMethodChange('email')}
                            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-[10px] text-sm font-medium transition-colors ${loginMethod === 'email'
                                ? 'bg-white text-[#009EB4] shadow-sm'
                                : 'text-gray-[#272727]'
                                }`}
                        >
                            {loginMethod === "email" ? (
                                <img src='/resources/icons/emailActive.svg' alt='email.svg' />
                            ) : (
                                <img src='/resources/icons/email.svg' alt='email.svg' />
                            )}
                            <span>Email</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Phone/Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-[#272727] mb-2">
                                {loginMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                                <span className="text-red-500">*</span>
                            </label>
                            {loginMethod === 'phone' ? (
                                <div className="flex flex-col gap-2">
                                    <div className="flex w-full relative gap-2">
                                        <div className="w-1/3">
                                            <button
                                                type="button"
                                                onClick={toggleDropdown}
                                                className={`w-full px-4 py-3 border rounded-[10px] focus:outline-none transition text-left flex items-center justify-between ${errors.countryCode ? "border-red-500 focus:ring-red-200 focus:ring-2" : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
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
                                                {...register("countryCode", countryCodeValidation)}
                                                value={selectedCountryCode}
                                            />
                                            {isDropdownOpen && (
                                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-[10px] shadow-lg">
                                                    <div className="sticky top-0 bg-white p-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Search country or code..."
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]"
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
                                        <input
                                            type="tel"
                                            {...register('phone', {
                                                required: loginMethod === 'phone' ? 'Phone number is required' : false,
                                                pattern: {
                                                    value: /^[0-9]{7,15}$/,
                                                    message: 'Please enter a valid phone number'
                                                }
                                            })}
                                            placeholder="Enter your phone number"
                                            className={`flex-1 px-3 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]-transparent ${errors.phone ? 'border-red-500' : ''
                                                }`}
                                        />
                                    </div>
                                    {errors.countryCode && (
                                        <p className="mt-1 text-sm text-red-500">{errors.countryCode.message}</p>
                                    )}
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="email"
                                        {...register('email', {
                                            required: loginMethod === 'email' ? 'Email is required' : false,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Please enter a valid email address'
                                            }
                                        })}
                                        placeholder="Enter your email"
                                        className={`w-full px-3 py-3 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]-transparent ${errors.email ? 'border-red-500' : ''
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-[#272727] mb-2">
                                Password<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        }
                                    })}
                                    placeholder="At least 8 characters"
                                    className={`w-full px-3 py-3 pr-10 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#009EB420] focus:border-[#009EB4]-transparent ${errors.password ? 'border-red-500' : ''
                                        }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-[#272727]"
                                >
                                    <img
                                        src={showPassword ?
                                            '/resources/icons/eye-slash.svg' :
                                            '/resources/icons/eye.svg'}
                                        alt={showPassword ? 'hide password' : 'show password'}
                                    />
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="w-4 h-4 text-[#009EB4] border-gray-300 rounded focus:ring-teal-600"
                                />
                                <span className="ml-2 text-sm text-gray-[#272727]">Keep me logged In</span>
                            </div>
                            <Link
                                to="/User-App/Forgot-Password"
                                className="text-sm text-[#009EB4] hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={!isValid}
                            className={`w-full inline-block text-center bg-[#009EB4] text-white py-4 px-4 rounded-[10px]  focus:outline-none transition-colors font-medium ${!isValid ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            Login
                        </button>
                    </div>

                    {/* Alternative Login Methods */}
                    <div className="space-y-3">
                        <div className="text-center text-sm text-gray-[#272727] flex justify-center items-center gap-2">
                            <hr className='w-1/2' />
                            Or
                            <hr className='w-1/2' />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                <img src='/resources/icons/nafat.svg' alt='nafat.svg' />
                                <span className="text-sm font-medium text-gray-[#272727]">Login with Nafath</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                <img src='/resources/icons/guest.svg' alt='guest.svg' />
                                <span className="text-sm font-medium text-gray-[#272727]">Login as Guest</span>
                            </button>
                        </div>
                        <div className='text-center text-gray-[#272727]'>
                            <p>Don't have an account?
                                <Link to="/" className='text-[#009EB4] pl-2 hover:underline'>
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}