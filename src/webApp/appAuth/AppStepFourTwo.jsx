import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { Calendar, Camera, Check, ChevronDown, Eye, EyeClosed, MapPin, Upload } from "lucide-react";
import { countryCodes } from "../../webDesk/Auth/CountryCodes";
import { useSelector } from "react-redux";

const AppStepFourTwo = ({ setCurrentStep }) => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [createStep, setCreateStep] = useState(1);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+966');
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [uploadOption, setUploadOption] = useState('later');
    const [customerDetailsOption, setCustomerDetailsOption] = useState('later');
    const [filteredCountries, setFilteredCountries] = useState(countryCodes);
    const registerData = useSelector((state) => state.misc.registerData);


    const steps = [
        { id: 1, title: "STEP 01", label: "Company-Details" },
        { id: 2, title: "STEP 02", label: "Additional-Details" },
        { id: 3, title: "STEP 03", label: "Documents-Details" }
    ];

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            // Step 1 fields
            companyName: "",
            companyTagline: "",
            phoneNumber: registerData?.phone || "",
            countryCode: registerData?.countryCode || "+966",
            email: registerData?.email || "",
            foundingDate: "",
            about: "",
            password: "",
            confirmPassword: "",

            // Step 2 fields
            location: "",
            city: "",
            country: "",
            zipCode: "",
            companyType: "",
            iktvaMember: "",
            companySize: "",
            industry: "",
            websiteLink: "",
            cr: "",
            aboutUs: "",

            // Step 3 fields
            projectName: "",
            projectDescription: "",
            completionDate: "",
            customerProjectName: "",
            agreeTerms: false
        },
    });

    const password = watch("password");
    const formData = watch();

    const onSubmit = async (data) => {
        if (!agreeToTerms) return;

        try {
            // Combine all form data with the image
            const finalData = {
                ...data,
                profilePhoto: image,
                uploadOption,
                customerDetailsOption
            };

            console.log("Final Data:", finalData);

            // Here you would call your API
            // const response = await fetch('your-api-endpoint', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(finalData),
            // });

            // if (!response.ok) throw new Error('API call failed');

            // Proceed to next step if API call is successful
            setCurrentStep((prev) => prev + 1);
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle error (show error message to user, etc.)
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const StepIndicator = ({ steps, currentStep }) => (
        <div className="flex justify-center my-4 items-center gap-4 flex-wrap ">
            {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                    <div className="flex flex-row items-center gap-2">
                        <div
                            className={`w-6 h-6 relative top-[3px] rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${step.id === currentStep
                                ? "bg-[#F4C63B] text-white shadow-lg scale-110"
                                : step.id < currentStep
                                    ? "bg-[#F4C63B] text-white"
                                    : "bg-gray-200 text-gray-500"
                                }`}
                        >
                            {step.id < currentStep ? <Check size={16} /> : step.id}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`h-[2px] flex-1 w-10 max-w-[80px] bg-[#F4C63B]`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );

    // Dynamic Phone Input functions
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setSearchTerm('');
        }
    };

    const selectCountryCode = (code) => {
        setSelectedCountryCode(code);
        setValue('countryCode', code, { shouldValidate: true });
        setIsDropdownOpen(false);
    };

    const countryCodeValidation = {
        required: "Country code is required",
        validate: value => countryCodes.some(c => c.dial_code === value) || "Invalid country code"
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

    const nextStep = () => {
        // Validate current step before proceeding
        if (createStep === 1) {
            const requiredFields = ['companyName', 'companyTagline', 'phoneNumber', 'email', 'foundingDate', 'about', 'password', 'confirmPassword'];
            const isValidStep = requiredFields.every(field => formData[field] && !errors[field]);

            if (!isValidStep) {
                // You might want to show error messages here
                return;
            }
        } else if (createStep === 2) {
            const requiredFields = ['location', 'city', 'country', 'companyType', 'companySize', 'industry'];
            const isValidStep = requiredFields.every(field => formData[field] && !errors[field]);

            if (!isValidStep) {
                return;
            }
        }

        setCreateStep(prev => Math.min(prev + 1, steps.length));
    };

    const prevStep = () => {
        setCreateStep(prev => Math.max(prev - 1, 1));
    };

    const renderViewScreen = () => {
        switch (createStep) {
            case 1:
                return (
                    <div className="max-w-[640px] mx-auto p-4 rounded-[16px] bg-white">
                        <div className="">
                            {/* Profile Photo Upload */}
                            <div className="mb-8">
                                <label className="block text-gray-700 text-[24px] font-bold text-center">
                                    Create Profile
                                </label>
                                <p className="text-[14px] text-gray-600 my-1 text-center">
                                    Create a new account & start exploring
                                </p>
                                <StepIndicator steps={steps} currentStep={createStep} />
                                <div className="flex items-center justify-center">
                                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-[#009EB41A]">
                                        {uploading ? (
                                            <div className="flex items-center justify-center w-full h-full">
                                                <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                                            </div>
                                        ) : image ? (
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full">
                                                <Camera className="text-[#009EB4]" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                                <InputField
                                    label="First Name"
                                    error={errors.firstName}
                                    register={register("firstName", {
                                        required: "First name is required",
                                    })}
                                />
                                <InputField
                                    label="Company Tagline"
                                    error={errors.companyTagline}
                                    register={register("companyTagline", {
                                        required: "Company tagline is required",
                                    })}
                                />

                                {/* Phone Number */}
                                {
                                    registerData?.phone && registerData?.countryCode ?
                                        (
                                            <>
                                                <div>
                                                    <div className="flex gap-2 w-full">
                                                        <InputField
                                                            type="text"
                                                            label="Country Code"
                                                            disabled={!!registerData?.countryCode}
                                                            register={register("countryCode", {
                                                                required: "Country code is required"
                                                            })}
                                                            showValid={!!registerData?.countryCode && !errors.countryCode}

                                                        />
                                                        <InputField
                                                            type="tel"
                                                            name="phoneNumber"
                                                            label={"Phone Number"}
                                                            disabled={!!registerData?.phone}
                                                            error={errors.phoneNumber}
                                                            register={register("phoneNumber", {
                                                                required: "Phone number is required",
                                                                pattern: {
                                                                    value: /^[0-9]{7,14}$/,
                                                                    message: "Invalid phone number",
                                                                },
                                                            })}
                                                            showValid={!!registerData?.phone && !errors.phoneNumber}

                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Phone Number
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex gap-2 w-full relative">
                                                        <div className=" w-1/3">
                                                            <button
                                                                type="button"
                                                                onClick={toggleDropdown}
                                                                className={`w-full px-4 py-3 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${errors.countryCode ? "border-red-500 focus:ring-red-200 focus:ring-2" : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
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
                                                        <InputField
                                                            type="tel"
                                                            name="phoneNumber"
                                                            error={errors.phoneNumber}
                                                            register={register("phoneNumber", {
                                                                required: "Phone number is required",
                                                                pattern: {
                                                                    value: /^[0-9]{7,14}$/,
                                                                    message: "Invalid phone number",
                                                                },
                                                            })}
                                                        />
                                                    </div>
                                                    {errors.countryCode && (
                                                        <p className="text-sm text-red-500">{errors.countryCode.message}</p>
                                                    )}
                                                </div>
                                            </>
                                        )
                                }

                                {/* Email Address */}
                                <InputField
                                    type="email"
                                    label="Email Address"
                                    error={errors.email}
                                    register={register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    disabled={!!registerData?.email}
                                    showValid={!!registerData?.email && !errors.email}
                                />

                                {/* Founding Date */}
                                <InputField
                                    type="date"
                                    label="Founding Date"
                                    error={errors.foundingDate}
                                    register={register("foundingDate", {
                                        required: "Founding date is required",
                                        valueAsDate: true
                                    })}
                                />

                                {/* About */}
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        About You
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about yourself..."
                                        className={`w-full px-4 py-3 border ${errors.about ? "border-red-500" : "border-gray-300"
                                            } rounded-[10px] focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                                        {...register("about", {
                                            required: "About section is required",
                                            minLength: {
                                                value: 10,
                                                message: "Minimum 10 characters",
                                            },
                                        })}
                                    />
                                    {errors.about && (
                                        <span className="text-sm text-red-500">
                                            {errors.about.message}
                                        </span>
                                    )}
                                </div>

                                {/* password */}
                                <div className="relative">
                                    <InputField
                                        type={showPassword ? "text" : "password"}
                                        label="Password"
                                        error={errors.password}
                                        register={register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Minimum 8 characters",
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message: "Must include uppercase, lowercase, number, and special character"
                                            }
                                        })}
                                    />
                                    <div className={`absolute right-3 top-1/2 transform  text-gray-400 ${errors?.password ? '-translate-y-1/2' : '-translate-y-1'}`}
                                        onClick={() => setShowPassword(!showPassword)}>
                                        {/* <img src={icon} alt="icon" /> */}
                                        {
                                            showPassword ? <Eye size={30} /> : <EyeClosed size={28} />
                                        }
                                    </div>
                                </div>

                                {/* Confirm password */}
                                <div className="relative">
                                    <InputField
                                        type={showConfirmPassword ? "text" : "password"}
                                        label="Confirm Password"
                                        error={errors.confirmPassword}
                                        register={register("confirmPassword", {
                                            required: "Confirm your password",
                                            validate: (val) =>
                                                val === password || "Passwords do not match",
                                        })}
                                    />
                                    <div className={`absolute right-3 top-1/2 transform  text-gray-400 ${errors?.confirmPassword ? '-translate-y-1/2' : '-translate-y-1'}`}
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {/* <img src={icon} alt="icon" /> */}
                                        {
                                            showConfirmPassword ? <Eye size={30} /> : <EyeClosed size={28} />
                                        }
                                    </div>
                                </div>

                                {/* Terms Agreement */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="agreeToTerms"
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                                        I agree to the terms and conditions
                                    </label>
                                </div>

                                {/* Next Button */}
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`w-full px-6 py-3 text-white rounded-[10px] font-medium hover:opacity-90 transition-opacity ${!isValid || !agreeToTerms
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#009EB4]"
                                        }`}
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 max-w-[640px] mx-auto p-4 rounded-[16px] bg-white">
                        <div className="flex items-center justify-center flex-col">
                            <label className="block text-gray-700 text-[20px] font-bold text-center">
                                Create Profile
                            </label>
                            <p className="text-[12px] text-gray-600 my-1 text-center">
                                Create a new account & start exploring
                            </p>
                            <StepIndicator steps={steps} currentStep={createStep} />
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white bg-[#009EB41A]">
                                {uploading ? (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                                    </div>
                                ) : image ? (
                                    <img
                                        src={image}
                                        alt="Preview"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full">
                                        <Camera className="text-[#009EB4]" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#272727] mb-2">Company Name</label>
                                <input
                                    {...register('companyName', { required: 'Company name is required' })}
                                    className="w-full p-3 border border-[#009eb4] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#272727] mb-2">Company Tagline</label>
                                <input
                                    {...register('companyTagline')}
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Phone Number</label>
                            <div className="flex">
                                <select
                                    {...register('countryCode')}
                                    className="p-3 border border-[#e5e5e5] rounded-l-lg bg-white focus:border-[#009eb4] focus:outline-none"
                                >
                                    <option>🇸🇦 +966</option>
                                </select>
                                <input
                                    {...register('phoneNumber', { required: 'Phone number is required' })}
                                    className="flex-1 p-3 border-t border-r border-b border-[#e5e5e5] rounded-r-lg focus:border-[#009eb4] focus:outline-none"
                                />
                            </div>
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Email Address</label>
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                                })}
                                type="email"
                                className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                disabled={registerData?.email}
                            />
                            {registerData?.email && (
                                <span className="text-sm text-green-600">✓</span>
                            )}
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Founding Date</label>
                            <div className="relative">
                                <input
                                    {...register('foundingDate', { required: 'Founding date is required' })}
                                    type="date"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none pr-10"
                                />
                                <Calendar className="absolute right-3 top-3 text-[#A8A8A8]" size={20} />
                            </div>
                            {errors.foundingDate && <p className="text-red-500 text-sm">{errors.foundingDate.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Location</label>
                            <div className="relative">
                                <input
                                    {...register('location', { required: 'Location is required' })}
                                    placeholder="Eg. Palm Jumeirah"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none pr-10"
                                />
                                <MapPin className="absolute right-3 top-3 text-[#A8A8A8]" size={20} />
                            </div>
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#272727] mb-2">City</label>
                                <input
                                    {...register('city', { required: 'City is required' })}
                                    placeholder="Eg. Riyadh"
                                    className="w-full p-3 border border-[#009eb4] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="block text-[#272727] mb-2">Country</label>
                                <input
                                    {...register('country', { required: 'Country is required' })}
                                    placeholder="Eg. Saudi Arabia"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Zip Code</label>
                            <div className="relative">
                                <input
                                    {...register('zipCode', { required: 'Zip code is required' })}
                                    placeholder="Eg. 12345"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none pr-10"
                                />
                                <MapPin className="absolute right-3 top-3 text-[#A8A8A8]" size={20} />
                            </div>
                            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Type</label>
                            <div className="relative">
                                <select
                                    {...register('companyType', { required: 'Company type is required' })}
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none appearance-none bg-white"
                                >
                                    <option value="">Select type</option>
                                    <option value="corporation">Corporation</option>
                                    <option value="llc">LLC</option>
                                    <option value="partnership">Partnership</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 text-[#A8A8A8]" size={20} />
                            </div>
                            {errors.companyType && <p className="text-red-500 text-sm">{errors.companyType.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#272727] mb-2">IKTVA Member</label>
                                <input
                                    {...register('iktvaMember')}
                                    placeholder="Eg. Yes/No"
                                    className="w-full p-3 border border-[#009eb4] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#272727] mb-2">Company Size</label>
                                <input
                                    {...register('companySize', { required: 'Company size is required' })}
                                    placeholder="Eg. 100-500"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.companySize && <p className="text-red-500 text-sm">{errors.companySize.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Industry</label>
                            <div className="relative">
                                <select
                                    {...register('industry', { required: 'Industry is required' })}
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none appearance-none bg-white"
                                >
                                    <option value="">Select industry</option>
                                    <option value="technology">Technology</option>
                                    <option value="healthcare">Healthcare</option>
                                    <option value="finance">Finance</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 text-[#A8A8A8]" size={20} />
                            </div>
                            {errors.industry && <p className="text-red-500 text-sm">{errors.industry.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">Website Link</label>
                            <input
                                {...register('websiteLink', {
                                    pattern: {
                                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                        message: 'Please enter a valid URL'
                                    }
                                })}
                                type="url"
                                className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                            />
                            {errors.websiteLink && <p className="text-red-500 text-sm">{errors.websiteLink.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">CR</label>
                            <input
                                {...register('cr', { required: 'CR number is required' })}
                                className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                            />
                            {errors.cr && <p className="text-red-500 text-sm">{errors.cr.message}</p>}
                        </div>

                        <div>
                            <label className="block text-[#272727] mb-2">About Us</label>
                            <textarea
                                {...register('aboutUs', {
                                    required: 'About us is required',
                                    minLength: {
                                        value: 20,
                                        message: 'Minimum 20 characters required'
                                    }
                                })}
                                rows="4"
                                className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none resize-none"
                            />
                            {errors.aboutUs && <p className="text-red-500 text-sm">{errors.aboutUs.message}</p>}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 bg-white border border-[#e5e5e5] text-[#272727] py-3 rounded-[10px] font-medium hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="flex-1 bg-[#009eb4] text-white py-3 rounded-[10px] font-medium hover:bg-[#007a8c] transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 max-w-[640px] mx-auto p-4 rounded-[16px] bg-white">
                        <div className="flex items-center justify-center flex-col">
                            <label className="block text-gray-700 text-[20px] font-bold text-center">
                                Create Profile
                            </label>
                            <p className="text-[12px] text-gray-600 my-1 text-center">
                                Create a new account & start exploring
                            </p>
                            <StepIndicator steps={steps} currentStep={createStep} />
                        </div>

                        <div>
                            <p className="text-[#272727] mb-4">Would you like to upload your projects?</p>
                            <div className="flex gap-4 mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            value="now"
                                            checked={uploadOption === 'now'}
                                            onChange={(e) => setUploadOption(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 ${uploadOption === 'now' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                                            } flex items-center justify-center`}>
                                            {uploadOption === 'now' && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <span className="ml-2 text-[#272727]">Yes, Upload Now</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            value="later"
                                            checked={uploadOption === 'later'}
                                            onChange={(e) => setUploadOption(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 ${uploadOption === 'later' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                                            } flex items-center justify-center`}>
                                            {uploadOption === 'later' && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <span className="ml-2 text-[#272727]">No, Upload later</span>
                                </label>
                            </div>
                        </div>

                        {uploadOption === 'now' && (
                            <div className="space-y-4">
                                <input
                                    {...register('projectName', { required: 'Project name is required' })}
                                    placeholder="Project Name"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}

                                <textarea
                                    {...register('projectDescription', { required: 'Project description is required' })}
                                    placeholder="Project Description"
                                    rows="3"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none resize-none"
                                />
                                {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}

                                <input
                                    {...register('completionDate', { required: 'Completion date is required' })}
                                    placeholder="Completion Date"
                                    type="date"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.completionDate && <p className="text-red-500 text-sm">{errors.completionDate.message}</p>}

                                <div className="border border-[#e5e5e5] rounded-[10px] p-4 bg-[#FFF9E6]">
                                    <div className="flex items-center">
                                        <Upload className="text-[#F4C63B] mr-3" size={20} />
                                        <div>
                                            <p className="font-medium text-[#272727]">Upload file</p>
                                            <p className="text-sm text-[#A8A8A8]">Select and upload a PNG image.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="text-[#009eb4] font-medium flex items-center"
                                >
                                    <span className="mr-2">+</span> Add More
                                </button>
                            </div>
                        )}

                        <div>
                            <p className="text-[#272727] mb-4">Would you like to upload customer Details?</p>
                            <div className="flex gap-4 mb-6">
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            value="now"
                                            checked={customerDetailsOption === 'now'}
                                            onChange={(e) => setCustomerDetailsOption(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 ${customerDetailsOption === 'now' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                                            } flex items-center justify-center`}>
                                            {customerDetailsOption === 'now' && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <span className="ml-2 text-[#272727]">Yes, Upload Now</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            value="later"
                                            checked={customerDetailsOption === 'later'}
                                            onChange={(e) => setCustomerDetailsOption(e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 ${customerDetailsOption === 'later' ? 'border-[#009eb4] bg-[#009eb4]' : 'border-[#e5e5e5]'
                                            } flex items-center justify-center`}>
                                            {customerDetailsOption === 'later' && <Check size={12} className="text-white" />}
                                        </div>
                                    </div>
                                    <span className="ml-2 text-[#272727]">No, Upload later</span>
                                </label>
                            </div>
                        </div>

                        {customerDetailsOption === 'now' && (
                            <div className="space-y-4">
                                <input
                                    {...register('customerProjectName', { required: 'Customer project name is required' })}
                                    placeholder="Project Name"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.customerProjectName && <p className="text-red-500 text-sm">{errors.customerProjectName.message}</p>}

                                <button
                                    type="button"
                                    className="text-[#009eb4] font-medium flex items-center"
                                >
                                    <span className="mr-2">+</span> Add More
                                </button>
                            </div>
                        )}

                        <div>
                            <p className="text-[#272727] mb-4">Trade License</p>
                            <div className="border border-[#e5e5e5] rounded-[10px] p-4 bg-[#FFF9E6]">
                                <div className="flex items-center">
                                    <Upload className="text-[#F4C63B] mr-3" size={20} />
                                    <div>
                                        <p className="font-medium text-[#272727]">Upload file</p>
                                        <p className="text-sm text-[#A8A8A8]">Select and upload a PNG image.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[#272727] mb-2">Password</label>
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 8, message: 'Password must be at least 8 characters' }
                                    })}
                                    type="password"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label className="block text-[#272727] mb-2">Confirm Password</label>
                                <input
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value => value === watch('password') || 'Passwords do not match'
                                    })}
                                    type="password"
                                    className="w-full p-3 border border-[#e5e5e5] rounded-[10px] focus:border-[#009eb4] focus:outline-none"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                {...register('agreeTerms', { required: 'You must agree to the terms' })}
                                type="checkbox"
                                className="w-5 h-5 text-[#F4C63B] border-[#e5e5e5] rounded focus:ring-[#009eb4]"
                            />
                            <label className="ml-2 text-[#272727]">
                                I agree to the <span className="text-[#009eb4]">Terms</span> & <span className="text-[#009eb4]">Privacy Policy</span>
                            </label>
                        </div>
                        {errors.agreeTerms && <p className="text-red-500 text-sm">{errors.agreeTerms.message}</p>}

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="flex-1 bg-white border border-[#e5e5e5] text-[#272727] py-3 rounded-[10px] font-medium hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit(onSubmit)}
                                className="flex-1 bg-[#009eb4] text-white py-3 rounded-[10px] font-medium hover:bg-[#007a8c] transition-colors"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="w-full mx-auto bg-white rounded-xl shadow-lg">
                {renderViewScreen()}
            </div>
        </div>
    );
};

// Reusable InputField Component
const InputField = ({ label, type = "text", error, register, showValid = false, placeholder, disabled }) => (
    <div className="w-full">
        {label && (
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>
        )}
        <div className="w-full relative"
        >
            <input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${error ? "border-red-500 focus:ring-red-200"
                    : showValid && !error ? "border-green-500 focus:ring-green-200"
                        : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420]"
                    } ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
                {...register}
                onClick={(e) => {
                    console.log("Input clicked", e.target.type);
                    e.target.showPicker(); // Manually trigger the date picker (modern browsers)
                }}
            />
            {showValid && !error && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                    ✓
                </div>
            )}
        </div>
        {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
);

export default AppStepFourTwo;