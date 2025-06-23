import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";
import { SendOTPRegister } from "../../Redux-config/slices/authSlice";
import { countryCodes } from '../../webDesk/Auth/CountryCodes';
import { useNavigate } from 'react-router-dom';
import { setUserType } from '../../Redux-config/apisModel/apiService';
import toast from 'react-hot-toast';

const AppStepTwo = ({ setCurrentStep }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+966');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(countryCodes);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    trigger,
    setValue,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange"
  });

  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.misc.registerData);
  let type = registerData?.userVerifyType;
  const value = watch(type);
  let userType = registerData?.userType

  useEffect(() => {
    setUserType(userType || "buyer");
    if (userType === "") {
      navigate("/");
    }
  }, [userType]);

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
      ))
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data?.email,
        ...(type === "phone" && { countryCode: data?.countryCode }),
        ...(type === "phone" && { phoneNumber: data?.phone }),
      };

      const response = await dispatch(SendOTPRegister(payload)).unwrap();

      if (response?.error === false && response?.error_code === 200) {
        dispatch(
          setRegisterData({
            ...registerData,
            ...data,
            user_id: response?.results?.user?._id,
          })
        );
        toast.success(response.results.otp)
        setCurrentStep((prev) => prev + 1);
      }
    } catch (err) {
      if (err?.message === "USER_ALREADY_EXISTS") {
        dispatch(setRegisterData({ ...registerData, ...data }));
        setCurrentStep((prev) => prev + 2);
      }
      console.error("Verification error:", err);
    }
  };

  const handleContinue = async () => {
    const isValid = await trigger();
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  const renderFieldLabel = () => {
    switch (type) {
      case "email":
        return "Email Address";
      case "phone":
        return "Phone Number";
      case "nafath":
        return "Nafath ID";
      default:
        return "Value";
    }
  };

  const renderFieldPlaceholder = () => {
    switch (type) {
      case "email":
        return "Enter your email";
      case "phone":
        return "e.g., 512345678";
      case "nafath":
        return "Enter Nafath ID";
      default:
        return "";
    }
  };

  const renderValidation = () => {
    switch (type) {
      case "email":
        return {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Enter a valid email address",
          },
        };
      case "phone":
        return {
          required: "Phone number is required",
          pattern: {
            value: /^[0-9]{9,10}$/,
            message: "Enter a valid phone number",
          },
        };
      case "nafath":
        return {
          required: "Nafath ID is required",
          minLength: {
            value: 5,
            message: "Must be at least 5 characters",
          },
          maxLength: {
            value: 20,
            message: "Must be less than 20 characters",
          },
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Only alphanumeric characters allowed",
          },
        };
      default:
        return {};
    }
  };

  const countryCodeValidation = {
    required: "Country code is required",
    validate: value => countryCodes.some(c => c.dial_code === value) || "Invalid country code"
  };

  return (
    <div className='flex justify-center items-center h-screen'>
    <div className="max-w-[90vw] mx-auto p-4 rounded-[16px] bg-white">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="text-center mb-6">
          <div
            className={`border p-4 w-20 h-20 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md ${"border-[#009EB4] bg-[#009EB420]"}`}>
            <img
              src={`/resources/icons/${type}Id.svg`}
              alt={`${type}-icon`}
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-[20px] font-bold text-gray-900 mb-1 mt-4">
            Enter your {renderFieldLabel()}
          </h2>
          <p className="text-gray-600 text-[12px] leading-relaxed">
            Please verify your identity using the selected method.
          </p>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {renderFieldLabel()}
            <span className="text-red-500">*</span>
          </label>

          {type === "phone" ? (
            <div className="space-y-2">
              <div className="flex w-full gap-2 relative">
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

                <div className="relative w-2/3">
                  <input
                    type="tel"
                    placeholder={renderFieldPlaceholder()}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none transition pl-6 md:pl-12 ${errors.phone
                      ? "border-red-500 focus:ring-red-200 focus:ring-2"
                      : value && isValid
                        ? "border-green-500 focus:ring-green-200 focus:ring-2"
                        : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
                      }`}
                    {...register("phone", renderValidation())}
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img
                      src="/resources/icons/phone.svg"
                      alt="phone-icon"
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </div>
                  {value && (
                    <div
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${errors.phone ? "text-red-500" : "text-green-600"
                        }`}
                    >
                      {errors.phone ? "✗" : "✓"}
                    </div>
                  )}
                </div>
              </div>
              {errors.countryCode && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.countryCode.message}
                </p>
              )}
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>
          ) : (
            <div className="relative">
              <input
                type={type === "email" ? "email" : "text"}
                placeholder={renderFieldPlaceholder()}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none transition pl-6 md:pl-12 ${errors[type]
                  ? "border-red-500 focus:ring-red-200 focus:ring-2"
                  : value && isValid
                    ? "border-green-500 focus:ring-green-200 focus:ring-2"
                    : "border-gray-300 focus:border-[#009EB4] focus:ring-[#009EB420] focus:ring-2"
                  }`}
                {...register(type, renderValidation())}
                aria-invalid={errors[type] ? "true" : "false"}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <img
                  src={`/resources/icons/${type}.svg`}
                  alt={`${type}-icon`}
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>
              {value && (
                <div
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${errors[type] ? "text-red-500" : "text-green-600"
                    }`}
                >
                  {errors[type] ? "✗" : "✓"}
                </div>
              )}
            </div>
          )}
          {errors[type] && type !== "phone" && (
            <p className="text-red-500 text-sm mt-1" role="alert">
              {errors[type].message}
            </p>
          )}
        </div>

        <div className="border border-[#009EB4] bg-[#F6FEFF] p-2 flex gap-1 items-center rounded-[10px] text-xs my-6">
          <img
            className="font-semibold w-6 h-6"
            src="/resourcesApp/iconsApp/infoActive.svg"
            alt="info"
          />
          <p>You can add your company details from your profile</p>
        </div>

        <div className="flex">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!isValid}
            className={`pri-btn text-center w-full ${!isValid ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AppStepTwo;