import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterData } from "../../Redux-config/slices/miscSlice";
import { SendOTPRegister } from "../../Redux-config/slices/authSlice";
import CommNote from "./CommNote";
import { useEffect, useState } from "react";
import { countryCodes } from "./CountryCodes";

const StepTwo = ({ userIdType, setCurrentStep }) => {
  const type = userIdType;
  const registerData = useSelector((state) => state.misc.registerData);
  const dispatch = useDispatch();
  const [selectedCountryCode, setSelectedCountryCode] = useState("+966");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [countries, setCountries] = useState(countryCodes);
  const { loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      countryCode: "+966",
    },
  });

  const value = watch(type);
  const filteredCountries = (searchInput) => {
    setSearchTerm(searchInput);
    if (!searchInput) {
      setCountries(countryCodes);
      return;
    }
    const terms = searchInput.toLowerCase().split(" ").filter(Boolean);

    const matches = countryCodes.filter((country) => {
      const name = country.name.toLowerCase();
      const dial = country.dial_code.toLowerCase();
      const code = (country.code || "").toLowerCase();
      return terms.every(
        (term) =>
          name.includes(term) || dial.includes(term) || code.includes(term)
      );
    });
    setCountries(matches);
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        email: data?.email,
        ...(type === "phone" && { countryCode: data?.countryCode }),
        ...(type === "phone" && { phoneNumber: data?.phone }),
      };

      const response = await dispatch(SendOTPRegister(payload)).unwrap();

      console.log({ response });

      if (response?.error === false && response?.error_code === 200) {
        dispatch(
          setRegisterData({
            ...registerData,
            ...data,
            user_id: response?.results?.user?._id,
          })
        );
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

  const fieldConfig = {
    email: {
      label: "Email Address",
      placeholder: "Enter your email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Enter a valid email",
        },
      },
    },
    phone: {
      label: "Phone Number",
      placeholder: "Enter your mobile number",
      validation: {
        required: "Phone number is required",
        pattern: {
          value: /^[0-9]{10}$/,
          message: "Enter a valid 10-digit phone number",
        },
      },
      countryCodeValidation: {
        required: "Country code is required",
      },
    },
    nafath: {
      label: "National/Iqama ID",
      placeholder: "Enter Nafath ID",
      validation: {
        required: "Nafath ID is required",
        minLength: {
          value: 5,
          message: "Must be at least 5 characters",
        },
      },
    },
  };

  const { label, placeholder, validation, countryCodeValidation } = fieldConfig[
    type
  ] || {
    label: "Value",
    placeholder: "",
    validation: {},
    countryCodeValidation: {},
  };

  const handleCountryCodeChange = (code) => {
    setSelectedCountryCode(code);
    setValue("countryCode", code, { shouldValidate: true });
    setIsDropdownOpen(false);
    setSearchTerm("");
    setCountries(countryCodes);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="text-center mb-6">
          <div
            className={`border p-4 w-40 h-40 flex justify-center items-center mx-auto rounded-full cursor-pointer transition-all duration-300 hover:shadow-md border-[#009EB4] bg-[#009EB420]`}>
            <img
              src={`/resources/icons/${
                type === "nafath"
                  ? "nicDis"
                  : type === "phone"
                  ? "PhoneId"
                  : "emailId"
              }.svg`}
              alt={`${type}-icon`}
              className="w-4 h-4 md:w-24 md:h-24"
            />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-1 mt-4">
            Enter your {label}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Please verify your identity using the selected method.
          </p>
        </div>

        <div className="mb-8 w-full">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>

          {type === "phone" ? (
            <div className="flex gap-2">
              <div className="w-1/3 relative">
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none transition text-left flex items-center justify-between ${
                      errors.countryCode ? "border-red-500" : "border-gray-300"
                    }`}>
                    <span>{selectedCountryCode}</span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${
                        isDropdownOpen ? "transform rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
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
                  />
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    <div className="p-2 sticky top-0 bg-white">
                      <input
                        type="text"
                        placeholder="Search countries..."
                        className="w-full p-2 border rounded-md focus:outline-none"
                        onChange={(e) => filteredCountries(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <ul key={countries}>
                      {countries?.map((country, id) => (
                        <li
                          key={country.dial_code}
                          className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center ${
                            selectedCountryCode === country.dial_code
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onClick={() =>
                            handleCountryCodeChange(country.dial_code)
                          }>
                          <span className="mr-2">{country.flag}</span>
                          <span className="font-medium">
                            {country.dial_code}
                          </span>
                          <span className="ml-2 text-gray-600 truncate">
                            {country.name}
                          </span>
                        </li>
                      ))}
                      {countries.length === 0 && (
                        <li className="px-4 py-2 text-gray-500">
                          No countries found
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {errors.countryCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.countryCode.message}
                  </p>
                )}
              </div>

              <div className="w-2/3">
                <div className="relative">
                  <input
                    type="tel"
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 border rounded-md focus:outline-none transition pl-6 md:pl-12 ${
                      errors[type]
                        ? "border-red-500"
                        : value
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                    {...register(type, validation)}
                  />

                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img
                      src="/resources/icons/phone.svg"
                      alt="phone-icon"
                      className="w-4 h-4 md:w-6 md:h-6"
                    />
                  </div>

                  {value && !errors[type] && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                      ✓
                    </div>
                  )}
                </div>
                {errors[type] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[type].message}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="relative">
              <input
                type={type === "email" ? "email" : "text"}
                placeholder={placeholder}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none transition pl-6 md:pl-12 ${
                  errors[type]
                    ? "border-red-500"
                    : value
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                {...register(type, validation)}
              />

              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <img
                  src={`/resources/icons/${
                    type === "nafath" ? "user" : type
                  }.svg`}
                  alt={`${type}-icon`}
                  className="w-4 h-4 md:w-6 md:h-6"
                />
              </div>

              {value && !errors[type] && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                  ✓
                </div>
              )}
            </div>
          )}
        </div>

        <CommNote text="Verification of this required field is necessary to continue." />

        <div className="flex space-x-4 mt-6">
          <Link
            onClick={() => setCurrentStep(1)}
            className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-md text-center font-medium">
            Back
          </Link>
          <button
            type="submit"
            disabled={!isValid}
            className={`flex-1 custom-btn text-white text-center ${
              isValid
                ? "bg-[#009EB4] hover:bg-teal-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}>
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepTwo;
